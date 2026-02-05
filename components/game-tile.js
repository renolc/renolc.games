class GameTile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['game-name', 'image', 'steam-link', 'itch-link', 'info-link', 'banner', 'banner-color'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const gameName = this.getAttribute('game-name') || 'Game Title';
    const image = this.getAttribute('image') || '';
    const steamLink = this.getAttribute('steam-link');
    const itchLink = this.getAttribute('itch-link');
    const infoLink = this.getAttribute('info-link') || `/games/${gameName.toLowerCase().replace(/\s+/g, '-')}`;
    const banner = this.getAttribute('banner');
    const bannerColor = this.getAttribute('banner-color') || 'blue';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .tile {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .tile:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .tile-image-container {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 aspect ratio */
          background: #e0e0e0;
          overflow: hidden;
          cursor: pointer;
        }

        .tile-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .banner {
          position: absolute;
          top: 2.25rem;
          left: -3rem;
          transform: rotate(-45deg);
          padding: 0.35rem 3rem;
          font-size: 0.75rem;
          font-weight: bold;
          text-transform: uppercase;
          color: #fff;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          z-index: 10;
          letter-spacing: 0.5px;
        }

        .banner-blue {
          background: linear-gradient(135deg, #3498db, #2980b9);
        }

        .banner-green {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
        }

        .banner-orange {
          background: linear-gradient(135deg, #e67e22, #d35400);
        }

        .banner-red {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
        }

        .banner-purple {
          background: linear-gradient(135deg, #9b59b6, #8e44ad);
        }

        .tile-content {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .tile-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0 0 1rem 0;
          color: #2c3e50;
        }

        .tile-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: auto;
        }

        .tile-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .link-icon {
          width: 32px;
          height: 32px;
          fill: currentColor;
        }

        .link-info {
          background: transparent;
          color: #3498db;
          border: 2px solid #3498db;
          padding: 0.625rem;
          min-width: 44px;
          justify-content: center;
        }

        .link-info .link-icon {
          filter: invert(46%) sepia(94%) saturate(1159%) hue-rotate(180deg) brightness(93%) contrast(91%);
        }

        .link-info:hover {
          background: #3498db;
          color: #fff;
        }

        .link-info:hover .link-icon {
          filter: brightness(0) invert(1);
        }

        .link-steam {
          background: transparent;
          color: #171a21;
          border: 2px solid #171a21;
          padding: 0.625rem;
          min-width: 44px;
          justify-content: center;
        }

        .link-steam .link-icon {
          filter: brightness(0) saturate(100%) invert(8%) sepia(10%) saturate(2064%) hue-rotate(169deg) brightness(96%) contrast(95%);
        }

        .link-steam:hover {
          background: #171a21;
          color: #fff;
        }

        .link-steam:hover .link-icon {
          filter: brightness(0) invert(1);
        }

        .link-itch {
          background: transparent;
          color: #fa5c5c;
          border: 2px solid #fa5c5c;
          padding: 0.625rem;
          min-width: 44px;
          justify-content: center;
        }

        .link-itch .link-icon {
          filter: invert(56%) sepia(43%) saturate(2489%) hue-rotate(324deg) brightness(100%) contrast(97%);
        }

        .link-itch:hover {
          background: #fa5c5c;
          color: #fff;
        }

        .link-itch:hover .link-icon {
          filter: brightness(0) invert(1);
        }

        .external-links {
          display: flex;
          gap: 0.5rem;
        }

        @media (max-width: 640px) {
          .tile-links {
            flex-direction: column;
          }

          .external-links {
            width: 100%;
          }

          .tile-link {
            flex: 1;
            justify-content: center;
          }
        }
      </style>

      <div class="tile">
        <a href="${infoLink}" class="tile-image-container">
          ${image ? `<img src="${image}" alt="${gameName}" class="tile-image" />` : ''}
          ${banner ? `<div class="banner banner-${bannerColor}">${banner}</div>` : ''}
        </a>
        <div class="tile-content">
          <h3 class="tile-title">${gameName}</h3>
          <div class="tile-links">
            <a href="${infoLink}" class="tile-link link-info" title="Learn More">
              <img src="./assets/icons/circle-info-solid-full.svg" alt="Learn More" class="link-icon" />
            </a>
            ${steamLink || itchLink ? `
              <div class="external-links">
                ${steamLink ? `<a href="${steamLink}" target="_blank" rel="noopener" class="tile-link link-steam" title="Steam">
                  <img src="./assets/icons/steam-brands-solid-full.svg" alt="Steam" class="link-icon" />
                </a>` : ''}
                ${itchLink ? `<a href="${itchLink}" target="_blank" rel="noopener" class="tile-link link-itch" title="Itch.io">
                  <img src="./assets/icons/itch-io-brands-solid-full.svg" alt="Itch.io" class="link-icon" />
                </a>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('game-tile', GameTile);
