import '/assets/javascript/components/ladonacion-panel-description.js'
import '/assets/javascript/components/ladonacion-slideshow.js'
import '/assets/javascript/components/ladonacion-details.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      transform: translateY(0.5rem);
    }

    ladonacion-details:not([open])::part(summary):hover {
      text-decoration: underline;
    }

    ladonacion-details::part(marker) {
      font-size: 1.5em;
    }

    ladonacion-details::part(contents) {
      padding-left: 2rem;
    }

    ladonacion-details div[slot="contents"] {
      padding-top: 0.5em;
    }

    ladonacion-details h1 {
      font-size: 1.5em;
      font-weight: 600;
      margin: 0;
    }

    ladonacion-panel-description {
      --padding: 0;
      padding: 1em;
      font-weight: 400;
      text-align: left;
      background: var(--color-warmGray-800);
      color: var(--color-warmGray-100);
    }

    ladonacion-panel-description slot {
      display: block;
    }

    @media (max-width: 1024px) {
      ladonacion-details::part(contents) {
        padding-left: 0;
        padding-right: 0;
      }
    }

    @media (min-width: 1024px) {
      :host(.even) ladonacion-details {
        --rotation: 90deg;
      }

      :host(.even) ladonacion-details::part(summary) {
        flex-direction: row-reverse;
      }

      :host(.even) ladonacion-details::part(marker) {
        left: auto;
        right: 0;
        transform: rotate(180deg);
      }

      :host(.even) ladonacion-details::part(contents) {
        padding-left: 0;
        padding-right: 2rem;
      }
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.25em;
      }
    }
  </style>
  <ladonacion-details>
    <h1 slot="summary">
      <slot name="title"></slot>
    </h1>
    <div slot="contents">
      <ladonacion-panel-description slot="description" dark>
        <slot name="description"></slot>
      </ladonacion-panel-description>
      <slot name="document"></slot>
      <slot name="pictures"></slot>
      <slot name="relations"></slot>
    </div>
  </ladonacion-details>
`

customElements.define(
  'cronologia-item-event',
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
