import { LitElement, html, css } from 'lit';

export class PO20Knob extends LitElement {
  static properties = {
    value: { type: Number },
    min: { type: Number },
    max: { type: Number },
    label: { type: String },
    param: { type: String }
  };

  static styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
      font-family: 'VT323', monospace;
    }

    .knob-container {
      position: relative;
      width: 70px;
      height: 70px;
      cursor: ns-resize;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, #3a3b40 0%, #202124 100%);
      border: 3px solid #121316;
      border-radius: 50%;
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.1),
        0 4px 6px rgba(0, 0, 0, 0.4);
      transition: border-color 0.2s ease;
    }

    .knob-container:hover {
      border-color: #ff5722;
    }

    .knob-dial {
      width: 100%;
      height: 100%;
      transform-origin: center;
      transition: transform 0.05s linear;
    }

    .indicator-dot {
      fill: #ff5722;
      filter: drop-shadow(0 0 2px rgba(255, 87, 34, 0.8));
    }

    .label {
      font-size: 14px;
      color: #8a8d95;
      text-transform: uppercase;
      margin-top: 6px;
      letter-spacing: 1px;
    }

    .value {
      font-size: 18px;
      color: #ffaa00;
      margin-top: 2px;
      background: #000;
      padding: 1px 6px;
      border-radius: 3px;
      border: 1px solid #333;
      min-width: 32px;
      text-align: center;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.8);
    }
  `;

  constructor() {
    super();
    this.value = 0;
    this.min = 0;
    this.max = 100;
    this.label = '';
    this.param = '';
    
    this._startY = 0;
    this._startValue = 0;
    this._isDragging = false;

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
  }

  render() {
    // Map value to rotation angle: min is -135deg, max is 135deg
    const percent = (this.value - this.min) / (this.max - this.min);
    const angle = -135 + percent * 270;

    return html`
      <div 
        class="knob-container" 
        @mousedown="${this._onMouseDown}"
        @touchstart="${this._onTouchStart}"
        @wheel="${this._onWheel}"
      >
        <svg class="knob-dial" viewBox="0 0 100 100" style="transform: rotate(${angle}deg)">
          <!-- Outer Rim shadow -->
          <circle cx="50" cy="50" r="44" fill="none" stroke="#2a2b2f" stroke-width="4" />
          <!-- Knob Cap -->
          <circle cx="50" cy="50" r="38" fill="#2c2d31" />
          <!-- TE stylized notch details -->
          <circle cx="50" cy="50" r="30" fill="none" stroke="#232427" stroke-width="2" />
          <!-- Dial Line/Indicator Dot -->
          <circle class="indicator-dot" cx="50" cy="18" r="4.5" />
        </svg>
      </div>
      <div class="label">${this.label || this.param}</div>
      <div class="value">${this.value}</div>
    `;
  }

  _onMouseDown(e) {
    e.preventDefault();
    this._startY = e.clientY;
    this._startValue = this.value;
    this._isDragging = true;

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
  }

  _onMouseMove(e) {
    if (!this._isDragging) return;
    
    // 1 pixel dragged = 0.5 units of change (feels responsive)
    const deltaY = this._startY - e.clientY;
    const change = deltaY * 0.5;
    let newValue = Math.round(this._startValue + change);
    
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    
    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  _onMouseUp() {
    this._isDragging = false;
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
  }

  _onWheel(e) {
    e.preventDefault();
    // Scroll up = increase, scroll down = decrease
    const step = e.deltaY < 0 ? 1 : -1;
    let newValue = this.value + step;
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    
    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  _onTouchStart(e) {
    if (e.touches.length !== 1) return;
    e.preventDefault(); // Prevent scrolling while dragging knob
    this._startY = e.touches[0].clientY;
    this._startValue = this.value;
    this._isDragging = true;

    window.addEventListener('touchmove', this._onTouchMove, { passive: false });
    window.addEventListener('touchend', this._onTouchEnd);
    window.addEventListener('touchcancel', this._onTouchEnd);
  }

  _onTouchMove(e) {
    if (!this._isDragging) return;
    if (e.touches.length !== 1) return;
    
    const deltaY = this._startY - e.touches[0].clientY;
    const change = deltaY * 0.5;
    let newValue = Math.round(this._startValue + change);
    
    newValue = Math.max(this.min, Math.min(this.max, newValue));
    
    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  _onTouchEnd() {
    this._isDragging = false;
    window.removeEventListener('touchmove', this._onTouchMove);
    window.removeEventListener('touchend', this._onTouchEnd);
    window.removeEventListener('touchcancel', this._onTouchEnd);
  }

  _dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value, param: this.param },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('po20-knob', PO20Knob);
