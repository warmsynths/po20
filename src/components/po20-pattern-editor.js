import { LitElement, html, css } from 'lit';
import { store, SOUNDS_CONFIG } from '../utils/store';
import { getIcon } from '../icons/icons';
import './po20-knob';
import './po20-lcd-screen';

const NOTES = [
  "None", "A1", "B1", "C1", "CS1", "D1", "E1", "F1", "FS1", "G1", "GS1",
  "A2", "B2", "C2", "CS2", "D2", "E2", "F2", "FS2", "G2", "GS2", "A3"
];

export class PO20PatternEditor extends LitElement {
  static properties = {
    activePattern: { type: Object },
    selectedSoundId: { type: Number }, // 1 to 16, or null if showing sounds list
    selectedStep: { type: Number },    // 1 to 16, or null
    isPlaying: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 120px);
      box-sizing: border-box;
      color: #fff;
      padding: 30px 16px;
      background: #121316;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .editor-title {
      font-family: 'VT323', monospace;
      font-size: 36px;
      color: #ff5722;
      margin: 0;
    }

    /* Hardware Panel container */
    .po-panel {
      background: #1c1d22;
      border: 3px solid #2b2c32;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      position: relative;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid #2b2c32;
      padding-bottom: 10px;
    }

    .panel-title {
      font-family: 'VT323', monospace;
      font-size: 24px;
      color: #ff5722;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .panel-title svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    /* Grids */
    .grid-4x4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
      justify-items: center;
      margin-bottom: 20px;
    }

    /* Circular buttons (Step Triggers / Sounds) */
    .po-button {
      position: relative;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 4px solid #121316;
      background: radial-gradient(circle, #3a3b40 0%, #202124 100%);
      color: #b3b5bd;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.1),
        0 4px 6px rgba(0, 0, 0, 0.4);
      user-select: none;
    }

    .po-button:hover {
      border-color: #ff5722;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.15),
        0 8px 12px rgba(0, 0, 0, 0.5),
        0 0 10px rgba(255, 87, 34, 0.3);
    }

    .po-button:active {
      transform: translateY(1px);
      border-color: #ff7043;
      box-shadow: 
        inset 0 2px 5px rgba(0,0,0,0.6),
        0 1px 2px rgba(0,0,0,0.4);
    }

    .po-button svg {
      width: 26px;
      height: 26px;
      fill: currentColor;
    }

    .po-button .btn-label {
      font-size: 11px;
      text-transform: uppercase;
      margin-top: 2px;
      letter-spacing: 0.5px;
      max-width: 62px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .po-button .step-num {
      font-family: 'VT323', monospace;
      font-size: 26px;
      font-weight: bold;
    }

    /* Small LED glow indicator */
    .led-indicator {
      position: absolute;
      top: 6px;
      right: 14px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #3a3b40;
      box-shadow: inset 0 1px 1px rgba(0,0,0,0.6);
      transition: background-color 0.2s;
    }

    .led-indicator.active {
      background: #00ff66;
      box-shadow: 
        0 0 8px #00ff66,
        inset 0 1px 1px rgba(255,255,255,0.8);
    }

    .led-indicator.selected {
      background: #ff5722;
      box-shadow: 
        0 0 8px #ff5722,
        inset 0 1px 1px rgba(255,255,255,0.8);
    }

    .badge-count {
      position: absolute;
      bottom: 4px;
      right: 8px;
      background: #ff5722;
      color: #fff;
      font-size: 9px;
      font-weight: bold;
      padding: 1px 4px;
      border-radius: 4px;
    }

    /* Automation controls (Knobs) */
    .controls-panel {
      background: #111215;
      border: 1px solid #2b2c32;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
      min-height: 120px;
    }

    .controls-placeholder {
      color: #5a5d65;
      font-size: 15px;
      font-style: italic;
      text-align: center;
      width: 100%;
    }

    .btn-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 100px;
      border: none;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .btn-secondary {
      background: #2b2c32;
      color: #b3b5bd;
    }

    .btn-secondary:hover {
      background: #3a3b42;
      color: #fff;
    }

    .btn-primary {
      background: #ff5722;
      color: #fff;
      box-shadow: 0 4px 10px rgba(255, 87, 34, 0.3);
    }

    .btn-primary:hover {
      background: #e64a19;
      box-shadow: 0 6px 15px rgba(255, 87, 34, 0.4);
    }

    .btn-danger {
      background: rgba(244, 67, 54, 0.15);
      color: #f44336;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .btn-danger:hover {
      background: #f44336;
      color: #fff;
    }

    .btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
  `;

  constructor() {
    super();
    this.activePattern = null;
    this.selectedSoundId = null;
    this.selectedStep = null;
    this.isPlaying = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadPattern();
  }

  _loadPattern() {
    const pattern = store.getActivePattern();
    if (pattern) {
      this.activePattern = JSON.parse(JSON.stringify(pattern)); // Deep clone local edits
    } else {
      window.location.hash = `/`;
    }
  }

  render() {
    if (!this.activePattern) return html`<p>Loading...</p>`;

    const selectedSound = this.selectedSoundId ? this.activePattern.pattern[this.selectedSoundId] : null;
    const isSequencing = this.selectedSoundId !== null;

    // Prepare LCD variables
    let lcdTitle = this.activePattern.name;
    let lcdSubtitle = 'PATTERN MODE';
    let lcdParamA = '--';
    let lcdParamB = 0;
    let lcdActiveSteps = [];

    if (isSequencing && selectedSound) {
      lcdTitle = selectedSound.value;
      lcdSubtitle = `STEP SEQUENCER (${selectedSound.type})`;
      lcdActiveSteps = selectedSound.steps;

      if (this.selectedStep && selectedSound.steps[this.selectedStep]) {
        const stepData = selectedSound.steps[this.selectedStep];
        lcdParamB = stepData.params.b !== null ? stepData.params.b : 0;

        if (selectedSound.type === 'note') {
          lcdParamA = stepData.params.a || 'None';
        } else {
          lcdParamA = stepData.params.a !== null ? String(stepData.params.a) : '0';
        }
      }
    }

    return html`
      <div class="container">
        
        <div class="header-row">
          <h1 class="editor-title">${this.activePattern.name}</h1>
          <button class="btn btn-secondary" @click="${this._goHome}">
            &larr; Back
          </button>
        </div>

        <!-- Custom retro LCD panel -->
        <po20-lcd-screen
          .titleText="${lcdTitle}"
          .subtitleText="${lcdSubtitle}"
          .paramA="${lcdParamA}"
          .paramB="${lcdParamB}"
          .activeSteps="${lcdActiveSteps}"
          .selectedStep="${this.selectedStep}"
          .isPlaying="${this.isPlaying}"
        ></po20-lcd-screen>

        <div class="po-panel">
          
          <div class="panel-header">
            <h3 class="panel-title">
              ${isSequencing ? html`
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 13px;" @click="${this._deselectSound}">
                  &larr; Sounds
                </button>
                <span>Sequencer: ${selectedSound.value}</span>
              ` : html`
                <span>Sound Pad Matrix</span>
              `}
            </h3>

            ${isSequencing ? html`
              <button class="btn btn-danger" style="padding: 6px 12px; font-size: 13px;" @click="${this._clearTriggers}">
                Clear Steps
              </button>
            ` : null}
          </div>

          <!-- MORPHING GRID -->
          <div class="grid-4x4">
            ${isSequencing ? this._renderStepsGrid(selectedSound) : this._renderSoundsGrid()}
          </div>

          <!-- AUTOMATION CONTROLS (KNOBS) -->
          <div class="controls-panel">
            ${isSequencing && this.selectedStep ? this._renderKnobs(selectedSound) : html`
              <div class="controls-placeholder">
                ${isSequencing 
                  ? 'Select or tap an active step (glowing amber LED) to adjust Parameter A & B Automation.'
                  : 'Select a Sound voice to program step sequencer triggers and automation.'}
              </div>
            `}
          </div>

          <div class="btn-row">
            ${isSequencing ? html`
              <button class="btn btn-secondary" @click="${this._deselectSound}">
                Done Sequencing
              </button>
            ` : null}
            <button class="btn btn-primary" @click="${this._savePattern}">
              <svg viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
              Save Pattern
            </button>
          </div>

        </div>

      </div>
    `;
  }

  // 16 Sounds Grid Layout
  _renderSoundsGrid() {
    return SOUNDS_CONFIG.map(sound => {
      const soundData = this.activePattern.pattern[sound.id];
      // Count active steps in this sound
      const activeCount = Object.values(soundData.steps).filter(s => s.active).length;

      return html`
        <button class="po-button" @click="${() => this._selectSound(sound.id)}">
          ${getIcon(sound.id)}
          <span class="btn-label">${sound.value}</span>
          ${activeCount > 0 ? html`<span class="badge-count">${activeCount}</span>` : null}
        </button>
      `;
    });
  }

  // 16 Steps Grid Layout (Sequencer mode)
  _renderStepsGrid(sound) {
    return Object.values(sound.steps).map(step => {
      const isStepActive = step.active;
      const isSelected = this.selectedStep === step.value;

      return html`
        <button class="po-button" @click="${(e) => this._toggleStep(e, step.value)}">
          <div class="led-indicator ${isStepActive ? 'active' : ''} ${isSelected ? 'selected' : ''}"></div>
          <span class="step-num">${step.value}</span>
        </button>
      `;
    });
  }

  // Knob automation layout for active step
  _renderKnobs(sound) {
    const stepData = sound.steps[this.selectedStep];
    const valA = stepData.params.a;
    const valB = stepData.params.b !== null ? stepData.params.b : 0;

    if (sound.type === 'note') {
      // For note parameters, we map note strings to numeric dial values for the knob
      const noteIndex = NOTES.indexOf(valA || 'None');
      const currentNoteVal = noteIndex !== -1 ? noteIndex : 0;

      return html`
        <po20-knob
          .value="${currentNoteVal}"
          min="0"
          max="21"
          label="PITCH NOTE"
          param="a"
          @change="${(e) => this._handleNoteKnobChange(e)}"
        ></po20-knob>
        
        <po20-knob
          .value="${valB}"
          min="0"
          max="100"
          label="MULTIPLY/FILTER"
          param="b"
          @change="${(e) => this._handleKnobChange(e)}"
        ></po20-knob>
      `;
    } else {
      // Numeric parameter A
      const valA_int = valA !== null ? valA : 0;

      return html`
        <po20-knob
          .value="${valA_int}"
          min="0"
          max="100"
          label="PARAM A"
          param="a"
          @change="${(e) => this._handleKnobChange(e)}"
        ></po20-knob>
        
        <po20-knob
          .value="${valB}"
          min="0"
          max="100"
          label="PARAM B"
          param="b"
          @change="${(e) => this._handleKnobChange(e)}"
        ></po20-knob>
      `;
    }
  }

  _selectSound(soundId) {
    this.selectedSoundId = soundId;
    this.selectedStep = null;
  }

  _deselectSound() {
    this.selectedSoundId = null;
    this.selectedStep = null;
  }

  _toggleStep(e, stepValue) {
    e.preventDefault();
    const sound = this.activePattern.pattern[this.selectedSoundId];
    const step = sound.steps[stepValue];

    const isCurrentlyActive = step.active;

    if (this.selectedStep === stepValue && isCurrentlyActive) {
      // Clicked currently selected active step -> deselect it
      this.selectedStep = null;
    } else if (this.selectedStep === null && isCurrentlyActive) {
      // Clicked another active step when none was selected -> turn it off
      step.active = false;
      this.requestUpdate();
    } else if (this.selectedStep !== null && this.selectedStep !== stepValue && isCurrentlyActive) {
      // Clicked another active step when one was already selected -> deselect
      this.selectedStep = null;
    } else {
      // Turn step active and select it
      step.active = true;
      this.selectedStep = stepValue;
      this.requestUpdate();
    }
  }

  _handleKnobChange(e) {
    const { value, param } = e.detail;
    const sound = this.activePattern.pattern[this.selectedSoundId];
    const step = sound.steps[this.selectedStep];
    step.params[param] = value;
    this.requestUpdate();
  }

  _handleNoteKnobChange(e) {
    const { value } = e.detail;
    const sound = this.activePattern.pattern[this.selectedSoundId];
    const step = sound.steps[this.selectedStep];
    
    // Map index back to Note name
    const noteName = NOTES[value] || 'None';
    step.params.a = noteName === 'None' ? null : noteName;
    this.requestUpdate();
  }

  _clearTriggers() {
    if (confirm("Are you sure you want to clear all step triggers for this sound?")) {
      const sound = this.activePattern.pattern[this.selectedSoundId];
      Object.keys(sound.steps).forEach(key => {
        sound.steps[key].active = false;
        sound.steps[key].params = { a: null, b: null, multiply: null };
      });
      this.selectedStep = null;
      this.requestUpdate();
    }
  }

  _savePattern() {
    store.editPattern(this.activePattern.id, this.activePattern.name, this.activePattern.pattern);
    alert("Pattern saved successfully!");
  }

  _goHome() {
    window.location.hash = `/`;
  }
}

customElements.define('po20-pattern-editor', PO20PatternEditor);
