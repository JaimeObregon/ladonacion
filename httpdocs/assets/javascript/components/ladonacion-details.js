const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      overflow: hidden;
    }

    details {
      position: relative;
    }

    details summary {
      position: relative;
      display: inline-block;
      list-style-image: none;
      cursor: pointer;
      outline: none;
    }

    details summary:focus-visible {
      box-shadow: inset 0px 0px 2px var(--color-yellow-500);
    }

    details summary::marker,
    details summary::-webkit-details-marker {
      display: none;
      font-size: 0;
    }

    details svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 0.75em;
      height: 1em;
      transform: rotate(0deg);
      pointer-events: none;
    }

    details[ready] svg {
      transition: 250ms;
    }

    details div {
      opacity: 0;
      padding: 1em 0;
      box-sizing: border-box;
    }

    details[ready] div {
      transition: 250ms;
    }

    :host([open]) details svg {
      transform: rotate(var(--rotation, 90deg)) !important;
    }

    :host([open]) details div {
      opacity: 1;
    }
  </style>
  <details open>
    <summary part="summary">
      <slot name="summary"></slot>
    </summary>
    <svg part="marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path
        stroke-cap="round"
        fill="none"
        stroke="currentColor"
        stroke-width=".125em"
        d="M5 14l6-6-6-6"
      />
    </svg>
    <div part="contents">
      <slot name="contents"></slot>
    </div>
  </details>
`

customElements.define(
  'ladonacion-details',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['open', 'hidden']
    }

    attributeChangedCallback(name, previous, value) {
      if (name === 'open') {
        if (previous === value) {
          return
        }

        if (value === null) {
          this.close()
        } else {
          this.open()
        }
      } else if (name === 'hidden') {
        const hidden = value !== null
        this.shadowRoot
          .querySelector('details')
          .toggleAttribute('hidden', hidden)
      }
    }

    open() {
      const backup = this.div.offsetHeight

      this.div.style.height = 'auto'
      const height = this.div.offsetHeight

      this.div.style.height = `${backup}px`

      // See https://stackoverflow.com/a/24195559
      const triggerBrowserReflow = this.div.offsetWidth

      this.div.style.height = backup === height ? 'auto' : `${height}px`

      this.div.addEventListener('transitionend', (transition) => {
        if (transition.propertyName !== 'height') {
          return
        }

        if (this.div.offsetHeight === height) {
          this.div.style.height = 'auto'
        }
      })

      this.shadowRoot.querySelector('details').setAttribute('ready', true)
    }

    close() {
      const height = this.div.offsetHeight
      this.div.style.height = `${height}px`

      // See https://stackoverflow.com/a/24195559
      const triggerBrowserReflow = this.div.offsetWidth

      this.div.style.height = 0
    }

    connectedCallback() {
      if (this.getAttribute('open') === null) {
        this.close()
      }

      this.shadowRoot
        .querySelector('summary')
        .addEventListener('click', (event) => {
          this.toggleAttribute('open')

          if (event.target.getAttribute('slot') === 'summary') {
            event.preventDefault()
          }
        })
    }

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))

      this.div = this.shadowRoot.querySelector('div')
    }
  }
)
