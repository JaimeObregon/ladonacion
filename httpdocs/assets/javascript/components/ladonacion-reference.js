import { data } from '/resources/ladonacion.js'
import { references } from '/assets/javascript/modules/references.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    a {
      color: inherit;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    figure {
      margin: 0;
      display: inline;
    }

    span {
      display: inline-flex;
      position: relative;
      justify-content: center;
      align-items: center;
      background: var(--color-white);
      color: var(--color-warmGray-800);
    }

    span,
    img {
      width: 2em;
      height: 2em;
      border: 1px solid var(--color-warmGray-100);
      border-radius: 100%;
      vertical-align: middle;
    }

    span::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2em;
      height: 2em;
      border-radius: 100%;
      box-shadow: inset 0 0 1px var(--color-warmGray-500);
    }

    svg {
      width: 1em;
      height: 1em;
    }

    figcaption {
      display: inline;
      margin-left: 0.25rem;
    }
  </style>
  <a part="link">
    <figure>
      <span></span><!--
  --><figcaption></figcaption>
    </figure>
  </a>
`

customElements.define(
  'ladonacion-reference',
  class extends HTMLElement {
    connectedCallback() {
      const ref = this.getAttribute('ref')
      const href = references.link(ref)
      this.shadowRoot.querySelector('a').setAttribute('href', href)

      const object = references.object(ref)
      if (!object) {
        return
      }

      this.shadowRoot.querySelector('figcaption').innerHTML = object.title

      const model = references.model(ref)
      const avatar = model.avatar(object)
      const figure = avatar
        ? `<img src="${avatar}" loading="lazy">`
        : model.icon
      this.shadowRoot.querySelector('span').innerHTML = figure
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
