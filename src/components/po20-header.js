import { LitElement, html, css } from 'lit';
import { store } from '../utils/store';

export class PO20Header extends LitElement {
  static properties = {
    isDrawerOpen: { type: Boolean },
    showPatternModal: { type: Boolean },
    showChordModal: { type: Boolean },
    newPatternName: { type: String },
    newChordName: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      background: #1c1d22;
      border-bottom: 2px solid #2b2c32;
      position: sticky;
      top: 0;
      z-index: 100;
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
      color: #fff;
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
      background: #2b2c32;
    }

    .menu-btn svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .logo {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: #ff5722;
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
      background: #17181c;
      box-shadow: 5px 0 25px rgba(0,0,0,0.8);
      z-index: 201;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
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
      border-bottom: 1px solid #2b2c32;
    }

    .drawer-title {
      font-family: 'VT323', monospace;
      font-size: 24px;
      color: #ff5722;
      margin: 0;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: #8a8d95;
      cursor: pointer;
      font-size: 24px;
      padding: 4px;
      border-radius: 4px;
    }

    .close-btn:hover {
      color: #fff;
      background: #2b2c32;
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      border-bottom: 1px solid #202125;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      color: #b3b5bd;
      text-decoration: none;
      font-size: 16px;
      transition: all 0.2s;
      cursor: pointer;
    }

    .nav-link:hover {
      color: #ff5722;
      background: #1f2026;
      padding-left: 24px;
    }

    .nav-link svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .divider {
      height: 1px;
      background: #2b2c32;
      margin: 16px 0;
    }

    .donate-container {
      padding: 20px;
      margin-top: auto;
      text-align: center;
      background: #111215;
      border-top: 1px solid #222;
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
      background: #1c1d22;
      border: 3px solid #ff5722;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      transform: scale(0.9);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.open .modal {
      transform: scale(1);
    }

    .modal h3 {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: #fff;
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
      color: #8a8d95;
    }

    .input-group input {
      background: #111215;
      border: 2px solid #2b2c32;
      border-radius: 6px;
      padding: 10px 12px;
      color: #fff;
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .input-group input:focus {
      outline: none;
      border-color: #ff5722;
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
    }

    .btn-primary:hover {
      background: #e64a19;
    }
  `;

  constructor() {
    super();
    this.isDrawerOpen = false;
    this.showPatternModal = false;
    this.showChordModal = false;
    this.newPatternName = '';
    this.newChordName = '';
  }

  render() {
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
        <div class="drawer" @click="${e => e.stopPropagation()}">
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

          <!-- PayPal donate button form (styled) -->
          <div class="donate-container">
            <form action="https://www.paypal.com/donate" method="post" target="_blank">
              <input type="hidden" name="business" value="LSTHAKLKRKVDW" />
              <input type="hidden" name="currency_code" value="AUD" />
              <button type="submit" class="btn btn-secondary" style="font-size: 13px; width: 100%;">
                Support Development (PayPal)
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- New Pattern Dialog Modal -->
      <div class="modal-overlay ${this.showPatternModal ? 'open' : ''}" @click="${this._closePatternModal}">
        <div class="modal" @click="${e => e.stopPropagation()}">
          <h3>Create New Pattern</h3>
          <form @submit="${this._createPattern}">
            <div class="input-group">
              <label for="pattern-name">Pattern Name</label>
              <input 
                type="text" 
                id="pattern-name" 
                placeholder="e.g. Synth Wave Intro"
                .value="${this.newPatternName}"
                @input="${e => this.newPatternName = e.target.value}"
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
        <div class="modal" @click="${e => e.stopPropagation()}">
          <h3>Create Chord Progression</h3>
          <form @submit="${this._createChord}">
            <div class="input-group">
              <label for="chord-name">Progression Name</label>
              <input 
                type="text" 
                id="chord-name" 
                placeholder="e.g. Pop Verse Chords"
                .value="${this.newChordName}"
                @input="${e => this.newChordName = e.target.value}"
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

  _openDrawer() {
    this.isDrawerOpen = true;
  }

  _closeDrawer() {
    this.isDrawerOpen = false;
  }

  _openPatternModal() {
    this.isDrawerOpen = false;
    this.newPatternName = '';
    this.showPatternModal = true;
    setTimeout(() => {
      this.shadowRoot.getElementById('pattern-name')?.focus();
    }, 100);
  }

  _closePatternModal() {
    this.showPatternModal = false;
  }

  _openChordModal() {
    this.isDrawerOpen = false;
    this.newChordName = '';
    this.showChordModal = true;
    setTimeout(() => {
      this.shadowRoot.getElementById('chord-name')?.focus();
    }, 100);
  }

  _closeChordModal() {
    this.showChordModal = false;
  }

  _createPattern(e) {
    e.preventDefault();
    if (!this.newPatternName.trim()) return;
    const newId = store.addPattern(this.newPatternName.trim());
    this._closePatternModal();
    // Redirect to pattern editor
    window.location.hash = `/pattern`;
  }

  _createChord(e) {
    e.preventDefault();
    if (!this.newChordName.trim()) return;
    const newId = store.addChords(this.newChordName.trim());
    this._closeChordModal();
    // Redirect to chord editor
    window.location.hash = `/chord`;
  }
}

customElements.define('po20-header', PO20Header);
