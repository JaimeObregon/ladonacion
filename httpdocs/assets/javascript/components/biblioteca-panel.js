import '/assets/javascript/components/ladonacion-reference.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host(.hidden) a {
      opacity: 0;
    }

    :host(.hidden) > figure {
      transform: translateY(calc(100vh - var(--margin-top)));
    }

    a {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.85;
      background: var(--color-warmGray-900);
      color: white;
      cursor: pointer;
      transition: opacity 750ms;
      z-index: var(--z-index-panel);
    }

    figure {
      --margin-top: calc(var(--header-height) + 2em);
      display: flex;
      align-items: flex-start;
      position: fixed;
      top: var(--margin-top);
      left: 1em;
      right: 1em;
      z-index: var(--z-index-panel);
      max-width: 70em;
      height: calc(100% - var(--margin-top));
      margin: auto;
      background: var(--color-warmGray-200);
      border: 1px solid var(--color-warmGray-800);
      border-radius: 0.5em;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transition: transform 750ms;
      overflow: scroll;
    }

    figure slot[name="preview"] {
      display: block;
      height: 100%;
      flex-grow: 1;
      z-index: 1;
    }

    figcaption {
      display: flex;
      width: 40%;
      max-width: 35vw;
      flex-shrink: 0;
      flex-direction: column;
      justify-content: space-between;
      overflow: scroll;
      color: var(--color-warmGray-900);
      height: 100%;
      box-sizing: border-box;
    }

    figcaption header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }

    figcaption header button {
      flex-shrink: 0;
      font-weight: 100;
      width: 3em;
      padding: 0;
      margin: 0 0.5em 0 -0.5em;
      border: none;
      background: transparent;
      color: var(--color-warmGray-400);
      cursor: pointer;
    }

    figcaption header button:hover {
      color: var(--color-warmGray-600);
    }

    figcaption header button svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    figcaption ul {
      flex-grow: 1;
      list-style: none;
      padding: 0 2rem;
      margin: 0;
    }

    figcaption ul ::slotted(li) {
      margin: 2em 0em;
    }

    figcaption footer {
      padding: 2rem;
      text-align: center;
      font-size: 0.85em;
      display: block;
    }

    @media (max-width: 1024px) {
      figcaption {
        width: 50%;
        max-width: unset;
        font-size: 0.95em;
        hyphens: auto;
      }

      figcaption header {
        padding: 0.5rem 1rem;
      }
    }

    @media (max-width: 768px) {
      figure {
        flex-direction: column;
        left: 0;
        right: 0;
      }

      figure slot[name="preview"] {
        width: 100%;
        order: 2;
      }

      figcaption {
        width: 100%;
        font-size: 1em;
        height: auto;
      }
    }

    @media (max-width: 640px) {
      figcaption {
        font-size: 0.9em;
      }
    }
  </style>
  <a href="/biblioteca"></a>
  <figure>
    <slot name="preview"></slot>
    <figcaption>
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
        <slot name="date"></slot>
        <slot name="source"></slot>
      </header>
      <slot name="title"></slot>
      <slot name="description"></slot>
      <slot name="citations"></slot>
      <ul>
        <slot name="relation"></slot>
      </ul>
      <footer>
        <slot name="links"></slot>
      </footer>
    </figcaption>
  </figure>
`

customElements.define(
  'biblioteca-panel',
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

      const backdrop = this.shadowRoot.querySelector('a')

      backdrop.addEventListener('click', (event) => {
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
