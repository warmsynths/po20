import { LitElement, html, css, TemplateResult } from 'lit';
import { store, Theme } from '../utils/store';

export class PO20Header extends LitElement {
  static override properties = {
    showPatternModal: { type: Boolean },
    showChordModal: { type: Boolean },
    newPatternName: { type: String },
    newChordName: { type: String },
    currentTheme: { type: String }
  };

  showPatternModal!: boolean;
  showChordModal!: boolean;
  newPatternName!: string;
  newChordName!: string;
  currentTheme!: Theme;

  static override styles = css`
    :host {
      display: block;
      width: 100%;
      background: var(--bg-surface);
      border-bottom: 2px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 0 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .logo {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: var(--accent);
      text-decoration: none;
      font-weight: bold;
      letter-spacing: 1px;
    }

    /* ---- Theme Toggle ---- */

    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-icon {
      display: flex;
      align-items: center;
      color: var(--text-muted);
      transition: color 0.2s;
    }

    .theme-icon svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .theme-icon.active {
      color: var(--accent);
    }

    .toggle-pill {
      position: relative;
      width: 48px;
      height: 26px;
      background: var(--border-subtle);
      border-radius: 13px;
      cursor: pointer;
      border: none;
      padding: 0;
      transition: background 0.3s ease;
      flex-shrink: 0;
    }

    .toggle-pill.light-active {
      background: var(--accent);
    }

    .toggle-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: var(--text-primary);
      border-radius: 50%;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    .toggle-pill.light-active .toggle-knob {
      transform: translateX(22px);
    }



    /* Modals for creating new elements */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      z-index: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal {
      background: var(--bg-surface);
      border: 3px solid var(--accent);
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      transform: scale(0.9);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.open .modal {
      transform: scale(1);
    }

    .modal h3 {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: var(--text-primary);
      margin-top: 0;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .input-group label {
      font-size: 14px;
      color: var(--text-muted);
    }

    .input-group input {
      background: var(--bg-inset);
      border: 2px solid var(--border-subtle);
      border-radius: 6px;
      padding: 10px 12px;
      color: var(--text-primary);
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .input-group input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn {
      padding: 10px 18px;
      border-radius: 100px;
      border: none;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
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
    }

    .btn-primary:hover {
      background: var(--accent-hover);
    }
  `;

  constructor() {
    super();
    this.showPatternModal = false;
    this.showChordModal = false;
    this.newPatternName = '';
    this.newChordName = '';
    this.currentTheme = store.state.app.theme;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this._onStoreChange = this._onStoreChange.bind(this);
    store.addEventListener('change', this._onStoreChange);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    store.removeEventListener('change', this._onStoreChange);
  }

  _onStoreChange(): void {
    this.currentTheme = store.state.app.theme;
  }

  override render(): TemplateResult {
    const isLight = this.currentTheme === 'light';
    return html`
      <header>
        <div class="brand-section">
          <a href="#/" class="logo">PO-20 ARCADE</a>
        </div>
        <div class="header-actions">
          <div class="theme-toggle">
            <!-- Moon icon (dark) -->
            <span class="theme-icon ${!isLight ? 'active' : ''}">
              <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
            </span>
            <button
              class="toggle-pill ${isLight ? 'light-active' : ''}"
              @click="${this._toggleTheme}"
              aria-label="Toggle light/dark mode"
              aria-pressed="${isLight}"
            >
              <div class="toggle-knob"></div>
            </button>
            <!-- Sun icon (light) -->
            <span class="theme-icon ${isLight ? 'active' : ''}">
              <svg viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 11H1v2h3v-2zm9-9h-2v2.99h2V2zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zM20 11v2h3v-2h-3zm-8-2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-1 13h2v-3h-2v3zm-7.45-3.91l1.79-1.79-1.41-1.41-1.79 1.79 1.41 1.41z"/></svg>
            </span>
          </div>
        </div>
      </header>

      <!-- New Pattern Dialog Modal -->
      <div class="modal-overlay ${this.showPatternModal ? 'open' : ''}" @click="${this._closePatternModal}">
        <div class="modal" @click="${(e: Event) => e.stopPropagation()}">
          <h3>Create New Pattern</h3>
          <form @submit="${this._createPattern}">
            <div class="input-group">
              <label for="pattern-name">Pattern Name</label>
              <input 
                type="text" 
                id="pattern-name" 
                placeholder="e.g. Synth Wave Intro"
                .value="${this.newPatternName}"
                @input="${(e: Event) => this.newPatternName = (e.target as HTMLInputElement).value}"
                required
              />
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="${this._closePatternModal}">Cancel</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>

      <!-- New Chord Set Dialog Modal -->
      <div class="modal-overlay ${this.showChordModal ? 'open' : ''}" @click="${this._closeChordModal}">
        <div class="modal" @click="${(e: Event) => e.stopPropagation()}">
          <h3>Create Chord Progression</h3>
          <form @submit="${this._createChord}">
            <div class="input-group">
              <label for="chord-name">Progression Name</label>
              <input 
                type="text" 
                id="chord-name" 
                placeholder="e.g. Pop Verse Chords"
                .value="${this.newChordName}"
                @input="${(e: Event) => this.newChordName = (e.target as HTMLInputElement).value}"
                required
              />
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="${this._closeChordModal}">Cancel</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  _openPatternModal(): void {
    this.newPatternName = '';
    this.showPatternModal = true;
    setTimeout(() => {
      (this.shadowRoot?.getElementById('pattern-name') as HTMLElement | null)?.focus();
    }, 100);
  }

  _closePatternModal(): void {
    this.showPatternModal = false;
  }

  _openChordModal(): void {
    this.newChordName = '';
    this.showChordModal = true;
    setTimeout(() => {
      (this.shadowRoot?.getElementById('chord-name') as HTMLElement | null)?.focus();
    }, 100);
  }

  _closeChordModal(): void {
    this.showChordModal = false;
  }

  _toggleTheme(): void {
    const next: Theme = this.currentTheme === 'dark' ? 'light' : 'dark';
    store.setTheme(next);
  }

  _createPattern(e: Event): void {
    e.preventDefault();
    if (!this.newPatternName.trim()) return;
    store.addPattern(this.newPatternName.trim());
    this._closePatternModal();
    // Redirect to pattern editor
    window.location.hash = `/pattern`;
  }

  _createChord(e: Event): void {
    e.preventDefault();
    if (!this.newChordName.trim()) return;
    store.addChords(this.newChordName.trim());
    this._closeChordModal();
    // Redirect to chord editor
    window.location.hash = `/chord`;
  }
}

customElements.define('po20-header', PO20Header);

declare global {
  interface HTMLElementTagNameMap {
    'po20-header': PO20Header;
  }
}
