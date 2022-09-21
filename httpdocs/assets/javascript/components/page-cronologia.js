import { data } from '/resources/ladonacion.js'
import { references } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/cronologia-item-article.js'
import '/assets/javascript/components/cronologia-item-event.js'
import '/assets/javascript/components/ladonacion-citations.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    @keyframes pulse {
      0% {
        transform: translateX(calc(var(--axis) + var(--bullet-border) / 2))
          scale(1);
      }

      50% {
        transform: translateX(calc(var(--axis) + var(--bullet-border) / 2))
          scale(1.5);
      }

      100% {
        transform: translateX(calc(var(--axis) + var(--bullet-border) / 2))
          scale(1);
      }
    }

    :host {
      position: relative;
      --side-margin: 50px;
      --bullet-size: 2.5rem;
      --bullet-border: 6px;
      --bullet-color: var(--color-warmGray-400);
      --axis: calc(-1 * var(--bullet-size) / 2);
      display: block;
      max-width: var(--main-width);
      padding: var(--main-padding);
      margin: var(--main-margin) auto 0 auto;
    }

    section {
      padding-left: calc((var(--bullet-size) - var(--bullet-border)) / 2);
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
      margin: 0 1em 0 0;
    }

    header label {
      display: block;
      flex-shrink: 0;
      font-size: 1.05em;
      cursor: pointer;
      color: var(--color-warmGray-300);
    }

    header label input[type="checkbox"] {
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      margin: 0 1em 0 0;
      vertical-align: middle;
      appearance: none;
      background: var(--color-warmGray-500);
      border-radius: 3px;
      cursor: pointer;
    }

    header label:hover {
      filter: brightness(125%);
    }

    header label,
    header label input[type="checkbox"] {
      transition: 250ms;
    }

    header label:hover,
    header label:hover input[type="checkbox"] {
      filter: brightness(125%);
      transition: 150ms;
    }

    header label input[type="checkbox"]:not(:checked)::before {
      background-image: none;
    }

    header label input[type="checkbox"]::before {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.5rem' height='1.5rem' fill='currentColor' viewBox='0 0 16 16'%3E%3Cpath d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/%3E%3C/svg%3E");
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
    }

    header label input:checked {
      background: var(--color-yellow-400);
    }

    article {
      display: block;
      padding-bottom: 5em;
      border-left: var(--bullet-border) solid var(--bullet-color);
      padding-left: var(--side-margin);
      box-sizing: border-box;
    }

    article > * {
      opacity: 0.15;
      transition: opacity 250ms;
    }

    article.past > * {
      opacity: 1;
    }

    article:last-of-type {
      padding-bottom: 25em;
    }

    span.bullet {
      content: "";
      transform: translateX(calc(var(--axis) + var(--bullet-border) / 2));
      position: absolute;
      width: var(--bullet-size);
      height: var(--bullet-size);
      margin-left: calc((2.5rem - var(--bullet-size)) / 2);
      background: var(--color-warmGray-900);
      border: var(--bullet-border) solid var(--bullet-color);
      border-radius: 100%;
      box-sizing: border-box;
      z-index: 1;
    }

    span.bullet.article,
    article.article {
      --bullet-size: 1.5rem;
    }

    span.bullet.active {
      border: var(--bullet-border) solid var(--color-yellow-400);
      animation: 250ms ease forwards 1 pulse;
    }

    article.even::before {
      left: auto;
      right: calc(
        -1 * (var(--bullet-border) + (var(--bullet-size) - var(--bullet-border)) /
              2)
      );
    }

    article.active {
      --bullet-color: var(--color-yellow-400);
    }

    article time {
      position: absolute;
      font-size: 0.85em;
      margin-top: -1.5rem;
      line-height: var(--bullet-size);
      white-space: nowrap;
      color: var(--color-warmGray-600);
    }

    cronologia-item-article > a {
      display: block;
      text-decoration: none;
      color: var(--color-white);
      transition: 250ms;
    }

    a:hover {
      color: var(--color-white);
      transition: 150ms;
    }

    cronologia-item-article,
    cronologia-item-event {
      display: block;
      max-width: 38em;
    }

    cronologia-item-event a[slot="title"] {
      display: block;
      padding: 0 0.5em 0 2rem;
      text-decoration: none;
      color: var(--color-white);
    }

    cronologia-item-event ladonacion-citations {
      text-align: left;
      margin-top: 2em;
    }

    cronologia-item-article a {
      color: var(--color-warmGray-400);
    }

    cronologia-item-event img[slot="thumbnail"],
    cronologia-item-article img[slot="thumbnail"] {
      width: 20em;
      background: white;
      padding: 0 1em;
    }

    cronologia-item-article img[slot="source"] {
      display: inline-block;
      height: 1.25em;
      vertical-align: middle;
      filter: saturate(0%) invert(50%) brightness(75%);
    }

    :host > div {
      position: fixed;
      margin-left: calc((var(--bullet-size) - var(--bullet-border)) / 2);
      z-index: 1;
      top: 15em;
      width: var(--bullet-border);
      height: 50vh;
      background: var(--color-yellow-400);
    }

    ladonacion-slideshow {
      margin-top: 1em;
    }

    ladonacion-slideshow figure img {
      display: inline-block;
      width: 100%;
      object-fit: cover;
    }

    ladonacion-slideshow figure figcaption {
      font-size: 0.9em;
      text-align: left;
      line-height: 1.25;
      padding: 0.5em 0;
      font-weight: 500;
      color: var(--color-warmGray-400);
    }

    ladonacion-slideshow figure figcaption a.credits {
      display: inline-block;
      font-size: 0.85em;
      font-weight: 100;
      text-decoration: none;
      text-transform: uppercase;
      color: var(--color-warmGray-500);
    }

    ladonacion-slideshow figure figcaption a.credits:hover {
      text-decoration: underline;
    }

    ladonacion-slideshow figure.getty iframe {
      display: block;
      border: none;
      background: var(--color-warmGray-800);
    }

    [slot="description"] a {
      font-weight: 600;
      color: var(--color-yellow-500);
    }

    [slot="description"] a:hover {
      background: var(--color-yellow-500);
      color: var(--color-warmGray-900);
    }

    @media (max-width: 1024px) {
      header {
        padding: 0.5em 1em;
      }

      header h1 {
        font-size: 1.5em;
      }
    }

    @media (min-width: 1024px) {
      :host {
        position: inherit;
        --axis: calc(50vw - (100vw - 100%) / 2);
      }

      :host > div {
        left: calc(var(--axis) - var(--bullet-border) / 2);
        margin-left: 0;
      }

      section {
        padding-left: 0;
      }

      span.bullet {
        margin-left: 0;
        left: calc(50% - var(--bullet-size) - var(--bullet-border) / 2);
      }

      article {
        max-width: 50%;
        transform: translateX(calc(var(--bullet-border) / 2));
      }

      article:not(.even) {
        transform: translateX(calc(100% - var(--bullet-border) / 2));
      }

      article.even {
        padding-left: 0;
        padding-right: var(--side-margin);
        border-left: none;
        border-right: var(--bullet-border) solid var(--bullet-color);
        text-align: right;
      }

      article time {
        display: block;
        font-size: 1em;
        margin: 0;
        left: 0;
        top: 0;
        text-align: right;
        transform: translateX(calc(-100% - 1 * var(--side-margin)));
      }

      article.even time {
        left: calc(100% + var(--side-margin));
        text-align: left;
        transform: none;
      }

      article.even cronologia-item-event a[slot="title"] {
        padding: 0 2rem 0 0.5em;
      }
    }

    @media (max-width: 768px) {
      :host {
        --side-margin: 35px;
      }

      header label span {
        font-size: 0;
      }

      header label span::before {
        font-size: 1rem;
        content: "Mostrar las noticias";
      }

      header label input[type="checkbox"] {
        margin-right: 0.5em;
      }
    }

    @media (max-width: 640px) {
      header h1 {
        font-size: 1.25em;
      }

      header label span::before {
        font-size: 1rem;
        content: "Noticias";
      }
    }
  </style>
  <header>
    <h1></h1>
    <label>
      <input type="checkbox" name="model" />
      <span>Mostrar también las noticias</span>
    </label>
  </header>
  <div></div>
  <section></section>
