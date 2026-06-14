import { LitElement, html, css } from 'lit';
import POimage from '../assets/PO20-arcade-side.png';

export class PO20Footer extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      padding: 40px 16px;
      background: #121316;
      border-top: 2px solid #1c1d22;
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
      color: #5a5d65;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
  `;

  render() {
    return html`
      <div class="footer-content">
        <img src="${POimage}" alt="PO-20 Arcade Hardware Layout" />
        <div class="copyright">PO-20 Arcade Companion • TE Inspired</div>
      </div>
    `;
  }
}

customElements.define('po20-footer', PO20Footer);
