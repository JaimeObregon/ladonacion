import { data } from '/resources/ladonacion.js'
import { patrons } from '/assets/javascript/modules/patrons.js'
import { references } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/ladonacion-details.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    @keyframes swing {
      0% {
        transform: rotateZ(-0.75deg);
      }

      100% {
        transform: rotateZ(0.75deg);
      }
    }

    :host {
      display: block;
      font-size: 1.35em;
      max-width: var(--main-width);
      padding: var(--main-padding);
      margin: var(--main-margin) auto;
    }

    .nowrap {
      white-space: nowrap;
    }

    em {
      font-style: normal;
      font-weight: 700;
      color: var(--color-white);
    }

    a:not([rel="nofollow"]),
    strong {
      padding: 0.1em 0.5em;
      font-weight: 600;
    }

    a:not([rel="nofollow"]) {
      text-decoration: none;
      background: var(--color-yellow-400);
      color: var(--color-warmGray-900);
    }

    a[rel="nofollow"] {
      font-weight: 600;
      color: var(--color-white);
    }

    a[href^="mailto"] {
      font-weight: inherit;
      text-decoration: none;
    }

    strong {
      background: var(--color-warmGray-100);
      color: var(--color-warmGray-900);
    }

    h1 {
      display: none;
    }

    h2 a {
      display: inline-block;
      text-indent: 100em;
      margin-left: -100em;
      padding: 0.25em 1em 0.25em 0 !important;
      background: var(--color-warmGray-100) !important;
      color: var(--color-warmGray-900);
    }

    p {
      font-weight: 400;
      line-height: 1.35;
      max-width: 35em;
    }

    p code {
      font-size: 1.25em;
    }

    ladonacion-details aside {
      font-size: 0.9em;
    }

    ladonacion-details span[slot="summary"] {
      display: block;
      padding: 0.25em 0.5em 0.25em 1.5em;
    }

    ladonacion-details::part(marker) {
      padding: 0.25em 0;
    }

    ladonacion-details::part(contents) {
      padding-left: 1.5em;
    }

    ladonacion-details::part(summary),
    ladonacion-details::part(marker) {
      font-weight: 800;
      color: var(--color-yellow-400);
    }

    ladonacion-details::part(summary):hover {
      background: var(--color-yellow-400);
      color: var(--color-warmGray-900);
    }

    ladonacion-details::part(marker) {
      mix-blend-mode: difference;
    }

    section {
      --figure-margin: 2.5em;
      margin: 4em 0 0 0;
    }

    :host > aside {
      text-align: center;
      margin: 4em 0 0 calc(50% - 50vw);
      padding: 2em 1em;
      width: 100vw;
      box-sizing: border-box;
      background: var(--color-warmGray-700);
      transform: skewY(-2deg);
    }

    hr {
      margin-bottom: 12em;
      border: none;
    }

    section#hipotesis figure {
      position: relative;
      float: right;
      width: 20em;
      margin: -0.5em 0 0 var(--figure-margin);
      border: 10px solid var(--color-black);
      transform-origin: top;
      animation: swing 3s ease-in-out alternate infinite;
      z-index: 1;
      box-sizing: border-box;
      box-shadow: -1px 1px 4px 1px rgba(0, 0, 0, 0.1),
        -2px 2px 4px 1px rgba(0, 0, 0, 0.09), -3px 3px 4px 1px rgba(0, 0, 0, 0.08),
        -4px 4px 4px 1px rgba(0, 0, 0, 0.07), -5px 5px 4px 1px rgba(0, 0, 0, 0.06),
        -6px 6px 4px 1px rgba(0, 0, 0, 0.05), -7px 7px 4px 1px rgba(0, 0, 0, 0.04),
        -8px 8px 4px 1px rgba(0, 0, 0, 0.03), -9px 9px 4px 1px rgba(0, 0, 0, 0.03),
        -10px 10px 4px 1px rgba(0, 0, 0, 0.03),
        -11px 11px 4px 1px rgba(0, 0, 0, 0.03),
        -12px 12px 4px 1px rgba(0, 0, 0, 0.02),
        -13px 13px 4px 1px rgba(0, 0, 0, 0.02),
        -14px 14px 4px 1px rgba(0, 0, 0, 0.01),
        -15px 15px 4px 1px rgba(0, 0, 0, 0.01),
        -16px 16px 4px 1px rgba(0, 0, 0, 0.01);
    }

    section#hipotesis figure img {
      display: block;
      padding: 1.5em;
      width: 100%;
      box-sizing: border-box;
      background: var(--color-warmGray-200);
    }

    aside#fuentes img {
      height: 2rem;
      padding: 1.25rem 2rem;
      filter: saturate(0%) invert(90%);
    }

    section#colaborar figure {
      float: right;
      width: 25em;
      margin: 0 0 0 var(--figure-margin);
      box-sizing: border-box;
    }

    section#colaborar figure div {
      border-image: url("/assets/images/frame.png") 75 74 97 96 stretch stretch;
      border-style: inset;
      border-width: 3em;
      transform-origin: top;
      animation: swing 3s ease-in-out alternate infinite;
    }

    section#colaborar figure img {
      display: block;
      margin: 0 1px -6px 0;
      width: 100%;
      box-sizing: border-box;
      background-color: var(--color-warmGray-100);
    }

    section#colaborar figure figcaption {
      line-height: 1.25;
      text-align: center;
      font-size: 0.75em;
      color: var(--color-warmGray-400);
    }

    svg.arrow {
      position: absolute;
      height: 2em;
      margin: 0.5em 0 0 0.5em;
      fill: white;
    }

    svg.twitter {
      height: 1.35em;
      vertical-align: middle;
    }

    aside#patronos {
      font-family: "Permanent Marker", cursive;
    }

    aside#patronos a {
      color: var(--color-yellow-400);
      background: inherit;
      text-decoration: underline;
      transition: 150ms;
    }

    aside#patronos a:hover {
      background: var(--color-yellow-400);
      color: var(--color-warmGray-900);
      text-decoration: none;
    }

    aside#patronos > * {
      display: inline-block;
      font-weight: 600;
      padding: 0.35em 1em;
    }

    table {
      font-size: 1rem;
      border-collapse: collapse;
    }

    table h2 {
      margin: 2em 0 0 0;
    }

    table th:not([colspan]) {
      text-align: left;
    }

    table th:not([colspan]):first-of-type {
      text-transform: uppercase;
      white-space: nowrap;
    }

    table th,
    table td {
      padding: 0.5em 1em;
    }

    table th small {
      font-size: 0.65em;
      font-weight: 100;
      color: var(--color-warmGray-400);
      margin-left: 0.5em;
    }

    table tr.relation:nth-child(odd) {
      background: var(--color-warmGray-800);
    }

    table svg {
      width: 1em;
      margin-right: 0.5em;
      vertical-align: middle;
      fill: currentColor;
      cursor: help;
    }

    @media (max-width: 1280px) {
      aside#patronos > * {
        padding: 0.25em 0.75em;
      }

      aside#fuentes img {
        height: 1.5rem;
        padding: 0.75rem 1.5rem;
      }
    }

    @media (max-width: 1024px) {
      section {
        max-width: 35em;
        margin: 4em auto;
      }

      section#hipotesis figure,
      section#colaborar figure {
        float: none;
        margin: 0 auto 2em auto;
      }

      section#hipotesis figure {
        max-width: 80%;
      }

      section#colaborar figure {
        max-width: 95%;
      }

      :host > aside {
        padding: 1em 0;
      }

      aside#fuentes img {
        padding: 0.5rem 1.25rem;
      }
    }

    @media (max-width: 768px) {
      :host {
        font-size: 1.15em;
      }

      hr {
        margin-bottom: 8em;
      }

      aside#patronos {
        font-size: 0.85em;
        padding: 1em 0.5em;
      }

      aside#fuentes img {
        height: 1rem;
        padding: 0.5rem 1rem;
      }

      table,
      th,
      td,
      tr {
        display: block;
      }

      th[colspan],
      tr:not(.relation) th {
        display: none;
      }

      tr.relation {
        padding: 1em 0.5em;
      }

      tr.relation td {
        padding: 0.25em 1em;
      }

      tr.relation td:nth-child(3):before {
        content: "Sujetos permitidos: ";
      }

      tr.relation td:nth-child(4):before {
        content: "Objetos permitidos: ";
      }
    }

    @media (max-width: 640px) {
      aside#patronos {
        font-size: 0.75em;
      }

      aside#fuentes img {
        height: 0.85rem;
        padding: 0.35rem 0.75rem;
      }
    }
  </style>
  <h1>El autor</h1>

  <section id="hipotesis">
    <h2>Mi hipótesis</h2>

    <figure>
      <div>
        <img
          src="/assets/images/jaime.jpg"
          alt="Jaime Gómez-Obregón"
          loading="lazy"
        />
      </div>
    </figure>

    <p>
      España tiene <em>un problema endémico de corrupción</em> en la política y en
      las instituciones. Pero, ¿qué podemos hacer desde la ciudadanía, desde la
      sociedad civil?
    </p>

    <p>
      <strong>Me llamo Jaime Gómez-Obregón</strong> y soy un ingeniero
      especializado en datos. Todos observamos cómo la tecnología está
      transformando el mundo, y mi hipótesis es que la tecnología puede
      transformar también la forma de exponer y combatir la corrupción.
    </p>

    <p>
      Las filtraciones masivas de datos, como la lista Falciani o los papeles de
      Panamá, han expuesto por primera vez la vulnerabilidad de la maquinaria
      global de lavado de dinero, evasión de impuestos y crimen organizado. Y la
      ciencia de datos hace aflorar evidencias tangibles de un vasto océano de
      información que de otra manera sería insondable al esfuerzo humano.
    </p>

    <p>
      Interesado en este reto intelectual, he aplicado
      <a href="/metodologia">una metodología</a> a la exploración de los
      escándalos recientes en torno a la Casa Real española.
    </p>
  </section>

  <section id="reto">
    <h2>El reto</h2>

    <p>
      Los jueces y fiscales instruyen los casos de corrupción con herramientas
      seguramente no más sofisticadas que las de la ofimática básica. Y los medios
      de comunicación se hacen eco de las tramas, incluso de las más elaboradas,
      mediante artículos y noticias.
    </p>

    <p>
      Pero un procesador de textos o una hoja de cálculo son herramientas
      inadecuadas, y una noticia es un vehículo informativo muy limitado. Los
      datos son ingentes y están conectados mediante relaciones intrincadas para
      las que estos instrumentos no resultan eficaces.
    </p>

    <p>
      👉 ¿<em>Cómo modelar una realidad humana compleja</em>, donde se enmadejan
      personas, sociedades, documentos, hechos y lugares a través de conexiones
      poliédricas y que mutan en el tiempo?
    </p>

    <p>
      <strong
        ><cite>La donación</cite> es mi propuesta para abordar esta
        tesitura.</strong
      >
      Una herramienta visual e interactiva que faculta a cualquier persona para
      explorar un fenómeno complejo desde las dimensiones cronológica, geográfica,
      documental y de los actores intervinientes.
    </p>

    <ladonacion-details>
      <span slot="summary"
        >¿En qué consiste, a grandes rasgos, este experimento?</span
      >
      <aside slot="contents">
        <p>
          He reunido un <i>corpus</i> de documentación sobre corrupción en la Casa
          Real, procedente de un conjunto extenso de medios nacionales y
          extranjeros, así como de instituciones, registros públicos y boletines
          oficiales. La amplia transversalidad de las fuentes asegura una
          aproximación multilateral al asunto.
        </p>

        <p>
          Para despojar a la información del sesgo interpretativo de los medios,
          he priorizado los documentos de la investigación judicial: escrituras de
          sociedades, extractos bancarios, modelos oficiales, correspondencia
          entre los actores…
        </p>

        <p>
          A partir de este <i>corpus</i> documental he diseñado una ontología
          informática con clases, objetos, atributos, reglas y un vocabulario de
          relaciones. He modelado cada documento sobre este marco abstracto,
          obteniendo así una representación estructurada de toda la trama que
          luego he abordado mediante un <i>software</i> que he desarrollado para
          este fin.
        </p>

        <p>
          Finalmente he programado las visualizaciones interactivas que hacen
          explorable este modelo de datos de manera visual, de forma que cualquier
          usuario pueda navegar por cada elemento de la trama sin renunciar al
          detalle.
        </p>
      </aside>
    </ladonacion-details>
  </section>

  <aside id="fuentes"></aside>

  <hr />

  <section id="colaborar">
    <h2>Cómo colaborar</h2>

    <figure>
      <div>
        <img src="/assets/images/loroloko.jpg" alt="Loroloko" loading="lazy" />
      </div>
      <figcaption>
        ¡Sirva este público tributo, oh mi alado y esponjoso amigo, de
        agradecimiento a tantas horas compartidas al teclado!
      </figcaption>
    </figure>

    <p>
      Este proyecto solo ha sido posible gracias al comprometido patrocinio de las
      personas que están apoyando mi <i>crowdfunding</i> ciudadano.
    </p>

    <p>
      Personas independientes que compartimos una misma visión: que
      <strong>la transparencia</strong> en las instituciones es el más efectivo
      desinfectante de la vida pública. Y que desde la sociedad civil podemos
      cambiar las cosas utilizando datos y tecnología. Que es posible enviar un
      mensaje a los poderes del Estado e influir.
    </p>

    <p>
      A todos ellos, mi profundo agradecimiento.
      <svg
        class="arrow"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="12 15 75 70"
      >
        <path
          d="M17.7,19.8c2.7-0.8,5.7-0.8,8.6-0.4c3,0.4,5.9,1.3,8.7,2.4c5.3,2.1,10.2,5,14.6,8.6  c9.4,7.8,16.2,18.2,20.4,29.6c1.6,4.4,2.8,8.8,3.8,13.4C73,72.3,72,71.1,71,69.9c-3.1-3.7-6.5-7.3-10.1-10.6  c-0.7-0.6-1.8-0.5-2.6-0.2c-0.4,0.1-1.8,0.9-1.1,1.5c3.4,3.2,6.7,6.6,9.7,10.2c1.5,1.8,2.9,3.6,4.3,5.4c0.7,0.9,1.4,1.8,2,2.8  c0.4,0.5,0.7,1,1.1,1.5c0.2,0.4,0.7,0.8,0.5,1.2c-0.1,0.4,0.1,0.6,0.4,0.8c0.4,0.3,1.3,0.4,1.6,0.4c0.9-0.1,1.9-0.4,2.3-1.2  c3.7-7.2,5.7-15.2,5.8-23.3c0-0.3-0.5-0.5-0.7-0.6c-0.5-0.1-1-0.1-1.5,0C82.1,58,81,58.4,81,59.2c-0.1,5.3-1,10.5-2.7,15.5  c-2.1-11.4-6.1-22.5-12.6-32.1c-6.6-9.7-15.9-17.9-26.8-22.4c-7.2-2.9-15-4.3-22.6-2.1c-0.5,0.2-1.7,0.8-1.1,1.5  C15.7,20.4,17.1,20,17.7,19.8z"
        />
      </svg>
    </p>

    <p>
      👉
      <a href="https://patreon.com/jaime_gomez_obregon" target="_blank"
        >Aquí puedes ayudarme en mi próximo proyecto</a
      >
    </p>

    <p>
      También puedes seguir a
      <a
        class="nowrap"
        href="https://twitter.com/jaimeobregon"
        rel="nofollow"
        target="_blank"
        ><!--
        --><svg
          class="twitter"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 400"
        >
          <path
            style="fill: #1da1f2"
            d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
          />
        </svg>
        <code>@JaimeObregon</code
        ><!--
        --></a
      >
      en Twitter, donde escribo sobre la evolución de este proyecto y los próximos
      que quiero abordar.
    </p>
  </section>

  <aside id="patronos"></aside>

  <hr />

  <section id="legal">
    <h2>Aspectos legales</h2>

    <p>
      Este proyecto tiene una finalidad exclusivamente investigativa y
      divulgativa. Pretende abordar desde una perspectiva innovadora un fenómeno
      de interés público que afecta a la primera institución del Estado.
    </p>

    <p>
      Toda la información contenida en este proyecto procede exclusivamente de
      fuentes públicas, tales como medios de comunicación, boletines oficiales y
      registros públicos destinados a la publicidad.
    </p>

    <p>
      Este sitio web no recaba ningún dato personal de los usuarios, ni analiza su
      tráfico, ni registra su dirección IP de acceso. Tampoco instala ninguna
      <i>cookie</i>.
    </p>

    <p>
      Con la excepción de los materiales de terceros que pudieran estar
      licenciados de otra forma, los contenidos de este proyecto elaborados por el
      autor se publican bajo licencia
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es"
        rel="nofollow"
        target="_blank"
        >Creative Commons Atribución-NoComercial-CompartirIgual 4.0</a
      >. Esto significa que puedes reutilizar dichos contenidos del autor como
      desees para fines no comerciales, pero has de citar que es un trabajo de
      Jaime Gómez-Obregón y proporcionar un enlace a
      <code>https://ladonacion.es</code>.
    </p>

    <p>
      Para contactar con el autor puedes enviar un mensaje privado por Twitter a
      <a href="https://twitter.com/jaimeobregon" rel="nofollow" target="_blank"
        ><code>@JaimeObregon</code></a
      >, o bien escribir un correo electrónico a
      <code
        ><a href="mailto:jaime@ladonacion.es" rel="nofollow"
          >jaime@ladonacion.es</a
        ></code
      >. Son bienvenidos los mensajes con aportaciones de nuevos datos
      documentalmente sostenidos y las propuestas de correcciones.
    </p>

    <ladonacion-details hidden>
      <span slot="summary">Tabla de relaciones</span>
      <div slot="contents">
        <p>
          Para mi propia referencia personal y la de todo aquel que sienta
          curiosidad y encuentre esta tabla.
        </p>
        <table></table>
      </div>
    </ladonacion-details>
  </section>
