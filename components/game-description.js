class GameDescription extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const content = this.innerHTML;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .description {
          max-width: 100%;
          margin: 0;
          padding: 0;
          line-height: 1.8;
          font-size: 1.125rem;
          color: #333;
        }

        ::slotted(h2) {
          font-size: 2rem;
          margin: 2rem 0 1rem 0;
          color: #2c3e50;
        }

        ::slotted(h3) {
          font-size: 1.5rem;
          margin: 1.5rem 0 0.75rem 0;
          color: #2c3e50;
        }

        ::slotted(p) {
          margin: 1rem 0;
        }

        ::slotted(ul), ::slotted(ol) {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        ::slotted(li) {
          margin: 0.5rem 0;
        }

        ::slotted(strong) {
          color: #667eea;
        }
      </style>

      <div class="description">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('game-description', GameDescription);
