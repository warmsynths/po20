import { LitElement, html, css } from 'lit';
import './po20-header';
import './po20-footer';
import './po20-landing';
import './po20-pattern-editor';
import './po20-chord-editor';

export class PO20App extends LitElement {
  static properties = {
    currentHash: { type: String }
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: #121316;
      color: #fff;
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `;

  constructor() {
    super();
    this.currentHash = window.location.hash || '#/';
    this._onHashChange = this._onHashChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._onHashChange);
    
    // Default to hash navigation on first load if path matches old React format
    const pathname = window.location.pathname;
    if (pathname.includes('/pattern') && !window.location.hash) {
      window.location.hash = '#/pattern';
    } else if (pathname.includes('/patterns') && !window.location.hash) {
      window.location.hash = '#/patterns';
    } else if (pathname.includes('/chord') && !window.location.hash) {
      window.location.hash = '#/chord';
    } else if (pathname.includes('/chords') && !window.location.hash) {
      window.location.hash = '#/chords';
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this._onHashChange);
  }

  _onHashChange() {
    this.currentHash = window.location.hash || '#/';
  }

  render() {
    let view = html`<po20-landing></po20-landing>`;

    if (this.currentHash.startsWith('#/pattern')) {
      view = html`<po20-pattern-editor></po20-pattern-editor>`;
    } else if (this.currentHash.startsWith('#/chord')) {
      view = html`<po20-chord-editor></po20-chord-editor>`;
    } else if (this.currentHash === '#/patterns') {
      view = html`<po20-landing .filter="${'patterns'}"></po20-landing>`;
    } else if (this.currentHash === '#/chords') {
      view = html`<po20-landing .filter="${'chords'}"></po20-landing>`;
    }

    return html`
      <po20-header></po20-header>
      <main>
        ${view}
      </main>
      <po20-footer></po20-footer>
    `;
  }
}

customElements.define('po20-app', PO20App);
