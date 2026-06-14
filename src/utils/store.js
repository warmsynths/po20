import { v4 as uuidv4 } from 'uuid';

const SOUNDS_CONFIG = [
  { value: "bass", id: 1, type: "int" },
  { value: "bass drum", id: 2, type: "int" },
  { value: "snare drum", id: 3, type: "int" },
  { value: "hi-hat", id: 4, type: "int" },
  { value: "tom", id: 5, type: "int" },
  { value: "blip", id: 6, type: "note" },
  { value: "hardsync", id: 7, type: "int" },
  { value: "noise fx", id: 8, type: "int" },
  { value: "arpeggio", id: 9, type: "int" },
  { value: "melodic arp", id: 10, type: "note" },
  { value: "falling arp", id: 11, type: "note" },
  { value: "octave arp", id: 12, type: "note" },
  { value: "lead", id: 13, type: "note" },
  { value: "vibrato", id: 14, type: "note" },
  { value: "portamento", id: 15, type: "note" },
  { value: "echo", id: 16, type: "note" },
];

export function createInitialSounds() {
  const steps = {};
  for (let i = 1; i <= 16; i++) {
    steps[i] = {
      value: i,
      active: false,
      params: { a: null, b: null, multiply: null }
    };
  }

  const sounds = {};
  SOUNDS_CONFIG.forEach(sound => {
    sounds[sound.id] = {
      id: sound.id,
      value: sound.value,
      type: sound.type,
      steps: JSON.parse(JSON.stringify(steps))
    };
  });

  return sounds;
}

class PO20Store extends EventTarget {
  constructor() {
    super();
    this.state = {
      app: { activePattern: null, activeChord: null },
      patterns: [],
      chords: []
    };
    this.load();
  }

  load() {
    try {
      const serialized = localStorage.getItem("state");
      if (serialized) {
        const parsed = JSON.parse(serialized);
        this.state = {
          app: parsed.app || { activePattern: null, activeChord: null },
          patterns: parsed.patterns || [],
          chords: parsed.chords || []
        };
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
  }

  save() {
    try {
      localStorage.setItem("state", JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
    this.dispatchEvent(new CustomEvent("change", { detail: this.state }));
  }

  addPattern(name) {
    const id = uuidv4();
    const newPattern = {
      id,
      name: name || `Pattern ${this.state.patterns.length + 1}`,
      pattern: createInitialSounds()
    };
    this.state.patterns.push(newPattern);
    this.state.app.activePattern = id;
    this.save();
    return id;
  }

  editPattern(id, name, patternData) {
    this.state.patterns = this.state.patterns.map(p =>
      p.id === id ? { ...p, name: name || p.name, pattern: patternData } : p
    );
    this.save();
  }

  deletePattern(id) {
    this.state.patterns = this.state.patterns.filter(p => p.id !== id);
    if (this.state.app.activePattern === id) {
      this.state.app.activePattern = null;
    }
    this.save();
  }

  addChords(name) {
    const id = uuidv4();
    const newChordSet = {
      id,
      name: name || `Chord progression ${this.state.chords.length + 1}`,
      chordsOrder: []
    };
    this.state.chords.push(newChordSet);
    this.state.app.activeChord = id;
    this.save();
    return id;
  }

  editChords(id, name, chordsOrder) {
    this.state.chords = this.state.chords.map(c =>
      c.id === id ? { ...c, name: name || c.name, chordsOrder } : c
    );
    this.save();
  }

  deleteChord(id) {
    this.state.chords = this.state.chords.filter(c => c.id !== id);
    if (this.state.app.activeChord === id) {
      this.state.app.activeChord = null;
    }
    this.save();
  }

  setActivePattern(id) {
    this.state.app.activePattern = id;
    this.save();
  }

  setActiveChord(id) {
    this.state.app.activeChord = id;
    this.save();
  }

  getActivePattern() {
    return this.state.patterns.find(p => p.id === this.state.app.activePattern) || null;
  }

  getActiveChord() {
    return this.state.chords.find(c => c.id === this.state.app.activeChord) || null;
  }
}

export const store = new PO20Store();
export { SOUNDS_CONFIG };
