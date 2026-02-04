class GameHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'tagline', 'image', 'steam-link', 'itch-link', 'steam-button-text', 'itch-button-text'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Game Title';
    const tagline = this.getAttribute('tagline') || '';
    const image = this.getAttribute('image') || '';
    const steamLink = this.getAttribute('steam-link');
    const itchLink = this.getAttribute('itch-link');
    const steamButtonText = this.getAttribute('steam-button-text') || 'Get on Steam';
    const itchButtonText = this.getAttribute('itch-button-text') || 'Get on Itch.io';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 4rem 2rem;
          text-align: center;
          color: #fff;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-text {
          text-align: left;
        }

        h1 {
          font-size: 3rem;
          margin: 0 0 1rem 0;
          line-height: 1.1;
        }

        .tagline {
          font-size: 1.5rem;
          opacity: 0.95;
          margin-bottom: 2rem;
        }

        .hero-image {
          width: 100%;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: #fff;
          color: #667eea;
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: bold;
          border-radius: 6px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .cta-icon {
          width: 24px;
          height: 24px;
        }

        .btn-steam {
          background: #171a21;
          color: #fff;
        }

        .btn-itch {
          background: #fa5c5c;
          color: #fff;
        }

        @media (min-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr 1fr;
          }

          .hero-text {
            order: -1;
          }
        }

        @media (max-width: 640px) {
          h1 {
            font-size: 2rem;
          }

          .tagline {
            font-size: 1.125rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-button {
            justify-content: center;
          }
        }
      </style>

      <div class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <h1>${title}</h1>
            ${tagline ? `<p class="tagline">${tagline}</p>` : ''}
            <div class="cta-buttons">
              ${steamLink ? `
                <a href="${steamLink}" target="_blank" rel="noopener" class="cta-button btn-steam">
                  <img src="/assets/icons/steam-brands-solid-full.svg" alt="" class="cta-icon" style="filter: brightness(0) invert(1);" />
                  ${steamButtonText}
                </a>
              ` : ''}
              ${itchLink ? `
                <a href="${itchLink}" target="_blank" rel="noopener" class="cta-button btn-itch">
                  <img src="/assets/icons/itch-io-brands-solid-full.svg" alt="" class="cta-icon" style="filter: brightness(0) invert(1);" />
                  ${itchButtonText}
                </a>
              ` : ''}
            </div>
          </div>
          ${image ? `<img src="${image}" alt="${title}" class="hero-image" />` : ''}
        </div>
      </div>
    `;
  }
}

customElements.define('game-hero', GameHero);