`

customElements.define(
  'page-cronologia',
  class extends HTMLElement {
    items = ((items) =>
      items.sort((a, b) => new Date(a.date) - new Date(b.date)))([
      ...data.events.map((item) => ({ ...item, model: 'event' })),
      ...data.articles.map((item) => ({ ...item, model: 'article' })),
    ])

    formatDate(date) {
      const text = new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

    intersectionHandler() {
      this.shadowRoot.querySelectorAll('span.bullet').forEach((element) => {
        const top = element.getBoundingClientRect().top
        const active = top < window.innerHeight / 2
        element.classList.toggle('active', active)
        element.nextSibling.nextSibling.classList.toggle('past', active)
      })

      const activated = this.shadowRoot.querySelectorAll('span.bullet.active')
      const item = activated[activated.length - 1]

      if (item) {
        this.dateHolder.innerHTML = this.formatDate(item.dataset.date)
      }
    }

    open(id, pushState = true) {
      const item = this.visible.find((item) => item.id === id)
      if (!item) {
        return document.dispatchEvent(new Event('notfound'))
      }

      const article = this.section.querySelector(`span#${id} + article`)
      const iframe = article.querySelector('iframe')
      const image = article.querySelector('img')

      iframe && iframe.setAttribute('src', iframe.dataset.src)
      image && image.setAttribute('src', image.dataset.src)

      article
        .querySelector('cronologia-item-event')
        .shadowRoot.querySelector('ladonacion-details')
        .setAttribute('open', true)

      window.scrollTo({
        behavior: 'smooth',
        top: article.offsetTop - this.section.offsetTop,
      })

      pushState && history.pushState(null, null, `/cronologia/${id}`)
    }

    setSizes() {
      const panelWidth = this.shadowRoot
        .querySelector('cronologia-item-event')
        .shadowRoot.querySelector('div[slot=contents]').offsetWidth

      this.section.querySelectorAll('figure.getty iframe').forEach((iframe) => {
        const aspectRatio = iframe.dataset.height / iframe.dataset.width
        const width =
          iframe.dataset.width < panelWidth ? iframe.dataset.width : panelWidth
        const height =
          iframe.dataset.width < panelWidth
            ? iframe.dataset.height
            : panelWidth * aspectRatio
        iframe.setAttribute('width', width)
        iframe.setAttribute('height', height)
      })

      this.section.querySelectorAll('figure img').forEach((iframe) => {
        const aspectRatio = 400 / 640
        iframe.setAttribute('width', panelWidth)
        iframe.setAttribute('height', panelWidth * aspectRatio)
      })
    }

    render() {
      const articles = this.header.querySelector('input[type=checkbox]').checked
      this.visible = this.items.filter((item) =>
        articles ? item : item.model !== 'article'
      )

      const items = []
      this.visible.forEach((item, i) => {
        const doc = references.object(item.document ?? '')
        const components = {
          article: () => `
            <cronologia-item-article>
              <a href="/biblioteca/${item.id}" slot="title">
                ${item.title}
              </a>
              <img slot="source" src="/resources/${
                references.object(item.source).logo
              }" alt="${references.object(item.source).title}">
            </cronologia-item-article>`,
          event: () => `
            <cronologia-item-event class="${item.model} ${i % 2 ? `even` : ''}">
              <div slot="description">
                ${references.replace(item.description)}
              </div>
              <ladonacion-citations
                slot="relations"
                subject="#/events/${item.id}" dark>
              </ladonacion-citations>
              <a href="/cronologia/${item.id}" slot="title">
                ${item.title}
              </a>
              ${
                doc
                  ? `
                  <ladonacion-slideshow slot="document">
                    <figure>
                      <img data-src="/resources/${doc.thumbnail}">
                      <figcaption>${doc.title ?? ''}.</figcaption>
                    </figure>
                  </ladonacion-slideshow>`
                  : ''
              }
              ${
                item.pictures
                  ? `
                  <ladonacion-slideshow slot="pictures">
                      ${item.pictures
                        .map((picture) =>
                          picture.id
                            ? `
                          <figure class="getty">
                            <iframe
                              data-src="${picture.src}"
                              sandbox="allow-popups allow-scripts"
                              referrerpolicy="no-referrer"
                              data-width="${picture.width}"
                              data-height="${picture.height}"></iframe>
                            <figcaption>
                              ${picture.caption}
                              <a
                                href="http://www.gettyimages.es/detail/${picture.id}"
                                class="credits"
                                rel="noreferrer"
                                target="_blank">Getty Images</a>
                            </figcaption>
                          </figure>`
                            : `
                          <figure>
                            <img
                              data-src="/resources/${picture.file}"
                              alt="${picture.caption}">
                            <figcaption>
                              ${picture.caption ?? ''}
                              <a
                                href="${picture.source.link}"
                                class="credits"
                                rel="noreferrer"
                                target="_blank">${picture.source.name}</a>
                            </figcaption>
                          </figure>`
                        )
                        .join('')}
                  </ladonacion-slideshow>`
                  : ''
              }
           </cronologia-item-event>`,
        }

        items.push(`
          <span
            id="${item.id}"
            class="bullet ${item.model}"
            data-date="${item.date}"></span>
            <article class="${item.model} ${i % 2 ? `even` : ''}">
              <time slot="date" datetime="${item.date}">
                ${new Date(item.date).toLocaleDateString('es-ES', {
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              ${components[item.model]()}
            </article>`)
      })

      this.section.innerHTML = items.join('')
      this.dateHolder.innerHTML = this.formatDate(this.visible[0].date)
      this.firstItem = this.shadowRoot.querySelector('article')

      this.observer = new IntersectionObserver(
        this.intersectionHandler.bind(this),
        {
          rootMargin: `0px 0px -50% 0px`,
          threshold: 0,
        }
      )

      this.shadowRoot.querySelectorAll('span.bullet').forEach((item) => {
        this.observer.observe(item)
      })
    }

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.section = this.shadowRoot.querySelector('section')
      this.header = this.shadowRoot.querySelector('header')
      this.dateHolder = this.shadowRoot.querySelector('h1')
      this.div = this.shadowRoot.querySelector('div')

      // See https://stackoverflow.com/a/22870717
      this.setDivPosition = () => {
        const box = this.firstItem.getBoundingClientRect()
        this.div.style.top = box.top < 0 ? 0 : `${box.top}px`
        this.div.style.height =
          box.top < 0 ? 'calc(50vh)' : `calc(50vh - ${box.top}px)`
      }

      this.render()

      this.setSizes()
      this.setDivPosition()

      this.header.addEventListener('change', () => {
        this.render()
        this.setSizes()
      })

      window.addEventListener('resize', this.setSizes.bind(this))

      this.addEventListener('activate', () => {
        document.addEventListener('scroll', this.setDivPosition)
        const [, , id = null] = window.location.pathname.match(
          /^\/cronologia(\/(\w+)?)?$/
        )
        if (id) {
          this.open(id, false)
        } else {
          this.section
            .querySelectorAll('cronologia-item-event')
            .forEach((item) => {
              item.shadowRoot
                .querySelector('ladonacion-details')
                .removeAttribute('open')
            })
        }
        this.setDivPosition()
      })

      this.addEventListener('deactivate', () => {
        document.removeEventListener('scroll', this.setDivPosition)
      })

      document.dispatchEvent(new Event('ready'))
    }
  }
)
