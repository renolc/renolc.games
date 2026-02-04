class CTASection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'description', 'button-text', 'button-link', 'image', 'theme'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'New Game Announcement';
    const description = this.getAttribute('description') || 'Check out our latest game!';
    const buttonText = this.getAttribute('button-text') || 'Learn More';
    const buttonLink = this.getAttribute('button-link') || '#';
    const image = this.getAttribute('image');
    const theme = this.getAttribute('theme') || 'dark';

    const themeColors = {
      dark: { bg: '#1a1a2e', accent: '#e94560' },
      blue: { bg: '#2c3e50', accent: '#3498db' },
      green: { bg: '#27ae60', accent: '#2ecc71' },
      purple: { bg: '#8e44ad', accent: '#9b59b6' }
    };

    const colors = themeColors[theme] || themeColors.dark;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 2rem 0;
        }

        .cta-container {
          background: ${colors.bg};
          color: #fff;
          padding: 4rem 2rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .cta-image {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .cta-text {
          flex: 1;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-button {
          display: inline-block;
          background: ${colors.accent};
          color: #fff;
          padding: 1rem 3rem;
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: bold;
          border-radius: 4px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .cta-button:active {
          transform: translateY(0);
        }

        @media (min-width: 768px) {
          .cta-content {
            flex-direction: row;
            text-align: left;
          }

          .cta-content.has-image {
            gap: 3rem;
          }

          .cta-image {
            max-width: 400px;
          }
        }
      </style>

      <div class="cta-container">
        <div class="cta-content ${image ? 'has-image' : ''}">
          ${image ? `<img src="${image}" alt="${title}" class="cta-image" />` : ''}
          <div class="cta-text">
            <h2>${title}</h2>
            <p>${description}</p>
            <a href="${buttonLink}" class="cta-button">${buttonText}</a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('cta-section', CTASection);
