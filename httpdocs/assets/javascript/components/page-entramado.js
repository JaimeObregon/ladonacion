import { data } from '/resources/ladonacion.js'
import { references } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/ladonacion-panel-description.js'
import '/assets/javascript/components/ladonacion-citations.js'
import '/assets/javascript/components/ladonacion-slideshow.js'
import '/assets/javascript/components/ladonacion-country.js'
import '/assets/javascript/components/entramado-panel.js'
import * as drag from 'https://cdn.skypack.dev/pin/d3-drag@v2.0.0-7DpSVcbaVxJZzdRZshI9/min/d3-drag.js'
import * as zoom from 'https://cdn.skypack.dev/pin/d3-zoom@v2.0.0-56cqf2ysvCggCaxRopNK/min/d3-zoom.js'
import * as force from 'https://cdn.skypack.dev/pin/d3-force@v2.1.1-xD3noJO2Tsh68KsVeQVz/min/d3-force.js'
import * as selection from 'https://cdn.skypack.dev/pin/d3-selection@v2.0.0-N9G5TkzQwbAlSbM9U3jd/min/d3-selection.js'

const d3 = Object.assign({}, drag, zoom, force, selection)

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    :host > div > svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(
        circle 100vw at 50% 50%,
        rgb(21, 31, 55) 0%,
        rgb(0, 0, 0) 75%
      );
      cursor: grab;
    }

    marker {
      fill: var(--color-blue-900);
      stroke: none;
    }

    marker#arrow-active {
      stroke-width: 2;
      fill: var(--color-yellow-300);
    }

    g.links path {
      stroke-width: 0.5;
      stroke: var(--color-blue-900);
      marker-end: url("#arrow");
      fill: none;
      transition: stroke 250ms ease;
    }

    g.links path:hover {
      stroke-width: 2;
      stroke: var(--color-yellow-300);
      marker-end: url("#arrow-active");
    }

    g.nodes g {
      cursor: pointer;
      stroke: var(--color-blue-100);
      transition: 250ms ease;
    }

    g.nodes g text {
      font-size: 6px;
      stroke: none;
      fill: var(--color-white);
      font-weight: 400;
      stroke-linejoin: round;
      stroke-linecap: round;
      transition: 250ms ease;
    }

    g.nodes g text.shadow {
      fill: none;
      stroke: var(--color-warmGray-900);
      stroke-width: 2;
    }

    g.nodes g.selected g,
    g.nodes g:hover g {
      transform: scale(1.25);
      stroke: var(--color-yellow-400);
    }

    g.nodes g.selected text,
    g.nodes g:hover text {
      fill: var(--color-yellow-400);
    }

    entramado-panel {
      --padding: 1.5rem;
    }

    entramado-panel ladonacion-slideshow figure:not(.getty) {
      background: var(--color-white);
    }

    entramado-panel ladonacion-slideshow figure img {
      display: block;
      width: 100%;
    }

    entramado-panel ladonacion-slideshow figure img[src$="svg"] {
      max-width: 22em;
      max-height: 9em;
      margin: 0 auto;
      padding: 3em 0;
    }

    entramado-panel ladonacion-slideshow figure figcaption {
      font-size: 0.9em;
      line-height: 1.25;
      padding: 1em var(--padding);
      font-weight: 500;
      background: var(--color-warmGray-200);
    }

    entramado-panel ladonacion-slideshow figure figcaption a.credits {
      display: inline-block;
      font-size: 0.85em;
      font-weight: 100;
      text-decoration: none;
    }

    entramado-panel
      ladonacion-slideshow:not([slot="signatures"])
      figure
      figcaption
      a.credits {
      color: var(--color-warmGray-500);
      text-transform: uppercase;
    }

    entramado-panel ladonacion-slideshow figure figcaption a.credits:hover {
      text-decoration: underline;
    }

    entramado-panel ladonacion-slideshow figure.getty iframe {
      display: block;
      margin: auto;
      border: none;
      background: var(--color-warmGray-300);
    }

    entramado-panel ladonacion-slideshow[slot="signatures"] figure {
      position: relative;
    }

    entramado-panel ladonacion-slideshow[slot="signatures"] figure figcaption {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0.35rem var(--padding);
      font-weight: 300;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.65);
      color: var(--color-warmGray-800);
    }

    entramado-panel ladonacion-slideshow[slot="signatures"] figure figcaption a {
      color: inherit;
      font-weight: 600;
    }

    entramado-panel
      ladonacion-slideshow[slot="signatures"]
      figure
      figcaption
      a:hover {
      text-decoration: none;
    }

    entramado-panel div[slot="dates"],
    entramado-panel div[slot="wikipedia"],
    entramado-panel div[slot="website"],
    entramado-panel div[slot="linkedin"],
    entramado-panel div[slot="places"],
    entramado-panel div[slot="leaks"],
    entramado-panel div[slot="names"] {
      margin: 1em var(--padding);
    }

    entramado-panel div[slot="wikipedia"],
    entramado-panel div[slot="linkedin"],
    entramado-panel div[slot="website"] {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    entramado-panel [slot="wikipedia"] svg,
    entramado-panel [slot="linkedin"] svg,
    entramado-panel [slot="website"] svg,
    entramado-panel [slot="leaks"] svg {
      height: 1em;
      margin-right: 0.5em;
      vertical-align: middle;
    }

    entramado-panel [slot="wikipedia"] a,
    entramado-panel [slot="linkedin"] a,
    entramado-panel [slot="website"] a,
    entramado-panel [slot="leaks"] a {
      font-size: 0.9em;
      color: inherit;
      text-decoration: none;
    }

    entramado-panel [slot="wikipedia"] a:hover,
    entramado-panel [slot="linkedin"] a:hover,
    entramado-panel [slot="website"] a:hover,
    entramado-panel [slot="leaks"] a:hover {
      text-decoration: underline;
    }

    entramado-panel [slot="places"],
    entramado-panel [slot="leaks"] > div {
      display: flex;
      justify-content: space-between;
    }

    entramado-panel [slot="places"] dl {
      margin: 0;
    }

    entramado-panel [slot="places"],
    entramado-panel [slot="leaks"],
    entramado-panel [slot="names"] {
      line-height: 1.35;
    }

    entramado-panel [slot="places"] dt,
    entramado-panel [slot="leaks"] small,
    entramado-panel [slot="names"] small {
      display: block;
      font-size: 0.75em;
      font-weight: 100;
      color: var(--color-warmGray-600);
    }

    entramado-panel [slot="places"] dd {
      margin: 0;
      font-weight: 500;
    }
  </style>
  <div></div>
`

customElements.define(
  'page-entramado',
  class extends HTMLElement {
    items = [
      ...data.persons.map((item) => ({
        ...item,
        model: 'person',
        self: references.build({
          model: 'persons',
          id: item.id,
        }),
      })),
      ...data.entities.map((item) => ({
        ...item,
        model: 'entity',
        self: references.build({
          model: 'entities',
          id: item.id,
        }),
      })),
    ]

    links = ((items) =>
      items
        .map((item) =>
          item.relations
            .filter((relation) =>
              ['persons', 'entities'].includes(
                references.parse(relation.subject).model
              )
            )
            .filter((relation) =>
              ['persons', 'entities'].includes(
                references.parse(relation.object).model
              )
            )
            .map((relation) => ({
              source: references.parse(relation.subject).id,
              target: references.parse(relation.object).id,
              details: { ...relation },
            }))
        )
        .flat())([...data.articles, ...data.documents])

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    open(item, pushState = true) {
      if (this.panel && this.panel.getAttribute('item') === item.id) {
        return
      }

      this.panel && this.close(false)
      this.panel = document.createElement('entramado-panel')
      this.panel.setAttribute('item', item.id)
      this.shadowRoot.append(this.panel)

      const { width, height, zoomScale } = this.config

      const panelWidth =
        this.panel.shadowRoot.querySelector('aside').offsetWidth

      const center = [
        width / 2 - item.x * zoomScale,
        height / 2 - item.y * zoomScale,
      ]

      this.svg
        .transition()
        .duration(1000)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(...center).scale(zoomScale)
        )

      let dates
      const dateFormat = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      if (item.birthdate && item.deathdate) {
        const birth = new Date(item.birthdate)
        const death = new Date(item.deathdate)
        const years = Math.floor((death - birth) / 1000 / 60 / 60 / 24 / 365)
        dates = `${birth.toLocaleDateString('es-ES', dateFormat)} —
            ${death.toLocaleDateString('es-ES', dateFormat)} (${years} años)`
      } else if (item.birthdate) {
        const birth = new Date(item.birthdate)
        const years = Math.floor(
          (new Date() - birth) / 1000 / 60 / 60 / 24 / 365
        )
        dates = `${birth.toLocaleDateString(
          'es-ES',
          dateFormat
        )} (${years} años)`
      } else if (item.deathdate) {
        dates = `? — ${new Date(item.deathdate).toLocaleDateString(
          'es-ES',
          dateFormat
        )}`
      }

      const places = []
      if (item.nationality) {
        places.push(`
          <dl>
            <dt>Nacionalidad principal</dt>
            <dd>
              <ladonacion-country slot="country" country="${item.nationality}">
              </ladonacion-country>
            </dd>
          </dl>`)
      }
      if (item.residence) {
        places.push(`
          <dl>
            <dt>País de residencia principal</dt>
            <dd>
              <ladonacion-country slot="country" country="${item.residence}">
              </ladonacion-country>
            </dd>
          </dl>`)
      }
      if (item.country) {
        places.push(`
          <dl>
            <dt>País de origen</dt>
            <dd>
              <ladonacion-country slot="country" country="${item.country}">
              </ladonacion-country>
            </dd>
          </dl>`)
      }

      const linkIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"/>
        </svg>`

      const leaks = []
      if (item.panamaPapers) {
        leaks.push(`
          <span>
            ${linkIcon}
            <a href="${item.panamaPapers}" target="_blank">Papeles de Panamá</a>
          </span>`)
      }
      if (item.paradisePapers) {
        leaks.push(`
          <span>
            ${linkIcon}
            <a href="${item.paradisePapers}" target="_blank">Papeles del paraíso</a>
          </span>`)
      }
      if (item.bahamasLeaks) {
        leaks.push(`
          <span>
            ${linkIcon}
            <a href="${item.bahamasLeaks}" target="_blank">Filtraciones de Bahamas</a>
          </span>`)
      }

      this.panel.innerHTML = `
        <span slot="title">${item.title}</span>
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
                        src="${picture.src}"
                        sandbox="allow-popups allow-scripts"
                        referrerpolicy="no-referrer"
                        width="${
                          picture.width < panelWidth
                            ? picture.width
                            : panelWidth
                        }"
                        height="${
                          picture.width < panelWidth
                            ? picture.height
                            : (picture.height * panelWidth) / picture.width
                        }">
                      </iframe>
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
                        src="/resources/${picture.file}"
                        alt="${picture.caption}" />
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
          ${
            item.signatures
              ? `
              <ladonacion-slideshow slot="signatures">
                ${item.signatures
                  .map(
                    (signature) => `
                    <figure>
                      <img
                        src="/resources/${signature.file}"
                        alt="${item.title}">
                      <figcaption>
                        Firma de ${item.alias} en
                        <a href="${references.link(signature.source)}">
                          ${references.object(signature.source).title}
                        </a>
                      </figcaption>
                    </figure>`
                  )
                  .join('')}
              </ladonacion-slideshow>`
              : ''
          }
          <ladonacion-citations slot="relations" subject="${item.self}">
          </ladonacion-citations>
          <ladonacion-panel-description slot="description" dark>
            ${references.replace(item.description)}
          </ladonacion-panel-description>
          ${dates ? `<div slot="dates">${dates}</div>` : ''}
          ${
            item.wikipedia
              ? `
              <div slot="wikipedia" title="Página en Wikipedia">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                  <path d="M989 159H787l-15 3v19c0 2 7 4 9 6l9 2 18 1c21 1 27 5 35 13s10 21 4 40L668 711l-7-2-114-256 2-6 94-192c10-20 21-38 26-46 10-16 15-19 41-20 6 0 8-3 8-8v-19l-2-2H554v21c0 2-1 4 1 6l5 2 7 1c21 1 30 7 33 11 5 6 7 13-5 42l-71 157-65-145c-21-47-27-61 5-64l9-2c6 0 5-2 5-7v-21l-1-1H305l-1 2v20c0 5 4 6 13 7 30 4 29 8 59 73l17 39 68 145 20 48-98 215-6-1S225 355 181 237c-5-13-7-22-7-27 0-12 10-19 29-20l30-1c6 0 17-2 17-8v-19l-9-2H16l-6 2v20c0 4 5 6 13 7 24 2 39 6 46 12 8 7 16 24 26 51 55 147 173 407 230 556 17 40 38 47 63-1 26-53 78-170 116-257 36 86 84 203 108 256 18 42 40 47 61 1 57-137 221-552 221-552 7-20 17-36 30-48 13-11 32-17 59-18 5 0 7-3 7-8v-20l-1-2z"/>
                </svg>
                <a href="${item.wikipedia}" target="_blank">
                  ${decodeURI(item.wikipedia.replace(/^https?:\/\//, ''))}
                </a>
              </div>`
              : ''
          }
          ${
            item.linkedin
              ? `
              <div slot="linkedin" title="Perfil en LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M475 0H37C17 0 0 17 0 37v438c0 20 17 37 37 37h438c20 0 37-17 37-37V37c0-20-17-37-37-37zM182 387h-63V199h63zm-32-213c-21 0-34-15-34-33s14-32 35-32 34 14 35 32c0 18-14 33-36 33zm256 213h-62V287c0-26-9-43-32-43-17 0-27 12-31 23-2 4-3 10-3 15v105h-62V199h62v27c9-13 24-31 57-31 41 0 71 27 71 84zm0 0"/>
                </svg>
                <a href="${item.linkedin}" target="_blank">
                  ${decodeURI(
                    item.linkedin
                      .replace(/^https?:\/\/www\.linkedin\.com/, '')
                      .replace(/\/$/, '')
                  )}
                </a>
              </div>`
              : ''
          }
          ${places.length ? `<div slot="places">${places.join('')}</div>` : ''}
          ${
            leaks.length
              ? `
              <div slot="leaks">
                <small>Filtraciones en que aparece</small>
                <div>${leaks.join('')}</div>
              </div>`
              : ''
          }
          ${
            item.names
              ? `
              <div slot="names">
                <small>Otros nombres</small>
                <cite>${item.names.join('</cite>, <cite>')}</cite>
              </div>`
              : ''
          }
          ${
            item.website
              ? `
              <div slot="website" title="Sitio web">
                ${linkIcon}
                <a href="${item.website}" rel="noreferrer" target="_blank">
                  ${decodeURI(
                    item.website
                      .replace(/^https?:\/\/(www\.)?/, '')
                      .replace(/\/$/, '')
                  )}
                </a>
              </div>`
              : ''
          }
      `

      this.shadowRoot.querySelectorAll('g.nodes > g').forEach((node) => {
        node.classList.toggle('selected', node.getAttribute('id') === item.id)
      })

      this.panel.addEventListener('close', this.close.bind(this))

      this.panel.addEventListener('previous', () => {
        const id = this.panel.getAttribute('item')
        const current = this.items.findIndex((item) => item.id === id)
        current && this.open(this.items[current - 1])
      })

      this.panel.addEventListener('next', () => {
        const id = this.panel.getAttribute('item')
        const current = this.items.findIndex((item) => item.id === id)
        current + 1 < this.items.length && this.open(this.items[current + 1])
      })

      pushState && history.pushState(null, null, `/entramado/${item.id}`)
    }

    close(pushState = true) {
      if (!this.panel) {
        return
      }

      this.panel = this.panel.remove()

      this.shadowRoot
        .querySelectorAll('g.nodes > g')
        .forEach((node) => node.classList.remove('selected'))

      pushState && history.pushState(null, null, '/entramado')
    }

    drag(simulation) {
      const dragStart = (event) => {
        !event.active && simulation.alphaTarget(0.25).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      const dragged = (event) => {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      const dragEnd = (event) => {
        !event.active && simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3
        .drag()
        .on('start', dragStart)
        .on('drag', dragged)
        .on('end', dragEnd)
    }

    connectedCallback() {
      this.container = this.shadowRoot.querySelector('div')
      this.config = {
        width: 600,
        height: 600,
        scaleMin: 0.5,
        scaleMax: 3,
        zoomScale: 2.5,
      }

      const simulation = d3
        .forceSimulation(this.items)
        .force(
          'link',
          d3
            .forceLink(this.links)
            .id((link) => link.id)
            .distance(100)
        )
        .force('charge', d3.forceManyBody())
        .force(
          'center',
          d3.forceCenter(this.config.width / 2, this.config.height / 2)
        )

      this.svg = d3
        .create('svg')
        .attr('viewBox', [0, 0, this.config.width, this.config.height])
        .on('click', (event) => event.target.tagName === 'svg' && this.close())

      this.svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 44)
        .attr('refY', -3)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')

      this.svg
        .select('defs')
        .append('marker')
        .attr('id', 'arrow-active')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 19)
        .attr('refY', -0.75)
        .attr('markerWidth', 5)
        .attr('markerHeight', 5)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')

      this.svg
        .select('defs')
        .append('clipPath')
        .attr('id', 'circle')
        .append('circle')
        .attr('viewBox', '0 0 20 20')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 10)

      this.svg.append('g')

      this.zoom = d3
        .zoom()
        .extent([
          [0, 0],
          [this.config.width, this.config.height],
        ])
        .scaleExtent([this.config.scaleMin, this.config.scaleMax])
        .on('zoom', ({ transform }) =>
          this.svg.select('g').attr('transform', transform)
        )

      this.zoom(this.svg)

      const link = this.svg
        .select('g')
        .append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.links)
        .join('path')
        .attr('class', (link) => link.type)

      const node = this.svg
        .select('g')
        .append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.items)
        .join('g')
        .attr('id', (node) => node.id)
        .on('click', (event, element) => this.open(element))
        .call(this.drag(simulation))

      this.svg
        .select('g.nodes')
        .selectAll('g')
        .append('text')
        .attr('dx', 15)
        .attr('dy', 2)
        .text((node) => node.alias)
        .clone(true)
        .lower()
        .attr('class', 'shadow')

      node
        .append('g')
        .append('image')
        .attr('href', (node) => `/resources/${node.avatar}`)
        .attr('width', 20)
        .attr('height', 20)
        .attr('x', -10)
        .attr('y', -10)
        .attr('clip-path', 'url(#circle)')
        .attr('stroke-width', 5)
        .attr('stroke', '#ff0000')

      node.select('g').append('circle').attr('r', 10).attr('fill', 'none')

      simulation.on('tick', () => {
        node.attr('transform', (node) => `translate(${node.x}, ${node.y})`)
        link.attr('d', (d) => {
          const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
          return `M${d.source.x}, ${d.source.y} A${r} ${r} 0 0 1 ${d.target.x} ${d.target.y}`
        })
      })

      this.container.append(this.svg.node())

      this.addEventListener('activate', () => {
        const [, , id = null] = window.location.pathname.match(
          /^\/entramado(\/(\w+)?)?$/
        )
        const item = this.items.find((item) => item.id === id)
        if (id && !item) {
          return document.dispatchEvent(new Event('notfound'))
        }

        if (id) {
          this.interval = setInterval(() => {
            if (simulation.alpha() < 0.15) {
              this.open(item, false)
              clearInterval(this.interval)
            }
          }, 250)
        } else {
          this.close(false)
        }
      })

      this.addEventListener('deactivate', () => this.close(false))

      document.dispatchEvent(new Event('ready'))
    }
  }
)
