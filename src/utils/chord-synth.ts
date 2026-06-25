/**
 * chord-synth.ts
 * Pure Web Audio API warm synth engine for the PO-20 chord editor.
 *
 * Architecture:
 *   OscillatorNode (triangle)
 *     → BiquadFilterNode (lowpass, ~1000 Hz)
 *       → GainNode (per-voice envelope + level)
 *         → DynamicsCompressorNode (limiter, shared)
 *           → AudioContext.destination
 *
 * Voice pool is hard-capped at MAX_VOICES=3.  When a fourth voice would be
 * created the oldest active voice is gracefully faded out (20 ms ramp) before
 * being disconnected — this is the "voice-stealing" fix that prevents summed
 * signal from clipping.
 */

// ---------------------------------------------------------------------------
// Configurable synth parameters — tweak freely without touching the engine.
// ---------------------------------------------------------------------------
export interface SynthConfig {
  /** Web Audio oscillator type used for all voices. */
  oscType: OscillatorType;
  /** Low-pass filter cutoff in Hz. Keeps tones warm & mellow. */
  filterCutoff: number;
  /** Low-pass filter Q (resonance). 1–3 is subtle; >5 adds ring. */
  filterQ: number;
  /** Attack time in seconds — ramp from 0 to sustain gain. */
  attack: number;
  /** Decay time in seconds — ramp from peak to sustain. */
  decay: number;
  /** Sustain gain level (0–1). */
  sustain: number;
  /** Release time in seconds — ramp from sustain to 0 when note ends. */
  release: number;
  /** Total note duration in seconds before release begins. */
  noteDuration: number;
  /** Per-voice gain in dB (negative gives headroom for stacked voices). */
  voiceGainDb: number;
  /** Maximum simultaneous oscillator voices before stealing begins. */
  maxVoices: number;
}

export const SYNTH_CONFIG: SynthConfig = {
  oscType: 'triangle',
  filterCutoff: 1000,
  filterQ: 1.2,
  attack: 0.03,    // 30 ms — smooth onset, no click
  decay: 0.08,     // 80 ms
  sustain: 0.65,
  release: 0.6,    // 600 ms — mellow tail
  noteDuration: 0.7,
  voiceGainDb: -9, // -9 dBFS per voice → headroom for 3 simultaneous
  maxVoices: 3,
};

// ---------------------------------------------------------------------------
// Chord → MIDI note number table
// All voicings sit in the C3–C5 range (~130–523 Hz) for warmth.
// ---------------------------------------------------------------------------

/** MIDI note number for note-name helpers (C4 = 60). */
function midi(note: number, octave: number): number {
  // note: 0=C, 1=C#, 2=D, 3=D#, 4=E, 5=F, 6=F#, 7=G, 8=G#, 9=A, 10=A#, 11=B
  return (octave + 1) * 12 + note;
}

const C = 0, Cs = 1, D = 2, Ds = 3, E = 4, F = 5, Fs = 6, G = 7, Gs = 8, A = 9, As = 10, B = 11; // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Map from the po20 chord IDs (as they appear in AVAILABLE_CHORDS) to
 * arrays of MIDI note numbers.  Only the first MAX_VOICES notes are played.
 *
 * Voicings are in the C3–C4 octave range to stay warm:
 *   C3 = midi(C,3) = 48,  C4 = midi(C,4) = 60
 */
