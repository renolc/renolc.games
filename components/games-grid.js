class GamesGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadGames();
  }

  async loadGames() {
    try {
      const response = await fetch('/games.json', { cache: 'no-store' });
      const data = await response.json();
      this.render(data.games);
    } catch (error) {
      console.error('Failed to load games:', error);
      this.render([]);
    }
  }

  render(games) {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
      </style>

      <div class="games-grid">
        ${games.length === 0 ? '<div class="loading">Loading games...</div>' : ''}
        ${games.map(game => `
          <game-tile
            game-name="${game.name}"
            image="${game.image}"
            ${game.steamLink ? `steam-link="${game.steamLink}"` : ''}
            ${game.itchLink ? `itch-link="${game.itchLink}"` : ''}
            ${game.banner ? `banner="${game.banner}"` : ''}
            ${game.bannerColor ? `banner-color="${game.bannerColor}"` : ''}
            info-link="/games/${game.id}/">
          </game-tile>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('games-grid', GamesGrid);
