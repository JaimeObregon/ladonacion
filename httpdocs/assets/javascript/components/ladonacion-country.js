import { data } from '/resources/ladonacion.js'
import { countries } from '/assets/javascript/modules/countries.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    figure {
      display: inline-flex;
      align-items: center;
      margin: 0;
      white-space: nowrap;
      vertical-align: middle;
    }

    ::slotted(img) {
      height: 1em;
      margin-right: 0.5em;
      vertical-align: middle;
    }
  </style>
  <figure>
    <slot name="flag"></slot>
    <figcaption>
      <slot name="caption">${name}</slot>
    </figcaption>
  </figure>
`

customElements.define(
  'ladonacion-country',
  class extends HTMLElement {
    connectedCallback() {
      const code = this.getAttribute('country')
      const name = countries[code.toUpperCase()]

      this.innerHTML = `
        <img slot="flag" src="/assets/images/flags/4x3/${code}.svg" alt="Bandera de ${name}">
        <span slot="caption">${name}</span>
      `
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