`

customElements.define(
  'page-autor',
  class extends HTMLElement {
    whenAllImagesAreLoaded(callback) {
      const waitUntilAllImagesAreLoaded = () => {
        const images = this.shadowRoot.querySelectorAll('img')
        if ([...images].every((image) => image.complete)) {
          callback()
        } else {
          setTimeout(waitUntilAllImagesAreLoaded, 150)
        }
      }
      waitUntilAllImagesAreLoaded()
    }

    open(id, pushState = true) {
      this.whenAllImagesAreLoaded(() => {
        const padding = this.shadowRoot.querySelector(
          'section:first-of-type'
        ).offsetTop
        const top = this.shadowRoot.getElementById(id).offsetTop - padding
        window.scrollTo({ top })
      })

      pushState && history.pushState(null, null, `/autor/${id}`)
    }

    close(pushState = true) {
      pushState && history.pushState(null, null, '/autor')
    }

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      const sources = data.sources.sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          ignorePunctuation: true,
        })
      })

      this.shadowRoot.getElementById('fuentes').innerHTML = sources
        .map((source) => {
          return `<img src="/resources/${source.logo}" alt="${source.name}" title="${source.name}">`
        })
        .join('')

      this.shadowRoot.getElementById('patronos').innerHTML =
        patrons
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { ignorePunctuation: true })
          )
          .map((patron) => {
            return patron.link
              ? `<a href="${patron.link}" target="_blank">${patron.name}</a>`
              : `<span>${patron.name}</span>`
          })
          .join('') + `…y muchos valientes más ❤️💪`

      this.shadowRoot.querySelectorAll('h2').forEach((heading) => {
        const link = document.createElement('a')
        const anchor = heading.closest('section')?.getAttribute('id')
        if (anchor) {
          link.setAttribute('href', `/autor/${anchor}`)
          link.innerHTML = heading.innerHTML
          heading.innerHTML = ''
          heading.append(link)
        }
      })

      const allRelations = [...data.documents, ...data.articles]
        .map((item) =>
          item.relations.map((relation) => references.object(relation.type).id)
        )
        .flat()

      const rows = Object.entries(
        data.relations.reduce((accumulator, value) => {
          return {
            ...accumulator,
            [value.type]: (accumulator[value.type] || []).concat(value),
          }
        }, {})
      ).map(([type, relations]) => {
        return (
          `
          <tr>
            <th colspan="4">
              <h2><code>${type}</code></h2>
            </th>
          </tr>
          <tr>
            <th colspan="2"></th>
            <th>Sujetos permitidos</th>
            <th>Objetos permitidos</th>
          </tr>` +
          relations
            .map(
              (relation) => `
                <tr class="relation">
                  <th title="${
                    relation.templates.direct
                      ? 'Relación dirigida'
                      : 'Relación no dirigida'
                  }">
                    ${
                      relation.templates.direct
                        ? `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    `
                        : `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                    `
                    }
                    <code>${relation.id}</code>
                    <small>${
                      allRelations.filter((r) => r === relation.id).length
                    }</small>
                  </th>
                  <td>${relation.description}</td>
                  <td><code>${relation.subjects.join(
                    '</code>, <code> '
                  )}</code></td>
                  <td><code>${relation.objects.join(
                    '</code>, <code>  '
                  )}</code></td>
                </tr>
            `
            )
            .join('')
        )
      })

      this.shadowRoot.querySelector('table').innerHTML = rows.join('')

      this.addEventListener('activate', () => {
        const [, , id = null] =
          window.location.pathname.match(/^\/autor(\/(\w+)?)?$/)
        id ? this.open(id, false) : this.close(false)
      })

      this.addEventListener('deactivate', () => this.close(false))

      document.dispatchEvent(new Event('ready'))
    }
  }
)
