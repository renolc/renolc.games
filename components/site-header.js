class SiteHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        header {
          padding: 1.5rem 2rem;
        }

        nav {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #2c3e50;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 4px;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .social-links {
          display: flex;
          gap: 1.25rem;
          list-style: none;
          align-items: center;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          transition: opacity 0.2s ease;
        }

        .social-link:hover {
          opacity: 0.7;
        }

        .social-icon {
          width: 24px;
          height: 24px;
        }

        @media (max-width: 640px) {
          header {
            padding: 1rem 1rem;
          }

          .logo-text {
            display: none;
          }

          .social-links {
            gap: 0.5rem;
          }
        }
      </style>

      <header>
        <nav>
          <a href="/" class="logo-container">
            <img src="/assets/favicon/android-chrome-192x192.png" alt="" class="logo-icon" />
            <span class="logo-text">renolc.games</span>
          </a>
          <ul class="social-links">
            <!--<li>
              <a href="https://store.steampowered.com" target="_blank" rel="noopener" class="social-link" title="Steam">
                <img src="/assets/icons/steam-brands-solid-full.svg" alt="Steam" class="social-icon" />
              </a>
            </li>-->
            <li>
              <a href="https://bsky.app/profile/renolc.games" target="_blank" rel="noopener" class="social-link" title="Bluesky">
                <img src="/assets/icons/bluesky-brands-solid-full.svg" alt="Bluesky" class="social-icon" />
              </a>
            </li>
            <li>
              <a href="https://mastodon.gamedev.place/@renolc" target="_blank" rel="noopener" class="social-link" title="Mastodon">
                <img src="/assets/icons/mastodon-brands-solid-full.svg" alt="Mastodon" class="social-icon" />
              </a>
            </li>
            <li>
              <a href="mailto:hello@renolc.games" class="social-link" title="Email">
                <img src="/assets/icons/envelope-solid-full.svg" alt="Email" class="social-icon" />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define('site-header', SiteHeader);
