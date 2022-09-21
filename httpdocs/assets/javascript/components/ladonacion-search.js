import { data } from '/resources/ladonacion.js'
import { references, models } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/ladonacion-reference.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      --input-height: 3.5rem;
      --vertical-padding: 10rem;
      display: block;
    }

    :host(.hidden) a {
      opacity: 0;
    }

    :host(.hidden) form {
      transform: translateY(
        calc(-1 * (var(--input-height) + var(--vertical-padding)) - 1em)
      );
    }

    :host > a {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.85;
      background: var(--color-warmGray-900);
      color: white;
      cursor: pointer;
      transform: translateY(0);
      transition: opacity 350ms;
      z-index: var(--z-index-search);
    }

    form {
      position: fixed;
      top: var(--vertical-padding);
      left: 1em;
      right: 1em;
      margin: auto;
      max-width: 50em;
      z-index: var(--z-index-search);
      border: 1px solid var(--color-warmGray-900);
      border-radius: 0.75em;
      background: var(--color-warmGray-50);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      transition: transform 350ms;
      z-index: var(--z-index-search);
      overflow: scroll;
    }

    input {
      width: 100%;
      height: var(--input-height);
      font-size: 2em;
      padding: 0 0.5em 0 2em;
      background: transparent;
      border: none;
      outline: none;
    }

    input::placeholder {
      color: var(--color-warmGray-400);
    }

    input[type="search"]::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }

    svg {
      position: absolute;
      top: 0;
      height: var(--input-height);
      padding: 1em;
      box-sizing: border-box;
      color: var(--color-warmGray-500);
    }

    section {
      max-height: calc(100vh - 2 * var(--vertical-padding) - var(--input-height));
      overflow: scroll;
      border-top: 1px solid var(--color-warmGray-200);
    }

    ladonacion-reference {
      display: block;
      font-weight: 400;
      color: var(--color-warmGray-900);
      border-bottom: 1px dotted var(--color-warmGray-200);
    }

    ladonacion-reference::part(link) {
      display: block;
      padding: 0.5em 1em;
    }

    ladonacion-reference::part(link):hover {
      background: var(--color-yellow-100);
      text-decoration: none;
    }

    ladonacion-reference.active::part(link) {
      background: var(--color-yellow-400);
    }

    @media (max-width: 1024px) {
      :host {
        --vertical-padding: 5rem;
        --input-height: 3.25rem;
      }

      input {
        font-size: 1.5em;
      }
    }

    @media (max-width: 768px) {
      :host {
        --vertical-padding: 3rem;
        --input-height: 3rem;
      }

      input {
        font-size: 1.35em;
      }
    }
  </style>
  <a href=""></a>
  <form>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
      />
    </svg>
    <input type="search" placeholder="¿Qué quieres buscar?" />
    <section>
      <slot></slot>
    </section>
  </form>
`

customElements.define(
  'ladonacion-search',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    remove() {
      this.section.innerHTML = ''
      this.classList.add('hidden')
      document.removeEventListener('keydown', this.listener, { capture: true })
      document.body.unlock()

      const form = this.shadowRoot.querySelector('form')
      form.addEventListener('transitionend', super.remove.bind(this))
    }

    get selection() {
      return this.selected ?? 0
    }

    set selection(value) {
      const results = [...this.section.children]
      value =
        value < 0 ? 0 : value < results.length - 1 ? value : results.length - 1
      this.selected = value
      results.forEach((result, index) => {
        result.classList.toggle('active', index === value)
        index === value &&
          result.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
      })
    }

    normalize(string) {
      // See https://es.stackoverflow.com/a/62032
      return string
        .toLowerCase()
        .normalize('NFD')
        .replace(
          /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
          '$1'
        )
        .normalize()
    }

    search(query) {
      if (!query) {
        return []
      }

      const regex = new RegExp(this.normalize(query))
      return this.index
        .filter((item) => item.title.match(regex) || item.id.match(regex))
        .sort((a, b) => {
          const aWeight = models.find((model) => model.name === a.model).weight
          const bWeight = models.find((model) => model.name === b.model).weight

          if (aWeight === bWeight) {
            return a.title.length > b.title.length ? 1 : -1
          }
          return aWeight < bWeight ? 1 : -1
        })
        .map((item) => references.build(item))
    }

    connectedCallback() {
      this.field = this.shadowRoot.querySelector('input')
      this.section = this.shadowRoot.querySelector('section')

      this.listener = (event) => {
        if (event.key !== 'Escape') {
          return
        }
        this.dispatchEvent(new Event('close', { bubbles: true }))
        event.stopPropagation()
      }

      this.classList.add('hidden')

      // See https://stackoverflow.com/a/24195559
      const triggerBrowserReflow = this.offsetWidth
      this.classList.remove('hidden')

      this.shadowRoot.querySelector('a').addEventListener('click', (event) => {
        this.dispatchEvent(new Event('close', { bubbles: true }))
        event.preventDefault()
        event.stopPropagation()
      })

      window.addEventListener('popstate', () => {
        this.dispatchEvent(new Event('close', { bubbles: true }))
      })

      this.field.focus()
      document.body.lock()

      this.index = Object.entries(data)
        .map((i) =>
          i[1].map((j) => ({
            id: j.id,
            model: i[0],
            title: this.normalize(j.title ?? ''),
          }))
        )
        .flat()
        .filter((i) => i.title)

      this.field.addEventListener('keydown', (event) => {
        const actions = {
          ArrowUp: () => --this.selection,
          ArrowDown: () => ++this.selection,
          Enter: () => {
            if ([...this.section.children][this.selection]) {
              ;[...this.section.children][this.selection].shadowRoot
                .querySelector('a')
                .click()
            }
          },
        }

        if (actions[event.key]) {
          actions[event.key]()
          event.preventDefault()
        }
      })

      this.field.addEventListener('keyup', (event) => {
        if (event.target.value === this.query) {
          return
        }

        this.query = event.target.value
        this.section.innerHTML = this.search(event.target.value)
          .map(
            (ref) =>
              `<ladonacion-reference ref="${ref}"></ladonacion-reference>`
          )
          .join('')
        this.selection = 0
      })

      this.section.addEventListener('click', (event) => {
        this.dispatchEvent(new Event('close', { bubbles: true }))
      })

      document.addEventListener('keydown', this.listener, { capture: true })
    }
  }
)
