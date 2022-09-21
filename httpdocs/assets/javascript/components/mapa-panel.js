const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host(.hidden) aside {
      transform: translateX(var(--width));
    }

    aside {
      --width: 30rem;
      position: fixed;
      width: var(--width);
      max-width: 100%;
      height: calc(100% - var(--header-height));
      top: var(--header-height);
      right: 0;
      border-left: 1px solid var(--color-warmGray-600);
      box-shadow: -4px 0px 9px var(--color-warmGray-800);
      overflow: scroll;
      transition: 750ms;
      z-index: var(--z-index-panel);
      background: var(--color-warmGray-200);
      color: var(--color-warmGray-800);
    }

    header {
      position: sticky;
      top: 0;
      padding: 0.25em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: inherit;
      z-index: var(--z-index-header);
    }

    header h1 {
      flex-grow: 1;
      font-size: 1.15em;
      font-weight: 600;
      margin: 0.5em 0;
      text-transform: uppercase;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    header button {
      flex-shrink: 0;
      font-weight: 100;
      width: 3em;
      padding: 0;
      margin-right: 1em;
      border: none;
      background: transparent;
      color: var(--color-warmGray-400);
      cursor: pointer;
    }

    header button:hover {
      color: var(--color-warmGray-600);
    }

    header button svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    address {
      line-height: 1.5;
      padding: 1em var(--padding);
      font-style: normal;
    }

    address footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    ul {
      list-style: none;
      padding: var(--padding);
      margin: 0;
    }
  </style>
  <aside>
    <header>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      <h1>
        <slot name="title"></slot>
      </h1>
    </header>
    <slot name="google_embed"></slot>
    <address>
      <slot name="address"></slot>
      <footer>
        <div>
          <slot name="town"></slot>
          <slot name="country"></slot>
        </div>
        <slot name="google_link"></slot>
      </footer>
    </address>
    <slot name="description"></slot>
    <slot name="relations"></slot>
  </aside>
`

customElements.define(
  'mapa-panel',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    remove() {
      this.classList.add('hidden')
      document.removeEventListener('keydown', this.listener)
      setTimeout(super.remove.bind(this), 750)
    }

    connectedCallback() {
      const button = this.shadowRoot.querySelector('button')
      button.addEventListener('click', (event) => {
        this.dispatchEvent(new Event('close'))
        event.preventDefault()
      })

      this.classList.add('hidden')

      // See https://stackoverflow.com/a/24195559
      const triggerBrowserReflow = this.offsetWidth
      this.classList.remove('hidden')

      // See https://stackoverflow.com/a/22870717
      this.listener = (event) => {
        if (event.metaKey || event.ctrlKey) {
          return
        }

        const { key } = event
        const events = {
          Escape: 'close',
          ArrowLeft: 'previous',
          ArrowRight: 'next',
        }
        events[key] && this.dispatchEvent(new Event(events[key]))
      }

      document.addEventListener('keydown', this.listener)
    }
  }
)
