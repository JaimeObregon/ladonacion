const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 1.15em;
      max-width: var(--main-width);
      padding: var(--main-padding);
      margin: 1em auto;
    }

    h1 {
      display: inline-block;
      font-size: 2.15em;
      line-height: 1.35;
      margin: 6em 0;
    }

    h1 strong {
      display: block;
      margin-top: 0.5em;
      margin-left: -100em;
      text-indent: 100em;
      padding: .25em 1em .25em 0;
      background: var(--color-warmGray-100);
      color: var(--color-warmGray-900);
    }

    section {
      --gap: 3em;
      --width: calc(50% - 0.5 * var(--gap));
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: var(--gap) 0;
    }

    section a {
      position: relative;
      width: var(--width);
      height: 25em;
      margin-bottom: var(--gap);
      border-radius: 0.5em;
      background-size: cover;
      background-position: center;
      overflow: hidden;
      transition: transform 0.5s;
      color: var(--color-white);
      transition: 1s;
      box-shadow: 0 0 2px var(--color-black);
    }

    section a[href*="entramado"] {
      background-image: radial-gradient(transparent 70%, #1c1917a0 120%),
        url(/assets/images/entramado.jpg);
    }

    section a[href*="cronologia"] {
      background-image: radial-gradient(transparent 70%, #1c1917a0 120%),
        url(/assets/images/cronologia.jpg);
    }

    section a[href*="mapa"] {
      background-image: radial-gradient(transparent 70%, #1c1917a0 120%),
        url(/assets/images/mapa.jpg);
    }

    section a[href*="biblioteca"] {
      background-image: radial-gradient(transparent 70%, #1c1917a0 120%),
        url(/assets/images/biblioteca.jpg);
    }

    section a[href*="metodologia"] {
      background-image: radial-gradient(transparent 70%, #1c1917a0 120%),
        url(/assets/images/metodologia.jpg);
    }

    section a[href*="autor"] {
      background-image: radial-gradient(transparent 70%, #1c1917a0 120%),
        url(/assets/images/autor.jpg);
    }

    section a:hover {
      box-shadow: 0 0 10px var(--color-black);
      transform: scale(1.015);
      filter: brightness(105%);
      transition: 0.15s;
    }

    section a h2 {
      font-size: 1.5em;
    }

    section a footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 1.5em;
      font-weight: 400;
      box-sizing: border-box;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      background: #1c1917d0; /* var(--color-warmGray-900) */
      overflow: hidden;
      hyphens: auto;
    }

    section a h2,
    section a p {
      margin: 0;
    }

    section a h2 + p {
      margin-top: 0.5em;
    }

    :host > footer {
      width: 100%;
      text-align: center;
      margin: 5em 0;
      font-size: 1em;
    }

    :host > footer a {
      text-decoration: none;
      color: var(--color-gray-200);
      opacity: 0.5;
      transition: 1s;
    }

    :host > footer a:hover {
      opacity: 1;
      transition: 0.25s;
    }

    :host > footer svg {
      height: 1.5em;
      vertical-align: middle;
    }

    :host > footer cite {
      font-style: normal;
    }

    @media (max-width: 1280px) {
      h1 {
        font-size: 2.15em;
        margin: 4em 0;
      }

      section {
        --gap: 2em;
      }
    }

    @media (max-width: 1024px) {
      section a footer {
        font-size: 0.85em;
      }

      h1 {
        font-size: 1.75em;
        margin: 3em 0;
      }

      h1 strong {
        text-indent: 0;
        margin-left: -1em;
        padding-left: 1em;
      }

      section {
        --gap: 1em;
      }

      section a {
        height: 20em;
      }

      section a h2 {
        font-size: 1.35em;
      }

      :host > footer {
        font-size: 0.85em;
        margin-bottom: 2em;
      }
    }

    @media (max-width: 768px) {
      section {
        --width: 100%;
      }

      section a h2 {
        font-size: 1.25em;
      }

      section a footer {
        padding: 1em;
      }

      h1 {
        font-size: 1.35em;
      }
    }

    @media (max-width: 640px) {
      h1 {
        font-size: 1em;
      }
    }
  </style>
  <h1>
    En 2012 el rey de España, Juan Carlos I,<br />
    transfiere a una amiga 65 millones de euros<br />
    desde una cuenta secreta en Suiza.<br />
    <strong>¿Qué hay detrás de esta extraña donación?</strong>
  </h1>

  <section>
    <a href="/entramado">
      <footer>
        <h2>Quién es quién</h2>
        <p>
          Explora las biografías de jefes de Estado y personalidades de los
          negocios, sus relaciones de poder con la familia real española y las
          sociedades que controlan por todo el mundo.
        </p>
      </footer>
    </a>
    <a href="/cronologia">
      <footer>
        <h2>Los hechos</h2>
        <p>
          Visualiza la línea de tiempo con todos los sucesos relevantes que han
          trascendido desde que los escándalos salieron a la luz, conectados con
          las evidencias documentales.
        </p>
      </footer>
    </a>
    <a href="/mapa">
      <footer>
        <h2>Los lugares</h2>
        <p>
          Navega por todos los escenarios donde transcurre la historia: desde
          paraísos fiscales como Panamá a los bufetes en Suiza y los inmuebles de
          lujo adquiridos con fondos opacos.
        </p>
      </footer>
    </a>
    <a href="/biblioteca">
      <footer>
        <h2>La biblioteca</h2>
        <p>
          Accede a todos los documentos y contrasta las informaciones que han
          publicado medios de comunicación tanto españoles como extranjeros,
          registros públicos y boletines oficiales.
        </p>
      </footer>
    </a>
    <a href="/metodologia">
      <footer>
        <h2>La metodología</h2>
        <p>
          En este proyecto convergen la tecnología, la investigación y la ciencia
          de datos. Así es como he informatizado todos los hechos para hacer
          posible esta herramienta innovadora.
        </p>
      </footer>
    </a>
    <a href="/autor">
      <footer>
        <h2>El autor</h2>
        <p>
          Soy un ingeniero especialista en datos que trabaja para dar más
          transparencia a las instituciones españolas. Me apoyan muchas personas
          en un <i>crowdfunding</i> ciudadano.
        </p>
      </footer>
    </a>
  </section>
  <footer>
    <a href="https://twitter.com/JaimeObregon" target="_blank">
      Un proyecto de
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
        <path
          style="fill: #1da1f2"
          d="M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"
        />
      </svg>
      <cite>Jaime Gómez-Obregón</cite>
    </a>
  </footer>
`

customElements.define(
  'page-portada',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.shadowRoot.addEventListener('click', (event) => {
        event.target.href && window.scrollTo({ top: 0 })
      })

      const header = document.querySelector('ladonacion-header')
      this.addEventListener('activate', () => (header.style.display = 'none'))
      this.addEventListener(
        'deactivate',
        () => (header.style.display = 'block')
      )

      this.shadowRoot.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
          window.scrollTo({ top: 0 })
        })
      )

      document.dispatchEvent(new Event('ready'))
    }
  }
)
