import { LitElement, html, css, TemplateResult } from 'lit';
import { store, ChordSet } from '../utils/store';
import './po20-lcd-screen';

const AVAILABLE_CHORDS = [
  "dm", "em", "Esus", "E",
  "F", "G", "C/G", "E/G#",
  "am", "C/A", "dm/A", "D/A",
  "A", "B/A", "C", "D"
];

export class PO20ChordEditor extends LitElement {
  static override properties = {
    activeChordSet: { type: Object },
    chordsOrder: { type: Array }
  };

  activeChordSet!: ChordSet | null;
  chordsOrder!: string[];

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 120px);
      box-sizing: border-box;
      color: var(--text-primary);
      padding: 30px 16px;
      background: var(--bg-base);
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
      color: var(--accent);
      margin: 0;
    }

    /* Chord timeline/chain styling */
    .timeline-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
    }

    .timeline-title {
      font-size: 13px;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 12px;
      letter-spacing: 1px;
    }

    .timeline-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      min-height: 50px;
      align-items: center;
    }

    /* Scrollbar styling */
    .timeline-scroll::-webkit-scrollbar {
      height: 6px;
    }
    .timeline-scroll::-webkit-scrollbar-track {
      background: var(--bg-inset);
    }
    .timeline-scroll::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 3px;
    }

    .chord-pill {
      background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
      color: #fff;
      font-family: 'VT323', monospace;
      font-size: 20px;
      padding: 4px 14px;
      border-radius: 100px;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      border: 1px solid transparent;
      transition: all 0.2s;
    }

    .chord-pill:hover {
      background: #f44336;
      border-color: #ffcdd2;
      transform: translateY(-1px);
    }

    .chord-pill .remove-icon {
      font-size: 14px;
      opacity: 0.7;
    }

    .empty-timeline {
      color: var(--text-dim);
      font-size: 15px;
      font-style: italic;
    }

    /* PO Hardware 4x4 Grid */
    .po-panel {
      background: var(--bg-surface);
      border: 3px solid var(--border-subtle);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .grid-4x4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
      justify-items: center;
    }

    .po-button {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 4px solid #121316;
      background: radial-gradient(circle, #3a3b40 0%, #202124 100%);
      color: #b3b5bd;
      font-family: 'VT323', monospace;
      font-size: 20px;
      font-weight: bold;
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

    .btn-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }

    .btn {
      padding: 12px 24px;
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
      background: var(--border-subtle);
      color: var(--text-secondary);
    }

    .btn-secondary:hover {
      background: var(--border-faint);
      color: var(--text-primary);
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 4px 10px rgba(255, 87, 34, 0.3);
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 6px 15px rgba(255, 87, 34, 0.4);
    }

    .btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
  `;

  constructor() {
    super();
    this.activeChordSet = null;
    this.chordsOrder = [];
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._loadChordSet();
  }

  _loadChordSet(): void {
    const chordSet = store.getActiveChord();
    if (chordSet) {
      this.activeChordSet = chordSet;
      this.chordsOrder = [...chordSet.chordsOrder];
    } else {
      // Redirect home if active chord set is not found
      window.location.hash = `/`;
    }
  }

  override render(): TemplateResult {
    if (!this.activeChordSet) return html`<p>Loading...</p>`;

    const lastChord = this.chordsOrder.length > 0 ? this.chordsOrder[this.chordsOrder.length - 1] : '--';

    return html`
      <div class="container">
        
        <div class="header-row">
          <h1 class="editor-title">${this.activeChordSet.name}</h1>
          <button class="btn btn-secondary" @click="${this._goHome}">
            &larr; Back
          </button>
        </div>

        <!-- Custom retro LCD panel -->
        <po20-lcd-screen
          .titleText="${this.activeChordSet.name}"
          subtitleText="CHORD PROGRESSION"
          .paramA="${String(this.chordsOrder.length)}"
          .paramB="${Number.isNaN(Number(lastChord)) ? 0 : Number(lastChord)}"
        ></po20-lcd-screen>

        <!-- Chords Timeline -->
        <div class="timeline-card">
          <div class="timeline-title">Progression Chain (Click chord to remove)</div>
          <div class="timeline-scroll" id="timeline-scroll">
            ${this.chordsOrder.length > 0 ? this.chordsOrder.map((chord, index) => html`
              <div class="chord-pill" @click="${() => this._removeChord(index)}">
                ${chord} <span class="remove-icon">&times;</span>
              </div>
            `) : html`
              <span class="empty-timeline">Timeline empty. Click buttons below to construct a progression.</span>
            `}
          </div>
        </div>

        <!-- PO Hardware-like 4x4 Grid of Chords -->
        <div class="po-panel">
          <div style="font-size: 13px; color: #8a8d95; text-transform: uppercase; margin-bottom: 16px; letter-spacing: 1px;">
            Chord Pad Selection (PO-20 Arcade Layout)
          </div>
          <div class="grid-4x4">
            ${AVAILABLE_CHORDS.map((chord) => html`
              <button class="po-button" @click="${() => this._addChord(chord)}">
                ${chord}
              </button>
            `)}
          </div>

          <div class="btn-row">
            <button class="btn btn-secondary" @click="${this._clearAll}">
              Clear All
            </button>
            <button class="btn btn-primary" @click="${this._save}">
              <svg viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
              Save Progression
            </button>
          </div>
        </div>

      </div>
    `;
  }

  _addChord(chord: string): void {
    this.chordsOrder = [...this.chordsOrder, chord];
    // Auto scroll timeline to right
    setTimeout(() => {
      const scrollEl = this.shadowRoot?.getElementById('timeline-scroll');
      if (scrollEl) {
        scrollEl.scrollLeft = scrollEl.scrollWidth;
      }
    }, 50);
  }

  _removeChord(index: number): void {
    const nextChords = [...this.chordsOrder];
    nextChords.splice(index, 1);
    this.chordsOrder = nextChords;
  }

  _clearAll(): void {
    if (confirm("Are you sure you want to clear the entire progression?")) {
      this.chordsOrder = [];
    }
  }

  _save(): void {
    if (this.activeChordSet) {
      store.editChords(this.activeChordSet.id, this.activeChordSet.name, this.chordsOrder);
      alert("Progression saved successfully!");
    }
  }

  _goHome(): void {
    window.location.hash = `/`;
  }
}

customElements.define('po20-chord-editor', PO20ChordEditor);

declare global {
  interface HTMLElementTagNameMap {
    'po20-chord-editor': PO20ChordEditor;
  }
}
