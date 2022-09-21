import { data } from '/resources/ladonacion.js'
import { references } from '/assets/javascript/modules/references.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    ladonacion-reference {
      font-weight: 600;
      color: var(--color-yellow-800);
    }

    p {
      position: relative;
      opacity: 0.85;
      font-size: 0.75em;
      margin: 0 0 0 1.35em;
      padding: 0.25rem 1.35rem;
      border-left: 1px solid var(--color-warmGray-900);
    }

    p::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: -3.75px;
      border-style: solid;
      border-width: 8px 3.5px 0 3.5px;
      border-color: #222 transparent transparent transparent;
    }
  </style>
  <article></article>
`

customElements.define(
  'ladonacion-relation',
  class extends HTMLElement {
    connectedCallback() {
      const subject = this.getAttribute('subject')
      const object = this.getAttribute('object')
      const type = this.getAttribute('type')

      const reference = references.object(type)
      const templates = reference.templates.direct || reference.templates
      const gender = references.object(subject).gender ?? 'male'

      this.shadowRoot.querySelector('article').innerHTML = `
        <ladonacion-reference ref="${subject}"></ladonacion-reference>
        <p>${templates[gender]}</p>
        <ladonacion-reference ref="${object}"></ladonacion-reference>
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
