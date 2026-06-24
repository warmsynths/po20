import { LitElement, html, css, TemplateResult } from 'lit';
import { store, Theme } from '../utils/store';

export class PO20Header extends LitElement {
  static override properties = {
    isDrawerOpen: { type: Boolean },
    showPatternModal: { type: Boolean },
    showChordModal: { type: Boolean },
    newPatternName: { type: String },
    newChordName: { type: String },
    currentTheme: { type: String }
  };

  isDrawerOpen!: boolean;
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

    .menu-btn {
      background: transparent;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .menu-btn:hover {
      background: var(--border-subtle);
    }

    .menu-btn svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .logo {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: var(--accent);
      text-decoration: none;
      font-weight: bold;
      letter-spacing: 1px;
    }

    /* Sliding Drawer Menu */
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .drawer-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: 100%;
      background: var(--bg-surface-alt);
      box-shadow: 5px 0 25px rgba(0,0,0,0.4);
      z-index: 201;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .drawer-overlay.open .drawer {
      transform: translateX(0);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .drawer-title {
      font-family: 'VT323', monospace;
      font-size: 24px;
      color: var(--accent);
      margin: 0;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 24px;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s, background 0.2s;
    }

    .close-btn:hover {
      color: var(--text-primary);
      background: var(--border-subtle);
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      border-bottom: 1px solid var(--border-faint);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 16px;
      transition: all 0.2s;
      cursor: pointer;
    }

    .nav-link:hover {
      color: var(--accent);
      background: var(--bg-row-hover);
      padding-left: 24px;
    }

    .nav-link svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .divider {
      height: 1px;
      background: var(--border-subtle);
      margin: 16px 0;
    }

    /* ---- Theme Toggle ---- */
    .theme-section {
      padding: 16px 20px;
      border-top: 1px solid var(--border-subtle);
    }

    .theme-label {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

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

    /* ---- Donate Container ---- */
    .donate-container {
      padding: 20px;
      margin-top: auto;
      text-align: center;
      background: var(--bg-inset);
      border-top: 1px solid var(--border-mid);
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
    this.isDrawerOpen = false;
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
          <button class="menu-btn" @click="${this._openDrawer}" aria-label="Open menu">
            <svg viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <a href="#/" class="logo">PO-20 ARCADE</a>
        </div>
      </header>

      <!-- Navigation Drawer -->
      <div class="drawer-overlay ${this.isDrawerOpen ? 'open' : ''}" @click="${this._closeDrawer}">
        <div class="drawer" @click="${(e: Event) => e.stopPropagation()}">
          <div class="drawer-header">
            <h2 class="drawer-title">MENU</h2>
            <button class="close-btn" @click="${this._closeDrawer}">&times;</button>
          </div>
          
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#/" class="nav-link" @click="${this._closeDrawer}">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Dashboard
              </a>
            </li>
            
            <div class="divider"></div>

            <li class="nav-item">
              <div class="nav-link" @click="${this._openPatternModal}">
                <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                New Pattern
              </div>
            </li>
            <li class="nav-item">
              <a href="#/patterns" class="nav-link" @click="${this._closeDrawer}">
                <svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-12c-.83 0-1.5-.67-1.5-1.5S3.17 1.5 4 1.5 5.5 2.17 5.5 3 4.83 4 4 4zm4-.5h14v3H8v-3zm0 6h14v3H8v-3zm0 6h14v3H8v-3z"/></svg>
                Pattern Bank
              </a>
            </li>

            <div class="divider"></div>

            <li class="nav-item">
              <div class="nav-link" @click="${this._openChordModal}">
                <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                New Chord progression
              </div>
            </li>
            <li class="nav-item">
              <a href="#/chords" class="nav-link" @click="${this._closeDrawer}">
                <svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-12c-.83 0-1.5-.67-1.5-1.5S3.17 1.5 4 1.5 5.5 2.17 5.5 3 4.83 4 4 4zm4-.5h14v3H8v-3zm0 6h14v3H8v-3zm0 6h14v3H8v-3z"/></svg>
                Chord sets list
              </a>
            </li>
          </ul>

          <!-- Theme Toggle -->
          <div class="theme-section">
            <div class="theme-label">Appearance</div>
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

          <!-- GitHub Link (styled) -->
          <div class="donate-container">
            <a href="https://github.com/warmsynths/po20" target="_blank" class="btn btn-secondary" style="font-size: 13px; width: 100%; display: block; text-decoration: none; box-sizing: border-box; text-align: center;">
              Developed by warmsynths
            </a>
          </div>
        </div>
      </div>

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

  _openDrawer(): void {
    this.isDrawerOpen = true;
  }

  _closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  _openPatternModal(): void {
    this.isDrawerOpen = false;
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
    this.isDrawerOpen = false;
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
