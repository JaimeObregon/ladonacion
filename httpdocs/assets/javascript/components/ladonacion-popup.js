const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      --width: 22rem;
      --margin: 2rem;
      position: fixed;
      bottom: var(--margin);
      width: var(--width);
      max-width: calc(100% - 2 * var(--margin));
      right: var(--margin);
      z-index: var(--z-index-popup);
      border: 0.5rem solid var(--color-warmGray-50);
      border-radius: 0.25em;
      transform: translateX(0);
      box-shadow: 0px 0px 7px var(--color-warmGray-900);
      background: var(--color-yellow-400);
      color: var(--color-warmGray-800);
      transition: transform 750ms ease-out;
      hyphens: auto;
      box-sizing: border-box;
    }

    :host(.hidden) {
      transform: translateX(calc(var(--width) + var(--margin)));
    }

    button {
      position: absolute;
      display: flex;
      top: 0.25em;
      right: 0.25em;
      width: 1.25em;
      height: 1.25em;
      padding: 0;
      font-size: 1.5em;
      font-weight: 100;
      border: none;
      border-radius: 1em;
      background: inherit;
      color: var(--color-yellow-600);
      cursor: pointer;
      justify-content: center;
      align-items: center;
      transition: 150ms;
    }

    button > svg {
      width: 100%;
      height: 100%;
    }

    button:hover {
      filter: sepia(50%);
    }

    a {
      display: block;
      font-weight: 300;
      margin: 2em;
      color: var(--color-warmGray-900);
      text-decoration: none;
    }

    h1 {
      display: block;
      margin: 0;
      font-size: 1.45em;
      font-weight: 800;
    }

    strong {
      font-weight: 900;
    }

    a:hover cite {
      color: var(--color-yellow-400);
      background: var(--color-warmGray-800);
    }

    a > svg {
      width: 6em;
    }

    @media (max-width: 768px) {
      :host {
        --margin: 1rem;
      }
    }
  </style>
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
  <a href="https://jaime.gomezobregon.com/sobre-la-corrupcion" target="_blank">
    <h1>Hola, soy Jaime.</h1>
    <p>
      Soy la persona detrás de este proyecto que busca dar más transparencia a la
      Casa Real.
    </p>
    <p>Es mi granito de arena para unas instituciones limpias de corrupción.</p>
    <p>
      <strong>Ahora quiero ahondar más</strong> y lanzar nuevos proyectos como
      este, para la transparencia en España.
    </p>
    <p>
      ¿Puedes ayudarme? Haz clic aquí para leer mi carta, y valora echar una mano.
    </p>

    <p>Un abrazo,</p>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="50 50 1000 1000"
    >
      <path
        d="m 158.25452,326.78038 c -17.18307,-21.67584 53.0271,-104.0521 74.96796,-147.55417 30.6594,-57.7689 36.13252,-68.32507 58.14084,-121.196156 -29.86833,26.238278 -7.11467,24.027126 -18.63689,110.268006 -8.15758,135.77045 -27.15788,270.54884 -50.40156,404.46466 -11.77464,76.13721 -11.3021,162.6912 -21.73549,238.96172 -2.64563,70.66279 -5.60071,189.60136 -12.38826,137.16018 -11.46848,-45.42372 -37.21747,-94.40835 -48.58671,-139.93876 -19.845,-55.61711 -24.41834,-119.47508 5.12456,-172.71349 37.12294,-73.47473 107.11596,-120.74063 166.31922,-174.66798 23.2582,-18.76615 3.55236,-42.81068 -9.62816,-11.84478 -10.5488,36.14435 -49.38618,47.87161 -72.8861,74.04501 -58.80235,52.1061 -120.22439,116.16487 -123.74429,199.38867 -2.57902,51.27186 16.92923,100.32554 33.94369,147.78302 14.01563,32.04107 24.1948,62.93724 35.03359,98.36274 14.07936,52.76735 6.3114,63.20565 24.61483,72.32465 25.95813,-22.7257 5.74186,-33.4956 10.83273,-94.49319 2.23093,-108.04297 19.85257,-214.98674 24.47641,-322.8504 12.14191,-126.55732 39.44514,-251.19039 48.65883,-378.11169 6.66296,-62.7251 13.77354,-125.56008 14.14619,-188.714031 -47.57714,11.813976 -5.14259,0.575665 -68.50435,105.883471 -27.88911,50.87897 -59.25117,99.75836 -91.68043,147.83902 -10.08395,20.76942 5.04367,33.9654 21.93339,15.6035 z"
      />
      <path
        d="m 375.5949,251.09681 c 13.62221,-21.77383 43.29712,-75.53297 3.17618,-82.43752 -18.20724,-5.05797 -54.80454,44.44683 -75.96041,71.41922 -45.97948,66.9748 -92.75453,135.1299 -121.24647,211.67847 -12.61947,34.10337 -15.42048,81.33469 19.69678,102.94659 38.32532,19.36188 81.93393,-8.91687 105.31077,-39.32266 41.07076,-48.80169 75.62913,-102.64824 114.74965,-152.90983 -24.38812,1.19052 -52.7684,50.59164 -47.28917,82.15325 25.02123,19.22722 60.00108,-23.42223 82.41194,-39.6785 12.5311,-12.34804 51.47312,-47.29139 47.39424,-46.98643 -18.96582,18.8338 -23.99913,81.65743 11.98599,79.12627 29.78775,-11.02798 60.4226,-31.01393 74.97707,-60.24789 10.75718,-23.69331 16.63921,3.81856 25.12548,10.04453 40.17109,24.92928 71.32154,-41.87978 105.65875,-11.73889 27.0696,36.53188 69.42357,-3.86357 92.39301,-25.17937 10.96665,-14.63829 60.50167,-62.13404 16.43652,-60.03403 -36.949,1.26857 -51.6619,45.27739 -31.21851,72.50774 21.4924,33.90492 66.72103,43.89538 103.23209,30.9805 49.80044,-14.85018 95.39698,-41.6475 139.25239,-68.82832 -43.71877,19.09892 -83.86362,47.70033 -131.11898,58.67163 -41.51026,14.0723 -100.82332,-11.01419 -103.51112,-68.65675 11.43483,-18.1615 20.63355,-11.82911 22.27124,-8.06634 -13.04004,30.17469 -37.61329,60.69192 -59.90567,71.25995 -28.40372,-2.45073 -50.54366,-47.37105 -79.27075,-13.51915 -25.59026,20.51023 -55.38865,15.42685 -79.7332,1.79292 -2.92338,-1.63722 -4.3708,-5.14437 -8.51748,-5.25203 -30.85526,4.80331 -35.03691,43.65917 -59.15078,58.4366 -9.46882,6.36135 -38.39453,18.5163 -34.96569,-20.54894 -0.23843,-15.93183 18.70052,-64.19662 -13.95353,-39.65923 -26.22931,24.83836 -66.45329,60.84834 -84.08703,74.67981 -46.22957,22.62884 -4.791,-46.01002 4.99417,-62.32188 4.13391,-21.47066 -29.52147,16.99758 -33.22025,24.96184 -24.55214,40.0955 -55.15169,75.85144 -82.55019,113.99127 -10.50009,13.20571 -8.44502,13.91775 -30.07254,31.95488 -41.19132,16.39864 -64.25045,2.64254 -73.93133,-28.92564 -12.32176,-41.0625 9.22328,-82.89024 25.6528,-119.72086 36.89529,-66.10502 75.92228,-131.66723 123.01784,-191.1067 8.14622,-9.41273 18.42855,-24.34406 23.63596,-23.1488 35.5621,7.88595 4.04529,51.07949 -6.15982,70.80044 -8.032,15.77512 9.1026,1.49566 14.49005,0.88385 z"
      />
      <path
        d="m 496.50938,260.28109 c 2.90238,-1.08409 11.14964,-6.28461 13.97982,-5.63782 0.48631,0.11114 0.78936,0.61017 1.18403,0.91525 0.26672,0.87508 0.62284,1.72777 0.80016,2.62525 1.57624,7.97796 1.01001,17.62355 0.78923,25.76657 -0.15102,4.41754 -0.29027,8.83514 -0.44656,13.25248 0,0 20.15077,-10.21558 20.15077,-10.21558 v 0 c 0.0227,-4.36403 0.0938,-8.72753 0.0891,-13.09183 -0.0161,-5.41724 0.0276,-10.84128 -0.1106,-16.25713 -0.0709,-2.77752 -0.18071,-7.42301 -0.77763,-10.26416 -0.26357,-1.25453 -0.79579,-2.4372 -1.19368,-3.6558 -0.70315,-0.78232 -1.20174,-1.81544 -2.10944,-2.34698 -3.46394,-2.02848 -11.09511,3.64448 -14.51953,4.64289 0,0 -17.83568,14.26686 -17.83568,14.26686 z"
      />
    </svg>
  </a>
`

customElements.define(
  'ladonacion-popup',
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
      document.removeEventListener('keydown', this.listener, { capture: true })
      this.addEventListener('transitionend', super.remove.bind(this))
    }

    connectedCallback() {
      this.listener = (event) => {
        if (event.key !== 'Escape') {
          return
        }
        this.dispatchEvent(new Event('close', { bubbles: true }))
        event.preventDefault()
        event.stopPropagation()
      }

      this.classList.add('hidden')

      // See https://stackoverflow.com/a/24195559
      const triggerBrowserReflow = this.offsetWidth
      this.classList.remove('hidden')

      this.shadowRoot
        .querySelector('button')
        .addEventListener('click', (event) => {
          this.dispatchEvent(new Event('close', { bubbles: true }))
          event.preventDefault()
        })

      document.addEventListener('keydown', this.listener, { capture: true })
    }
  }
)
