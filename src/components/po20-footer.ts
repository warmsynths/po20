import { LitElement, html, css, TemplateResult } from 'lit';
import POimage from '../assets/PO20-arcade-side.png';

export class PO20Footer extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      padding: 40px 16px;
      background: var(--bg-base);
      border-top: 2px solid var(--bg-surface);
      box-sizing: border-box;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    img {
      max-width: 380px;
      width: 100%;
      height: auto;
      opacity: 0.85;
      filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6));
      transition: opacity 0.2s;
    }

    img:hover {
      opacity: 1;
    }

    .copyright {
      font-size: 13px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .github-link {
      color: var(--accent);
      text-decoration: none;
      font-weight: bold;
      transition: color 0.2s;
    }

    .github-link:hover {
      color: var(--accent-hover, #ff7043);
      text-decoration: underline;
    }
  `;

  override render(): TemplateResult {
    return html`
      <div class="footer-content">
        <img src="${POimage}" alt="PO-20 Arcade Hardware Layout" />
        <div class="copyright">
          PO-20 Arcade Companion • TE Inspired • 
          <a href="https://github.com/warmsynths/po20" target="_blank" class="github-link">Developed by warmsynths</a>
        </div>
      </div>
    `;
  }
}

customElements.define('po20-footer', PO20Footer);

declare global {
  interface HTMLElementTagNameMap {
    'po20-footer': PO20Footer;
  }
}
