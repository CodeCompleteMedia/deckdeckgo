import { LitElement, html, css } from 'lit';

class Navigation extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      background-color: #1f2937;
    }

    .navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .start, .end {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .menu-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .nav-link {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #d1d5db;
      text-decoration: none;
      transition: all 0.2s;
    }

    .nav-link:hover {
      background-color: #374151;
      color: #ffffff;
    }

    .nav-link.active {
      background-color: #111827;
      color: #ffffff;
    }
  `;

  static properties = {
    currentPath: { 
      type: String,
      attribute: 'current-path',
      reflect: true
    }
  };

  private _currentPath = '/';

  get currentPath() {
    return this._currentPath;
  }

  set currentPath(value: string) {
    const oldValue = this._currentPath;
    this._currentPath = value;
    this.requestUpdate('currentPath', oldValue);
  }

  private hideAnnouncement = localStorage.getItem('deckdeckgo-hide-announcement') !== null;

  private getLinkClass(path: string) {
    return this.currentPath === path ? 'nav-link active' : 'nav-link';
  }

  render() {
    return html`
      <nav class="navigation">
        <div class="start">
          <a href="/dashboard" class=${this.getLinkClass('/dashboard')}>Dashboard</a>
          <a href="/editor" class=${this.getLinkClass('/editor')}>Editor</a>
          <a href="/templates" class=${this.getLinkClass('/templates')}>Templates</a>
        </div>
        <div class="end">
          <slot name="end"></slot>
        </div>
      </nav>
    `;
  }
}

// Register the custom element
if (typeof window !== 'undefined') {
  customElements.define('app-navigation', Navigation);
}

declare global {
  interface HTMLElementTagNameMap {
    'app-navigation': Navigation;
  }
}

export { Navigation }; 