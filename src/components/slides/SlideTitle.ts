import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('slide-title')
export class SlideTitle extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    
    h1 {
      margin: 0;
      font-size: 2.5rem;
      color: var(--deckdeckgo-slide-title-color, #000);
    }
  `;

  @property({ type: String })
  title = '';

  render() {
    return html`
      <h1>${this.title}</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slide-title': SlideTitle;
  }
} 