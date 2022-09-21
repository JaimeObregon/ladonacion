const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    ::slotted(figure) {
      margin: 0;
    }
  </style>
  <slot></slot>
`

customElements.define(
  'ladonacion-slideshow',
  class extends HTMLElement {
    connectedCallback() {
      // At the moment this component will only display one single figure.
      // In the future a carousel or a button to show more could be implemented.
      this.querySelectorAll('figure:not(:first-of-type)').forEach((figure) =>
        figure.remove()
      )
    }

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }
  }
)
