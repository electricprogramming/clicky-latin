class VerticalSep extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
        mode: 'open'
    });
  }
  connectedCallback() {
    this.updateGap();
  }
  get gap() {
    return this.getAttribute('gap') || '10px';
  }

  set gap(value) {
    this.setAttribute('gap', value);
    this.updateGap();
  }
  updateGap() {
    const gap = this.gap;
    this.style.display = 'block';
    this.style.height = `${gap}`;
    this.style.width = '100%';
  }
}
customElements.define('v-sep', VerticalSep);
class HorizontalSep extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
        mode: 'open'
    });
  }
  connectedCallback() {
    this.updateGap();
  }
  get gap() {
    return this.getAttribute('gap') || '10px';
  }
  set gap(value) {
    this.setAttribute('gap', value);
    this.updateGap();
  }
  updateGap() {
    const gap = this.gap;
    this.style.display = 'block';
    this.style.width = `${gap}`;
    this.style.height = '100%';
  }
}
customElements.define('h-sep', HorizontalSep);