class GameMediaGallery extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentImageIndex = 0;
    this.imageList = [];
    this._renderTimeout = null;
  }

  connectedCallback() {
    this.scheduleRender();
  }

  static get observedAttributes() {
    return ['title', 'layout', 'images'];
  }

  attributeChangedCallback() {
    this.scheduleRender();
  }

  scheduleRender() {
    // Debounce renders to avoid multiple re-renders in quick succession
    if (this._renderTimeout) {
      clearTimeout(this._renderTimeout);
    }
    this._renderTimeout = setTimeout(() => {
      this.render();
      this._renderTimeout = null;
    }, 0);
  }

  showImage(index) {
    if (!this.imageList || this.imageList.length === 0) {
      console.error('imageList is empty or undefined');
      return;
    }
    
    if (index < 0) index = this.imageList.length - 1;
    if (index >= this.imageList.length) index = 0;
    
    this.currentImageIndex = index;
    const modalImage = this.shadowRoot.querySelector('.modal-image');
    if (modalImage) {
      modalImage.src = this.imageList[index];
    }
    
    // Hide/show arrows based on number of images
    const arrows = this.shadowRoot.querySelectorAll('.modal-arrow');
    arrows.forEach(arrow => {
      arrow.style.display = this.imageList.length > 1 ? 'flex' : 'none';
    });
  }

  attachEventListeners() {
    const galleryItems = this.shadowRoot.querySelectorAll('.gallery-item');
    const modal = this.shadowRoot.querySelector('.modal');
    const modalImage = this.shadowRoot.querySelector('.modal-image');
    const closeBtn = this.shadowRoot.querySelector('.modal-close');
    const prevBtn = this.shadowRoot.querySelector('.modal-prev');
    const nextBtn = this.shadowRoot.querySelector('.modal-next');

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.showImage(index);
        modal.classList.add('active');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.classList.remove('active');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showImage(this.currentImageIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showImage(this.currentImageIndex + 1);
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }

    // Keyboard navigation
    const handleKeydown = (e) => {
      if (!modal.classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.showImage(this.currentImageIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.showImage(this.currentImageIndex + 1);
      } else if (e.key === 'Escape') {
        modal.classList.remove('active');
      }
    };

    document.addEventListener('keydown', handleKeydown);
    
    // Store reference to remove listener if component is destroyed
    this._keydownHandler = handleKeydown;
  }

  disconnectedCallback() {
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
    }
  }

  render() {
    const title = this.getAttribute('title') || 'Screenshots & Videos';
    const images = this.getAttribute('images');
    const layout = this.getAttribute('layout') || 'grid';
    
    // Always update imageList when rendering
    this.imageList = images ? images.split(',').map(img => img.trim()) : [];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        .gallery {
          padding: ${layout === 'vertical' ? '0' : '3rem 2rem'};
          background: ${layout === 'vertical' ? 'transparent' : '#f8f9fa'};
        }

        .gallery-container {
          max-width: ${layout === 'vertical' ? '100%' : '1200px'};
          margin: 0 auto;
        }

        h2 {
          font-size: ${layout === 'vertical' ? '1.25rem' : '2rem'};
          margin: 0 0 ${layout === 'vertical' ? '1rem' : '2rem'} 0;
          text-align: ${layout === 'vertical' ? 'left' : 'center'};
          color: #2c3e50;
        }

        .gallery-grid {
          display: ${layout === 'vertical' ? 'flex' : 'grid'};
          ${layout === 'vertical' ? 'flex-direction: column;' : 'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));'}
          gap: ${layout === 'vertical' ? '1rem' : '1.5rem'};
        }

        .gallery-item {
          position: relative;
          cursor: pointer;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
          transform: ${layout === 'vertical' ? 'translateX(4px)' : 'translateY(-4px)'};
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .gallery-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .slot-container {
          display: contents;
        }

        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          align-items: center;
          justify-content: center;
        }

        .modal.active {
          display: flex;
        }

        .modal-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-image {
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
          display: block;
        }

        .modal-close {
          position: absolute;
          top: -3rem;
          right: -0.5rem;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 2rem;
          cursor: pointer;
          padding: 0.5rem;
          line-height: 1;
          transition: opacity 0.2s ease;
          z-index: 1002;
        }

        .modal-close:hover {
          opacity: 0.7;
        }

        .modal-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.5);
          color: #fff;
          font-size: 2rem;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
          z-index: 1001;
        }

        .modal-arrow:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.8);
        }

        .modal-prev {
          left: 2rem;
        }

        .modal-next {
          right: 2rem;
        }

        @media (max-width: 768px) {
          .modal-arrow {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }

          .modal-prev {
            left: 1rem;
          }

          .modal-next {
            right: 1rem;
          }
        }
      </style>

      <div class="gallery">
        <div class="gallery-container">
          <h2>${title}</h2>
          <div class="gallery-grid">
            ${this.imageList.map(img => `
              <div class="gallery-item">
                <img src="${img}" alt="Game screenshot" class="gallery-image" />
              </div>
            `).join('')}
            <div class="slot-container">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>

      <div class="modal">
        <button class="modal-arrow modal-prev">‹</button>
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <img src="" alt="Full size screenshot" class="modal-image" />
        </div>
        <button class="modal-arrow modal-next">›</button>
      </div>
    `;
    
    // Attach event listeners after rendering
    requestAnimationFrame(() => {
      this.attachEventListeners();
    });
  }
}

customElements.define('game-media-gallery', GameMediaGallery);
