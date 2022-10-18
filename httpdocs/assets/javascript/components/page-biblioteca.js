import { data } from '/resources/ladonacion.js'
import { languages } from '/assets/javascript/modules/languages.js'
import { references } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/ladonacion-panel-description.js'
import '/assets/javascript/components/ladonacion-citations.js'
import '/assets/javascript/components/ladonacion-reference.js'
import '/assets/javascript/components/biblioteca-grid-item.js'
import '/assets/javascript/components/biblioteca-list-item.js'
import '/assets/javascript/components/ladonacion-relation.js'
import '/assets/javascript/components/ladonacion-excerpt.js'
import '/assets/javascript/components/ladonacion-country.js'
import '/assets/javascript/components/biblioteca-panel.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      max-width: var(--main-width);
      padding: var(--main-padding);
      margin: var(--main-margin) auto;
    }

    header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: sticky;
      top: var(--header-height);
      z-index: var(--z-index-sticky);
      background: #1c1917d0; /* var(--color-warmGray-900) */
      backdrop-filter: blur(1em);
      margin: 0 -1em 1em -1em;
      padding: 1em;
    }

    header h1 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      flex-grow: 1;
      margin: 0;
    }

    header label,
    header select {
      cursor: pointer;
    }

    header select {
      max-width: 15em;
      font-size: 1em;
      appearance: none;
      margin-right: 2em;
      padding: 0.5em 3em 0.5em 0.75em;
      border: none;
      border-radius: 0.25em;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-color: var(--color-warmGray-800);
      background-repeat: no-repeat;
      background-position: right 1em top 50%;
      background-size: 0.65em;
      color: inherit;
      outline: none;
    }

    header select:focus-visible {
      box-shadow: inset 0px 0px 2px var(--color-yellow-500);
    }

    header select,
    header input[type="checkbox"] ~ span span {
      transition: 250ms;
    }

    header select:hover,
    header input[type="checkbox"] ~ span span:hover {
      filter: brightness(125%);
      transition: 150ms;
    }

    header label {
      flex-shrink: 0;
    }

    header input[type="checkbox"] {
      display: none;
    }

    header input[type="checkbox"] ~ span {
      display: flex;
      align-items: center;
      font-size: 1.05em;
    }

    header input[type="checkbox"] ~ span span {
      padding: 0.55rem 1.25rem;
      border-radius: 0.25rem;
    }

    header input[type="checkbox"] ~ span span:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    header input[type="checkbox"] ~ span span:last-of-type {
      border-radius: 0.25rem;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    header input[type="checkbox"] ~ span svg {
      height: 1.15rem;
      vertical-align: middle;
    }

    header input[type="checkbox"]:not(checked) ~ span .list,
    header input[type="checkbox"]:checked ~ span .grid {
      font-weight: 500;
      background: var(--color-warmGray-700);
      color: var(--color-white);
    }

    header input[type="checkbox"]:not(checked) ~ span .grid,
    header input[type="checkbox"]:checked ~ span .list {
      background: var(--color-warmGray-800);
      color: var(--color-warmGray-500);
    }

    section.grid {
      --gap: 2em;
      --column-width: calc(25% - 0.75 * var(--gap));
      display: flex;
      flex-wrap: wrap;
    }

    section.grid a {
      --radius: 0.25em;
      display: block;
      width: var(--column-width);
      margin: 0 var(--gap) var(--gap) 0;
      overflow: hidden;
      border-radius: var(--radius);
      background: var(--color-warmGray-800);
      transition: 0.75s;
    }

    section.grid a:nth-child(4n + 4) {
      margin-right: 0;
    }

    section.grid a:hover {
      transition: 0.25s;
      transform: scale(1.05);
    }

    section.grid img[slot="source"] {
      height: 1em;
    }

    section.grid img[slot="thumbnail"] {
      display: block;
      width: 100%;
      height: auto;
      max-width: 640px;
      background: var(--color-warmGray-600);
      padding: 0 1em;
      box-sizing: border-box;
      background: var(--color-white);
    }

    list-item a,
    section.grid a {
      color: inherit;
      text-decoration: none;
    }

    list-item {
      --radius: 0.25em;
      display: block;
      margin-bottom: 2em;
      background: var(--color-warmGray-800);
      border-top-right-radius: var(--radius);
      border-bottom-right-radius: var(--radius);
    }

    list-item a:hover {
      text-decoration: underline;
    }

    list-item a[slot="thumbnail"] {
      display: flex;
      width: 20em;
      flex-shrink: 0;
      align-items: center;
      object-fit: contain;
      padding: 0 1em;
      background: white;
      border-top-left-radius: var(--radius);
      border-bottom-left-radius: var(--radius);
      box-sizing: border-box;
    }

    list-item a[slot="thumbnail"] img {
      display: block;
      width: 100%;
      height: auto;
    }

    list-item time {
      font-size: 0.9em;
      font-weight: 100;
      color: var(--color-warmGray-400);
    }

    list-item li {
      display: inline-block;
      font-size: 0.85em;
      font-weight: 600;
      line-height: 2.5;
    }

    list-item li ladonacion-reference::part(link) {
      width: 100%;
      margin: 0 0.5em 0 0;
      padding: 0.35em 1em 0.35em 0;
      background: var(--color-warmGray-600);
      border-radius: 100em;
      transition: 0.25s;
    }

    list-item li ladonacion-reference::part(link):hover {
      text-decoration: none;
      background: var(--color-warmGray-400);
      color: var(--color-warmGray-800);
    }

    list-item div[slot="meta"] {
      white-space: nowrap;
      margin-right: 1em;
    }

    list-item img[slot="source"] {
      margin-left: 1em;
      height: 1em;
      filter: saturate(0%) invert(100%);
    }

    biblioteca-panel {
      --padding: 2rem;
    }

    biblioteca-panel a[slot="preview"] {
      display: block;
      position: sticky;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: scroll;
      flex-shrink: 0;
      border-right: 1px solid var(--color-warmGray-300);
      box-shadow: 1px 0 5px var(--color-warmGray-400);
      background: white;
    }

    biblioteca-panel a[slot="preview"] img,
    biblioteca-panel a[slot="preview"] embed {
      display: block;
      width: 100%;
    }

    biblioteca-panel a[slot="preview"] embed {
      height: 100%;
    }

    biblioteca-panel h1 {
      line-height: 1;
      margin: 0 !important;
      padding: 1em;
      background: var(--color-warmGray-700);
      color: var(--color-warmGray-50);
    }

    biblioteca-panel img[slot="source"] {
      display: block;
      margin: auto;
      max-width: 100%;
      height: 1.5em;
    }

    biblioteca-panel time {
      font-size: 0.9em;
      letter-spacing: -0.025em;
      flex-grow: 1;
      color: var(--color-warmGray-600);
    }

    biblioteca-panel [slot="links"] a {
      margin: 0 0.5em;
      text-decoration: none;
      color: inherit;
    }

    biblioteca-panel [slot="links"] a:hover {
      text-decoration: underline;
    }

    biblioteca-panel ladonacion-reference {
      display: inline-block;
      margin: 0.125em 0;
      font-size: 1.15em;
      font-weight: 500;
    }

    @media (max-width: 1280px) {
      section.grid {
        --gap: 1em;
      }
    }

    @media (max-width: 1024px) {
      header {
        padding: 0.5em 1em;
      }

      header h1 {
        font-size: 1.5em;
      }

      header select {
        margin-right: 1em;
      }

      header input[type="checkbox"] ~ span {
        font-size: 0;
      }

      section.grid {
        --column-width: calc((100% / 3) - (2 * var(--gap) / 3));
      }

      section.grid a:nth-child(4n + 4) {
        margin-right: var(--gap);
      }

      section.grid a:nth-child(3n + 3) {
        margin-right: 0;
      }
    }

    @media (max-width: 768px) {
      section.grid {
        --column-width: calc(50% - 0.5 * var(--gap));
      }

      section.grid a:nth-child(4n + 4),
      section.grid a:nth-child(3n + 3) {
        margin-right: var(--gap);
      }

      section.grid a:nth-child(2n + 2) {
        margin-right: 0;
      }

      biblioteca-panel time {
        font-size: 1em;
        letter-spacing: 0;
      }

      list-item a[slot="thumbnail"] {
        width: 15em;
      }

      list-item a[slot="title"] {
        font-size: 0.9em;
      }

      biblioteca-panel a[slot="preview"] {
        position: unset;
        overflow: unset;
      }

      biblioteca-panel a[slot="preview"] embed {
        min-height: 35em;
      }
    }

    @media (max-width: 640px) {
      header h1 {
        display: none;
      }

      header select {
        max-width: none;
        width: 100%;
      }

      section.grid {
        --column-width: 100%;
      }

      section.grid a:nth-child(4n + 4),
      section.grid a:nth-child(3n + 3),
      section.grid a:nth-child(2n + 2) {
        margin-right: var(--gap);
      }

      section.grid a:nth-child(1n + 1) {
        margin-right: 0;
      }

      list-item a[slot="thumbnail"] {
        width: 100%;
      }
    }
  </style>
  <header>
    <h1>
      Hay <span class="item-count">muchos</span> documentos de
      <span class="source-count">varias</span> fuentes
    </h1>
    <select>
      <option value="">Todas las fuentes</option>
    </select>
    <label>
      <input type="checkbox" checked />
      <span>
        <span class="grid">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-grid-3x3-gap"
            viewBox="0 0 16 16"
          >
            <path
              d="M4 2v2H2V2h2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zm0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1zM9 2v2H7V2h2zm5 0v2h-2V2h2zM4 7v2H2V7h2zm5 0v2H7V7h2zm5 0h-2v2h2V7zM4 12v2H2v-2h2zm5 0v2H7v-2h2zm5 0v2h-2v-2h2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-2z"
            />
          </svg>
          Rejilla
        </span>
        <span class="list">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-list-ol"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
            />
            <path
              d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"
            />
          </svg>
          Detalles
        </span>
      </span>
    </label>
  </header>
  <section></section>
`

customElements.define(
  'page-biblioteca',
  class extends HTMLElement {
    grid = true

    items = ((items) => {
      return items
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) =>
          ({
            articles: (item) => ({
              ...item,
              source: references.object(item.source),
              thumbnail: `/resources/${item.thumbnail}`,
            }),
            documents: (item) => ({
              ...item,
              source: references.object(
                item.origin.source ?? references.object(item.origin).source
              ),
              thumbnail: `/resources/${item.thumbnail}`,
              url: item.origin.url ?? references.object(item.origin).url,
            }),
          }[item.model](item))
        )
    })([
      ...data.articles.map((item) => ({ ...item, model: 'articles' })),
      ...data.documents.map((item) => ({ ...item, model: 'documents' })),
    ])

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    open(id, pushState = true) {
      this.panel && this.close(false)
      this.panel = document.createElement('biblioteca-panel')
      this.panel.setAttribute('item', id)
      this.shadowRoot.append(this.panel)

      const dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC', //en ubicaciones al oeste del UTC sin esta opción la fecha aparece un día antes de la registrada
      }

      const item = this.visible.find((item) => item.id === id)
      if (!item) {
        return document.dispatchEvent(new Event('notfound'))
      }

      const reference = references.build({
        model: item.model,
        id: item.id,
      })

      const relations = item.relations
        .filter((relation) => relation.subject !== reference)
        .filter((relation) => relation.object !== reference)
        .map(
          (relation) => `
            <li slot="relation">
              <ladonacion-relation
                subject="${relation.subject}"
                object="${relation.object}"
                type="${relation.type}">
              </ladonacion-relation>
            </li>`
        )

      const links = [
        ` <a href="${item.url}" rel="noreferrer" target="_blank">
            Abrir en ${item.source.name}
          </a>`,
      ]

      if (item.lang !== 'es' && item.model !== 'documents') {
        links.push(`
          <a href="https://translate.google.com/translate?hl=&sl=auto&tl=es&u=${
            item.url
          }" target="_blank">Traducir del ${languages[item.lang]}</a>`)
      }

      const preview = {
        articles: `<img src="/resources/${item.screenshot}" alt="${item.title}">`,
        documents: `<embed src="/resources/${item.file}" type="application/pdf">`,
      }[item.model]

      const description = item.description
        ? ` <ladonacion-panel-description slot="description">
              ${references.replace(item.description)}
            </ladonacion-panel-description>`
        : ''

      this.panel.innerHTML = `
        <h1 slot="title">${item.title}</h1>
        ${description}
        <ladonacion-citations slot="citations" subject="${reference}">
        </ladonacion-citations>
        <a
          slot="preview"
          href="${item.url}"
          title="Abrir el original en ${item.source.name}"
          rel="noreferrer"
          target="_blank">${preview}</a>
        <img
          slot="source"
          src="/resources/${item.source.logo}"
          alt="${item.source.name}" />
        <time slot="date" datetime="${item.date}">
          ${new Date(item.date).toLocaleDateString('es-ES', dateFormat)}
        </time>
        <span slot="links">${links.join(' | ')}</span>
        ${relations.join('')}`

      this.panel.addEventListener('close', this.close.bind(this))

      this.panel.addEventListener('previous', () => {
        const id = this.panel.getAttribute('item')
        const current = this.visible.findIndex((item) => item.id === id)
        current && this.open(this.visible[current - 1].id)
      })

      this.panel.addEventListener('next', () => {
        const id = this.panel.getAttribute('item')
        const current = this.visible.findIndex((item) => item.id === id)
        current + 1 < this.visible.length &&
          this.open(this.visible[current + 1].id)
      })

      pushState && history.pushState(null, null, `/biblioteca/${id}`)
    }

    close(pushState = true) {
      if (!this.panel) {
        return
      }

      this.panel = this.panel.remove()
      pushState && history.pushState(null, null, '/biblioteca')
    }

    render() {
      const filter = this.header.querySelector('select').value
      this.visible = this.items.filter((item) =>
        filter ? item.source.id === filter : item
      )

      const grid = this.header.querySelector('input[type=checkbox]').checked
      this.container.classList.remove(...this.container.classList)
      this.container.classList.add(grid ? 'grid' : 'list')

      const dateFormat = {
        year: 'numeric',
        month: grid ? '2-digit' : 'long',
        day: grid ? '2-digit' : 'numeric',
        timeZone: 'UTC', //en ubicaciones al oeste del UTC sin esta opción la fecha aparece un día antes de la registrada
      }
      const items = []

      this.visible.forEach((item) => {
        const source = `/resources/${item.source.logo}`

        const references = item.relations
          .map((relation) => [relation.subject, relation.object])
          .flat()
        const mentions = [...new Set(references)].map(
          (mention) => `
            <li slot="mentions">
              <ladonacion-reference ref="${mention}"></ladonacion-reference>
            </li>`
        )

        const contents = {
          'list-item': `
            <list-item>
              <a slot="title" href="/biblioteca/${item.id}" id="${item.id}">
                ${item.title}
              </a>
              <time slot="time" datetime="${item.date}">
                  ${new Date(item.date).toLocaleDateString('es-ES', dateFormat)}
              </time>
              <a slot="thumbnail" href="/biblioteca/${item.id}" id="${item.id}">
                <img
                  src="${item.thumbnail}"
                  width="640"
                  height="400"
                  loading="lazy"/>
              </a>
              <div slot="meta">
                <ladonacion-country
                  country="${item.source.country}"
                  title="País de la fuente"></ladonacion-country>
                ${
                  item.lang === 'es'
                    ? ''
                    : `
                    <a
                      href="https://translate.google.com/translate?hl=&sl=auto&tl=es&u=${
                        item.url
                      }"
                      target="_blank">Traducir del ${languages[item.lang]}</a>`
                }
              </div>
              <a slot="url" href="${item.url}" rel="noreferrer" target="_blank">
                ${decodeURI(item.url)}
              </a>
              <img
                slot="source"
                src="${source}"
                alt="${item.source.name}"
                title="${item.source.name}"
                loading="lazy" />
              ${mentions.join('')}
            </list-item>`,
          'grid-item': `
            <a href="/biblioteca/${item.id}" id="${item.id}">
              <grid-item>
                <span slot="title">${item.title}</span>
                <time slot="time" datetime="${item.date}">
                  ${new Date(item.date).toLocaleDateString('es-ES', dateFormat)}
                </time>
                <img
                  slot="thumbnail"
                  src="${item.thumbnail}"
                  width="640"
                  height="400"
                  loading="lazy" />
                <img
                  slot="source"
                  src="${source}"
                  alt="${item.source.name}"
                  title="${item.source.name}"
                  loading="lazy"/>
              </grid-item>
            </a>`,
        }

        items.push(contents[grid ? 'grid-item' : 'list-item'])
      })

      this.container.innerHTML = items.join('')
    }

    connectedCallback() {
      this.container = this.shadowRoot.querySelector('section')
      this.header = this.shadowRoot.querySelector('header')

      const sources = [...new Set(this.items.map((item) => item.source))]
      sources
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { ignorePunctuation: true })
        )
        .forEach((source) => {
          this.header.querySelector(
            'select'
          ).innerHTML += `<option value="${source.id}">${source.name}</option>`
        })

      this.header.querySelector('span.item-count').innerHTML = this.items.length
      this.header.querySelector('span.source-count').innerHTML = sources.length

      this.header.addEventListener('change', this.render.bind(this))

      this.addEventListener('activate', () => {
        const [, , id = null] = window.location.pathname.match(
          /^\/biblioteca(\/(\w+)?)?$/
        )
        id ? this.open(id, false) : this.close(false)
      })

      this.addEventListener('deactivate', () => this.close(false))

      this.render()

      document.dispatchEvent(new Event('ready'))
    }
  }
)