export const CHORD_NOTES: Record<string, number[]> = {
  // Row 1
  'dm':   [midi(D,3),  midi(F,3),  midi(A,3)],   // D minor:  D-F-A
  'em':   [midi(E,3),  midi(G,3),  midi(B,3)],   // E minor:  E-G-B
  'Esus': [midi(E,3),  midi(A,3),  midi(B,3)],   // E sus4:   E-A-B
  'E':    [midi(E,3),  midi(Gs,3), midi(B,3)],   // E major:  E-G#-B

  // Row 2
  'F':    [midi(F,3),  midi(A,3),  midi(C,4)],   // F major:  F-A-C
  'G':    [midi(G,3),  midi(B,3),  midi(D,4)],   // G major:  G-B-D
  'C/G':  [midi(G,2),  midi(C,3),  midi(E,3)],   // C/G:      G(bass)-C-E
  'E/G#': [midi(Gs,2), midi(E,3),  midi(Gs,3)],  // E/G#:     G#(bass)-E-G#

  // Row 3
  'am':   [midi(A,2),  midi(C,3),  midi(E,3)],   // A minor:  A-C-E
  'C/A':  [midi(A,2),  midi(C,3),  midi(G,3)],   // C/A:      A(bass)-C-G
  'dm/A': [midi(A,2),  midi(D,3),  midi(F,3)],   // dm/A:     A(bass)-D-F
  'D/A':  [midi(A,2),  midi(D,3),  midi(Fs,3)],  // D/A:      A(bass)-D-F#

  // Row 4
  'A':    [midi(A,2),  midi(Cs,3), midi(E,3)],   // A major:  A-C#-E
  'B/A':  [midi(A,2),  midi(Ds,3), midi(Fs,3)],  // B/A:      A(bass)-D#-F#
  'C':    [midi(C,3),  midi(E,3),  midi(G,3)],   // C major:  C-E-G
  'D':    [midi(D,3),  midi(Fs,3), midi(A,3)],   // D major:  D-F#-A
};

/** Convert MIDI note number to frequency in Hz. */
function midiToFreq(note: number): number {
  return 440 * Math.pow(2, (note - 69) / 12);
}

// ---------------------------------------------------------------------------
// AudioContext & master limiter (shared singleton)
// ---------------------------------------------------------------------------

let _ctx: AudioContext | null = null;
let _limiter: DynamicsCompressorNode | null = null;

function getCtx(): AudioContext {
  if (!_ctx) {
    _ctx = new AudioContext();
  }
  return _ctx;
}

function getLimiter(): DynamicsCompressorNode {
  if (!_limiter) {
    const ctx = getCtx();
    _limiter = ctx.createDynamicsCompressor();
    _limiter.threshold.value = -6;  // Start compressing near 0 dBFS
    _limiter.ratio.value = 20;       // High ratio → limiter behaviour
    _limiter.attack.value = 0.002;   // 2 ms — fast enough to catch transients
    _limiter.release.value = 0.1;    // 100 ms recovery
    _limiter.knee.value = 3;         // Soft knee for transparency
    _limiter.connect(ctx.destination);
  }
  return _limiter;
}

// ---------------------------------------------------------------------------
// Voice pool — capped at SYNTH_CONFIG.maxVoices
// ---------------------------------------------------------------------------

interface Voice {
  osc: OscillatorNode;
  gain: GainNode;
  filter: BiquadFilterNode;
  /** AudioContext time when this voice was started — used for age ordering. */
  startTime: number;
  /** Whether stop() has already been scheduled on this voice. */
  stopping: boolean;
}

const _voices: Voice[] = [];

/** dB → linear gain */
function dbToGain(db: number): number {
  return Math.pow(10, db / 20);
}

/**
 * Immediately fade-out and disconnect an active voice.
 * Uses a short linear ramp (20 ms) to avoid a click artefact.
 */
function stealVoice(voice: Voice): void {
  if (voice.stopping) return;
  voice.stopping = true;
  const ctx = getCtx();
  const now = ctx.currentTime;
  voice.gain.gain.cancelScheduledValues(now);
  voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
  voice.gain.gain.linearRampToValueAtTime(0, now + 0.02); // 20 ms fade
  setTimeout(() => {
    try { voice.osc.stop(); } catch (_) { /* already stopped */ }
    voice.gain.disconnect();
    voice.filter.disconnect();
  }, 30);
}

/** Remove any voices that have already stopped or been stolen. */
function pruneStoppedVoices(): void {
  for (let i = _voices.length - 1; i >= 0; i--) {
    if (_voices[i].stopping) {
      _voices.splice(i, 1);
    }
  }
}

