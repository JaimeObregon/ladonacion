const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-weight: 500;
    }

    :host(:not([expanded])) slot {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: var(--lines);
      -webkit-box-orient: vertical;
    }

    button {
      display: none;
      appearance: none;
      padding: 0;
      font-weight: 600;
      border: none;
      background: transparent;
      color: currentColor;
      cursor: pointer;
    }

    button:hover {
      text-decoration: underline;
    }
  </style>
  <div>
    <slot></slot>
    <button>Expandir</button>
  </div>
`

customElements.define(
  'ladonacion-excerpt',
  class extends HTMLElement {
    connectedCallback() {
      const lines = this.getAttribute('lines') || 5
      const slot = this.shadowRoot.querySelector('slot')
      const originalHeight = slot.offsetHeight

      const clone = slot.cloneNode(true)
      clone.innerHTML = this.innerHTML
      clone.style.display = 'block'
      clone.style.opacity = 0

      this.insertAdjacentElement('afterbegin', clone)

      const visible = clone.offsetHeight && originalHeight
      if (visible) {
        slot.style.setProperty('--lines', lines)
      }

      if (clone.offsetHeight !== originalHeight) {
        const div = this.shadowRoot.querySelector('div')
        div.style.cursor = 'pointer'
        div.setAttribute('title', 'Clic para expandir')
        div.querySelector('button').style.display = 'block'

        div.addEventListener('click', () => {
          div.style.cursor = 'unset'
          div.removeAttribute('title')
          div.querySelector('button').style.display = 'none'
          this.setAttribute('expanded', true)
        })
      }

      clone.remove()
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
