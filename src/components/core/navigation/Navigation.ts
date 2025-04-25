import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('app-navigation')
export class Navigation extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .navigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--deckdeckgo-navigation-background, #ffffff);
      box-shadow: var(--deckdeckgo-navigation-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
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
  `;

  @property({ type: String })
  actions: 'all' | 'none' | 'editor-less' = 'editor-less';

  @state()
  private hideAnnouncement = localStorage.getItem('deckdeckgo-hide-announcement') !== null;

  private toggleMenu() {
    this.dispatchEvent(new CustomEvent('menuToggle'));
  }

  render() {
    return html`
      <div class="navigation">
        <div class="start">
          <button class="menu-button" @click=${this.toggleMenu} aria-label="Menu">
            <svg class="menu-icon" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          ${this.actions === 'all' ? html`<slot name="start"></slot>` : null}
        </div>
        <div class="end">
          ${this.actions !== 'none' ? html`<slot name="end"></slot>` : null}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-navigation': Navigation;
  }
} 