/**
 * Trigger a single oscillator voice for the given MIDI note.
 * If the pool is full, the oldest voice is stolen before the new one starts.
 */
function triggerNote(midiNote: number, cfg: SynthConfig): void {
  const ctx = getCtx();
  const limiter = getLimiter();
  const now = ctx.currentTime;
  const peakGain = dbToGain(cfg.voiceGainDb);
  const sustainGain = peakGain * cfg.sustain;
  const releaseStart = now + cfg.attack + cfg.decay + cfg.noteDuration;

  // Enforce voice limit
  pruneStoppedVoices();
  while (_voices.length >= cfg.maxVoices) {
    const oldest = _voices.shift()!;
    stealVoice(oldest);
  }

  // Build the signal chain
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = cfg.filterCutoff;
  filter.Q.value = cfg.filterQ;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  // Attack
  gain.gain.linearRampToValueAtTime(peakGain, now + cfg.attack);
  // Decay → sustain
  gain.gain.linearRampToValueAtTime(sustainGain, now + cfg.attack + cfg.decay);
  // Hold at sustain until release
  gain.gain.setValueAtTime(sustainGain, releaseStart);
  // Release
  gain.gain.linearRampToValueAtTime(0, releaseStart + cfg.release);

  const osc = ctx.createOscillator();
  osc.type = cfg.oscType;
  osc.frequency.value = midiToFreq(midiNote);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(limiter);
  osc.start(now);
  osc.stop(releaseStart + cfg.release + 0.05); // a tiny buffer after release

  const voice: Voice = { osc, gain, filter, startTime: now, stopping: false };
  _voices.push(voice);

  // Mark the voice as stopping once it has naturally ended (for pruning)
  osc.onended = () => {
    voice.stopping = true;
    pruneStoppedVoices();
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Play all notes for a named chord simultaneously.
 * Uses the voice-pool with voice-stealing to cap simultaneous voices at
 * SYNTH_CONFIG.maxVoices (default: 3).
 *
 * @param chordId  One of the po20 AVAILABLE_CHORDS identifiers, e.g. "dm".
 * @param cfg      Optional override for synth parameters.
 */
export function playChord(chordId: string, cfg: SynthConfig = SYNTH_CONFIG): void {
  const ctx = getCtx();
  if (ctx.state !== 'running') {
    console.warn('chord-synth: AudioContext not running. Enable audio first.');
    return;
  }

  const notes = CHORD_NOTES[chordId];
  if (!notes || notes.length === 0) {
    console.warn(`chord-synth: No notes found for chord "${chordId}".`);
    return;
  }

  // Play up to maxVoices notes (trim from top if chord has more)
  const toPlay = notes.slice(0, cfg.maxVoices);
  for (const note of toPlay) {
    triggerNote(note, cfg);
  }
}

/**
 * Resume (or create) the AudioContext.
 * Must be called from a user-gesture handler (click/touchstart).
 */
export async function startAudio(): Promise<void> {
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  // Warm up the limiter node
  getLimiter();
}

/**
 * Suspend the AudioContext, silencing all output.
 */
export async function suspendAudio(): Promise<void> {
  const ctx = getCtx();
  if (ctx.state === 'running') {
    await ctx.suspend();
  }
}

/**
 * Returns true if the AudioContext is currently in the 'running' state.
 */
export function isAudioActive(): boolean {
  return _ctx !== null && _ctx.state === 'running';
}

/**
 * Register a listener for AudioContext state changes (running/suspended/closed).
 * Returns a cleanup function to remove the listener.
 */
export function registerAudioStateListener(
  listener: (state: AudioContextState) => void
): () => void {
  const ctx = getCtx();
  const handler = () => listener(ctx.state);
  ctx.addEventListener('statechange', handler);
  return () => ctx.removeEventListener('statechange', handler);
}
