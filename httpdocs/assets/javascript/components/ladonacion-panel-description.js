import '/assets/javascript/components/ladonacion-excerpt.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-weight: 500;
      padding: var(--padding);
      line-height: 1.25;
      background: var(--color-warmGray-100);
      hyphens: auto;
    }

    ::slotted(a) {
      font-weight: 600;
      text-decoration: underline;
      color: var(--color-yellow-600);
    }

    ::slotted(a:hover) {
      text-decoration: none;
      background: var(--color-yellow-600);
      color: var(--color-yellow-50);
    }

    :host([dark]) {
      background: var(--color-warmGray-700);
      color: var(--color-warmGray-50);
    }

    :host([dark]) ::slotted(a) {
      color: var(--color-yellow-500);
    }

    :host([dark]) ::slotted(a:hover) {
      background: var(--color-yellow-500);
      color: var(--color-warmGray-900);
    }

    @media (max-width: 1280px) {
      :host {
        font-size: 0.9em;
      }
    }
  </style>
  <ladonacion-excerpt>
    <slot></slot>
  </ladonacion-excerpt>
`

customElements.define(
  'ladonacion-panel-description',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }
  }
)
