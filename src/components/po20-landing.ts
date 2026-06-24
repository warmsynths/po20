import { LitElement, html, css, TemplateResult } from 'lit';
import { store, Pattern, ChordSet } from '../utils/store';
import { PO20Header } from './po20-header';

export class PO20Landing extends LitElement {
  static override properties = {
    patterns: { type: Array },
    chords: { type: Array }
  };

  patterns!: Pattern[];
  chords!: ChordSet[];

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
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 10px;
    }

    .hero-title {
      font-family: 'VT323', monospace;
      font-size: 48px;
      color: #ff5722;
      margin: 0 0 10px 0;
      text-shadow: 0 0 10px rgba(255, 87, 34, 0.3);
    }

    .hero-tagline {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 500px;
      margin: 0 auto;
      line-height: 1.5;
    }

    .action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .action-card {
      background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-alt) 100%);
      border: 2px solid var(--border-subtle);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .action-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3), 0 0 8px rgba(255, 87, 34, 0.2);
    }

    .action-card svg {
      width: 48px;
      height: 48px;
      fill: var(--accent);
      transition: transform 0.3s ease;
    }

    .action-card:hover svg {
      transform: scale(1.1) rotate(90deg);
    }

    .action-card h3 {
      font-family: 'VT323', monospace;
      font-size: 28px;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .action-card p {
      font-size: 14px;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.4;
    }

    .list-section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 30px;
    }

    .list-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .list-card h2 {
      font-family: 'VT323', monospace;
      font-size: 32px;
      margin: 0 0 16px 0;
      border-bottom: 2px solid var(--border-subtle);
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .list-card h2 span {
      font-size: 16px;
      color: var(--text-dim);
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 380px;
      overflow-y: auto;
      padding-right: 4px;
    }

    /* Custom scrollbar */
    .items-list::-webkit-scrollbar {
      width: 6px;
    }
    .items-list::-webkit-scrollbar-track {
      background: var(--bg-inset);
    }
    .items-list::-webkit-scrollbar-thumb {
      background: var(--border-subtle);
      border-radius: 3px;
    }

    .item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--bg-row);
      border: 1px solid var(--border-faint);
      border-radius: 8px;
      transition: all 0.2s;
    }

    .item-row:hover {
      background: var(--bg-row-hover);
      border-color: var(--border-subtle);
    }

    .item-info {
      flex: 1;
      cursor: pointer;
    }

    .item-name {
      font-size: 16px;
      font-weight: bold;
      color: var(--text-primary);
    }

    .item-meta {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .row-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-btn {
      background: transparent;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.2s;
    }

    .action-btn-edit:hover {
      background: var(--border-subtle);
      color: var(--accent);
    }

    .action-btn-delete:hover {
      background: rgba(244, 67, 54, 0.15);
      color: #f44336;
    }

    .action-btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: var(--text-dim);
      font-size: 15px;
    }

    .empty-state svg {
      width: 40px;
      height: 40px;
      fill: currentColor;
      margin-bottom: 12px;
      opacity: 0.5;
    }
  `;

  constructor() {
    super();
    this.patterns = [];
    this.chords = [];
    this._onStateChange = this._onStateChange.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    store.addEventListener('change', this._onStateChange);
    this._loadData();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    store.removeEventListener('change', this._onStateChange);
  }

  _loadData(): void {
    this.patterns = [...store.state.patterns];
    this.chords = [...store.state.chords];
  }

  _onStateChange(): void {
    this._loadData();
  }

  override render(): TemplateResult {
    return html`
      <div class="container">
        
        <div class="hero-section">
          <h1 class="hero-title">PO-20 ARCADE COMPANION</h1>
          <p class="hero-tagline">
            Save and organize step patterns, note parameters, and song chord progressions for your Teenage Engineering PO-20 pocket operator arcade.
          </p>
        </div>

        <!-- Create Cards -->
        <div class="action-grid">
          <div class="action-card" @click="${this._triggerNewPattern}">
            <svg viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <h3>NEW PATTERN</h3>
            <p>Design a 16-step pattern, toggling triggers and automation parameters across 16 retro arcade sounds.</p>
          </div>
          <div class="action-card" @click="${this._triggerNewChords}">
            <svg viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <h3>NEW CHORD SET</h3>
            <p>Construct a song progression using the 16 chord options available on the PO-20 Arcade hardware.</p>
          </div>
        </div>

        <!-- Lists Container -->
        <div class="list-section-grid">
          
          <!-- Patterns Column -->
          <div class="list-card">
            <h2>Patterns <span>(${this.patterns.length})</span></h2>
            
            ${this.patterns.length > 0 ? html`
              <div class="items-list">
                ${this.patterns.map(pattern => html`
                  <div class="item-row">
                    <div class="item-info" @click="${() => this._editPattern(pattern.id)}">
                      <div class="item-name">${pattern.name}</div>
                      <div class="item-meta">16 Sounds • Step Automation</div>
                    </div>
                    <div class="row-actions">
                      <button class="action-btn action-btn-edit" @click="${() => this._editPattern(pattern.id)}" title="Edit Pattern">
                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="action-btn action-btn-delete" @click="${() => this._deletePattern(pattern.id)}" title="Delete Pattern">
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </div>
                `)}
              </div>
            ` : html`
              <div class="empty-state">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <div>No patterns saved yet. Click "New Pattern" above to create one.</div>
              </div>
            `}
          </div>

          <!-- Chords Column -->
          <div class="list-card">
            <h2>Chords <span>(${this.chords.length})</span></h2>
            
            ${this.chords.length > 0 ? html`
              <div class="items-list">
                ${this.chords.map(chordSet => html`
                  <div class="item-row">
                    <div class="item-info" @click="${() => this._editChords(chordSet.id)}">
                      <div class="item-name">${chordSet.name}</div>
                      <div class="item-meta">${chordSet.chordsOrder.length || 0} Chords in chain</div>
                    </div>
                    <div class="row-actions">
                      <button class="action-btn action-btn-edit" @click="${() => this._editChords(chordSet.id)}" title="Edit Progression">
                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="action-btn action-btn-delete" @click="${() => this._deleteChords(chordSet.id)}" title="Delete Progression">
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </div>
                `)}
              </div>
            ` : html`
              <div class="empty-state">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <div>No chord sets saved yet. Click "New Chord Set" above to create one.</div>
              </div>
            `}
          </div>

        </div>
      </div>
    `;
  }

  _triggerNewPattern(): void {
    const headerEl = document.querySelector('po20-app')?.shadowRoot?.querySelector('po20-header') as PO20Header | null;
    if (headerEl) headerEl._openPatternModal();
  }

  _triggerNewChords(): void {
    const headerEl = document.querySelector('po20-app')?.shadowRoot?.querySelector('po20-header') as PO20Header | null;
    if (headerEl) headerEl._openChordModal();
  }

  _editPattern(id: string): void {
    store.setActivePattern(id);
    window.location.hash = `/pattern`;
  }

  _deletePattern(id: string): void {
    if (confirm("Are you sure you want to delete this pattern?")) {
      store.deletePattern(id);
    }
  }

  _editChords(id: string): void {
    store.setActiveChord(id);
    window.location.hash = `/chord`;
  }

  _deleteChords(id: string): void {
    if (confirm("Are you sure you want to delete this chord progression?")) {
      store.deleteChord(id);
    }
  }
}

customElements.define('po20-landing', PO20Landing);

declare global {
  interface HTMLElementTagNameMap {
    'po20-landing': PO20Landing;
  }
}
