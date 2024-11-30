(function() {
  if (customElements.get('v-sep')) {
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
      // Prevent innerHTML/innerText from rendering.
      get innerHTML() { return ''; }
      set innerHTML(value) {}
    }
    customElements.define('v-sep', VerticalSep);
  }
  if (customElements.get('h-sep')) {
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
      // Prevent innerHTML/innerText from rendering.
      get innerHTML() { return ''; }
      set innerHTML(value) {}
    }
    customElements.define('h-sep', HorizontalSep);
  }
})();