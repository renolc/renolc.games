class DynamicGamePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadGame();
  }

  async loadGame() {
    try {
      // Get game ID from the URL path (e.g., /games/hot-sauce-chaos/ -> hot-sauce-chaos)
      const pathParts = window.location.pathname.split('/').filter(p => p);
      const gameId = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
      
      const response = await fetch('/games.json', { cache: 'no-store' });
      const data = await response.json();
      const game = data.games.find(g => g.id === gameId);
      
      if (game) {
        this.render(game);
      } else {
        this.renderNotFound();
      }
    } catch (error) {
      console.error('Failed to load game:', error);
      this.renderError();
    }
  }

  render(game) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .content-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <game-hero 
        title="${game.name}"
        tagline="${game.tagline}"
        image="${game.image}"
        ${game.steamLink ? `steam-link="${game.steamLink}"` : ''}
        ${game.itchLink ? `itch-link="${game.itchLink}"` : ''}
        ${game.steamButtonText ? `steam-button-text="${game.steamButtonText}"` : ''}
        ${game.itchButtonText ? `itch-button-text="${game.itchButtonText}"` : ''}>
      </game-hero>

      <div class="content-wrapper">
        <game-description>
          ${game.description}
        </game-description>

        ${game.screenshots && game.screenshots.length > 0 ? `
          <game-media-gallery 
            title="Screenshots"
            images="${game.screenshots.join(',')}"
            layout="vertical">
          </game-media-gallery>
        ` : ''}
      </div>
    `;
  }

  renderNotFound() {
    this.shadowRoot.innerHTML = `
      <style>
        .error {
          text-align: center;
          padding: 4rem 2rem;
        }
      </style>
      <div class="error">
        <h1>Game Not Found</h1>
        <p>Sorry, we couldn't find that game.</p>
        <a href="/">Back to Home</a>
      </div>
    `;
  }

  renderError() {
    this.shadowRoot.innerHTML = `
      <style>
        .error {
          text-align: center;
          padding: 4rem 2rem;
        }
      </style>
      <div class="error">
        <h1>Error</h1>
        <p>Failed to load game data.</p>
        <a href="/">Back to Home</a>
      </div>
    `;
  }
}

customElements.define('dynamic-game-page', DynamicGamePage);
