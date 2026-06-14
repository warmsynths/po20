import { LitElement, html, css } from 'lit';

export class PO20LcdScreen extends LitElement {
  static properties = {
    titleText: { type: String },
    subtitleText: { type: String },
    paramA: { type: String }, // Can be value or note name
    paramB: { type: Number },
    activeSteps: { type: Array }, // Array of boolean/active states for the 16 steps
    selectedStep: { type: Number },
    isPlaying: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'VT323', monospace;
      user-select: none;
    }

    .lcd-bezel {
      background: #121316;
      border: 6px solid #232427;
      border-radius: 12px;
      padding: 6px;
      box-shadow: 
        inset 0 4px 6px rgba(0,0,0,0.8),
        0 10px 20px rgba(0,0,0,0.5);
    }

    .lcd-glass {
      background: #b8c9b0;
      border-radius: 6px;
      padding: 12px 16px;
      box-shadow: inset 0 3px 10px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 120px;
      grid-gap: 12px;
      min-height: 110px;
    }

    /* Faint glass reflection */
    .lcd-glass::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%);
      pointer-events: none;
    }

    .lcd-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #1e261c;
      text-shadow: 1px 1px 0px rgba(255,255,255,0.3);
    }

    .lcd-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      color: #1e261c;
      border-left: 2px dashed rgba(30, 38, 28, 0.2);
      padding-left: 12px;
    }

    .lcd-title {
      font-size: 24px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 1;
      margin: 0;
    }

    .lcd-subtitle {
      font-size: 18px;
      opacity: 0.8;
      line-height: 1;
      margin-top: 4px;
      text-transform: uppercase;
    }

    .params-display {
      display: flex;
      gap: 16px;
      margin-top: 10px;
    }

    .param-group {
      display: flex;
      flex-direction: column;
    }

    .param-lbl {
      font-size: 11px;
      text-transform: uppercase;
      opacity: 0.6;
    }

    .param-val {
      font-size: 20px;
      font-weight: bold;
      line-height: 1;
    }

    /* Tiny 16-step matrix visualizer */
    .mini-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 3px;
      width: 44px;
      margin-bottom: 4px;
    }

    .mini-dot {
      width: 6px;
      height: 6px;
      border: 1px solid rgba(30, 38, 28, 0.4);
      background: transparent;
      border-radius: 50%;
    }

    .mini-dot.active {
      background: #1e261c;
      box-shadow: 0 0 1px rgba(30, 38, 28, 0.8);
    }

    .mini-dot.selected {
      border-color: #1e261c;
      background: repeating-linear-gradient(45deg, #1e261c, #1e261c 2px, transparent 2px, transparent 4px);
    }

    /* Quirky Arcade animations */
    .arcade-anim-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 50px;
    }

    .arcade-anim {
      width: 40px;
      height: 40px;
      fill: #1e261c;
    }

    .bounce {
      animation: bounce 0.6s infinite alternate ease-in-out;
    }

    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(-6px); }
    }
  `;

  constructor() {
    super();
    this.titleText = 'PO-20 ARCADE';
    this.subtitleText = 'Companion';
    this.paramA = '--';
    this.paramB = 0;
    this.activeSteps = [];
    this.selectedStep = null;
    this.isPlaying = false;
  }

  render() {
    return html`
      <div class="lcd-bezel">
        <div class="lcd-glass">
          
          <div class="lcd-left">
            <div>
              <h2 class="lcd-title">${this.titleText}</h2>
              <div class="lcd-subtitle">${this.subtitleText}</div>
            </div>
            
            <div class="params-display">
              <div class="param-group">
                <span class="param-lbl">PITCH/VAL-A</span>
                <span class="param-val">${this.paramA !== null && this.paramA !== undefined && this.paramA !== '' ? this.paramA : '--'}</span>
              </div>
              <div class="param-group">
                <span class="param-lbl">FILTER/VAL-B</span>
                <span class="param-val">${this.paramB !== null && this.paramB !== undefined ? this.paramB : '--'}</span>
              </div>
            </div>
          </div>
          
          <div class="lcd-right">
            <!-- Mini Step Matrix -->
            <div>
              <div style="font-size: 11px; opacity: 0.6; text-transform: uppercase; margin-bottom: 2px;">Steps</div>
              <div class="mini-matrix">
                ${Array.from({ length: 16 }).map((_, i) => {
                  const stepNum = i + 1;
                  const isActive = this.activeSteps && this.activeSteps[stepNum] && this.activeSteps[stepNum].active;
                  const isSel = this.selectedStep === stepNum;
                  return html`
                    <div class="mini-dot ${isActive ? 'active' : ''} ${isSel ? 'selected' : ''}"></div>
                  `;
                })}
              </div>
            </div>

            <!-- Arcade Cabinet Animation -->
            <div class="arcade-anim-container">
              <svg class="arcade-anim ${this.isPlaying ? 'bounce' : ''}" viewBox="0 0 100 100">
                <!-- Arcade cabinet silhouette -->
                <path d="M 25 90 
                         L 75 90 
                         L 75 40 
                         L 65 30 
                         L 65 10 
                         L 35 10 
                         L 35 30 
                         L 25 40 Z" stroke="#1e261c" stroke-width="6" fill="none" />
                <!-- Screen inside cabinet -->
                <rect x="42" y="20" width="16" height="12" stroke="#1e261c" stroke-width="2" fill="#1e261c" />
                <!-- Joystick and buttons -->
                <circle cx="45" cy="45" r="3" />
                <circle cx="55" cy="45" r="2" />
                <circle cx="59" cy="45" r="2" />
                <!-- Coin slot detail -->
                <line x1="50" y1="65" x2="50" y2="78" stroke="#1e261c" stroke-width="4" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('po20-lcd-screen', PO20LcdScreen);
