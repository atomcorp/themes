import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0


  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          Img  fdfdf
        </a>
        <a href="https://lit.dev" target="_blank">
          Img here
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p>
      <p>Theme name: ${colorSchemesAndMeta[0].name}</p>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 4rem;
      text-align: center;
      color: red;
    }

  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
