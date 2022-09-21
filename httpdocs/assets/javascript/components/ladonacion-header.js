const template = document.createElement('template')

const transitionDuration = 250

template.innerHTML = `
  <style>
    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: .8;
        }
    }

    @keyframes appearFromTop {
        0% {
            opacity: 0;
            transform: translateY(-4rem);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes appearFromLeft {
        0% {
            opacity: 0;
            transform: translateX(-100%);
        }

        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    :host {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: var(--z-index-header);
    }

    nav {
        --border-thickness: .35rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0 2em;
        font-weight: 400;
        border-bottom: 1px solid transparent;
        background: #1c1917f7; /* var(--color-warmGray-900) */
        color: var(--color-warmGray-400);
        backdrop-filter: blur(1em);
        box-sizing: border-box;
        transition: 250ms;
        position: relative;
    }

    :host(:not(.expanded)) nav.shadow {
        box-shadow: 0 .25em .25em #1c191750; /* var(--color-warmGray-900) */
        border-color: var(--color-warmGray-800);
    }

    button {
        padding: .5rem 1rem;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
    }

    button[role=button] {
        display: none;
        position: absolute;
        top: 0;
        right: 1em;
        width: auto;
        height: var(--header-height);
    }

    button[role=button] svg {
        transition: 250ms;
        height: 100%;
        max-height: 1.5rem;
        vertical-align: middle;
    }

    button[role=search] {
        width: var(--header-height);
        height: var(--header-height);
    }

    button[role=search] svg {
        height: 1.5rem;
        vertical-align: middle;
    }

    div {
        flex-grow: 1;
    }

    slot {
        display: flex;
        align-items: stretch;
        flex-grow: 1;
        box-sizing: border-box;
    }

    a, ::slotted(a) {
        --padding: 1rem;
        flex-grow: 1;
        padding: calc(var(--padding) - var(--border-thickness)) .5rem var(--padding) .5rem;
        line-height: calc(var(--header-height) - 2 * var(--padding));
        text-align: center;
        border-top: var(--border-thickness) solid transparent;
        text-decoration: none;
        color: var(--color-warmGray-400);
    }

    ::slotted(a),
    button {
        transition: color 500ms, border-color 500ms;
    }

    ::slotted(a:hover),
    button:hover {
        transition: color 250ms, border-color 250ms;
        color: var(--color-white);
    }

    slot,
    button[role=search] {
        animation: appearFromTop 1s backwards;
    }

    a {
        position: relative;
        z-index: var(--z-index-header);
        font-weight: 700;
        font-size: 1.25em;
        text-align: left;
        padding-left: 3rem;
        color: var(--color-white);
        flex-grow: 0;
        animation: appearFromLeft 1s backwards;
    }

    a svg {
        position: absolute;
        left: var(--border-thickness);
        top: var(--border-thickness);
        height: 1.5em;
    }

    ::slotted(a.active) {
        color: var(--color-yellow-400);
        border-color: inherit;
    }

    @media (max-width: 1280px) {
        nav {
            padding: 0 1em;
        }
    }

    @media (max-width: 980px) {
        nav {
            --width: 20rem;
        }

        nav.backdrop::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: var(--color-warmGray-900);
            cursor: pointer;
        }

        :host(.expanded) nav.backdrop::before {
            animation: fade ${transitionDuration}ms forwards;
        }

        :host(:not(.expanded)) nav.backdrop::before {
            opacity: 0 !important;
            transition: opacity ${transitionDuration}ms;
        }

        div {
            position: absolute;
            top: 0;
            left: 0;
            padding-top: var(--header-height);
            width: var(--width);
            height: calc(100vh - var(--header-height));
            background: #0d0b0b;
            transform: translateX(calc(-1 * var(--width)));
            transition: transform ${transitionDuration}ms;
            box-shadow: 0px 0 8px var(--color-warmGray-900);
        }

        :host(.expanded) div {
            transform: translateX(0);
        }

        slot {
            display: flex;
            align-items: stretch;
            flex-direction: column;
            text-align: left;
            box-sizing: border-box;
            padding: 0;
        }

        ::slotted(a:first-of-type) {
            border-top: 1px solid var(--color-warmGray-900) !important;
        }

        ::slotted(a) {
            text-align: left;
            border-top: 0;
            border-left: var(--border-thickness) solid transparent;
            padding: 1em;
            font-size: 1.25em;
            font-weight: 600;
            border-bottom: 1px solid var(--color-warmGray-900) !important;
            transition: 250ms;
        }

        ::slotted(a:hover) {
            border-color: var(--color-yellow-400);
            background: var(--color-warmGray-900) !important;
        }

        slot,
        button[role=search] {
            animation: none;
        }

        button[role=button] {
            display: block;
        }

        button[role=search] {
            position: absolute;
            width: 4.5em;
            left: calc(var(--width) - 4.5em);
            transform: translateX(calc(-1 * var(--width)));
            transition: transform ${transitionDuration}ms;
        }

        button[role=search] svg {
            height: 1.25rem;
        }

        :host(.expanded) button[role=button] svg {
            transform: rotate(90deg);
        }

        :host(.expanded) button[role=search] {
            transform: translateX(0);
        }
    }

    @media (max-width: 768px) {
        nav a svg {
            margin-left: var(--border-thickness);
            height: 1.15em;
        }
    }

    @media (max-width: 640px) {
        nav {
            --width: 18rem;
        }
    }
  </style>
  <nav>
    <a href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path
          d="M97.2,65.8c-0.6-2.2-2-4-4-5.1c-0.7-0.4-1.5-0.7-2.3-0.8c0.9-2.5,1.2-5.2,0.8-7.9c-1.8-11.8-6-26.6-15.8-33.5l3.6-3.5 c1.7-1.7,2.3-4.2,1.3-6.4c-0.9-2.2-3.1-3.7-5.4-3.7H51.8c-2.4,0-4.6,1.5-5.5,3.7s-0.4,4.8,1.3,6.4l3.6,3.5 c-9.9,6.9-14.1,21.8-15.9,33.5c-0.3,1.9-0.2,3.8,0.1,5.6c-0.8,0.1-1.5,0.2-2.3,0.4L22,60.8v-1.9c0-1.3-1.1-2.4-2.4-2.4H4.9 c-1.3,0-2.4,1.1-2.4,2.4v32.5c0,1.3,1.1,2.4,2.4,2.4h14.7c1.3,0,2.4-1.1,2.4-2.4v-2.2L55.8,95c1.1,0.2,2.1,0.3,3.2,0.3 c3.9,0,7.6-1.2,10.8-3.5L94,74.7C96.8,72.7,98.1,69.1,97.2,65.8z M17.2,89H7.3V61.3h9.8V89z M51,11.4c-0.4-0.5-0.3-0.9-0.2-1.2 c0.1-0.2,0.3-0.7,1-0.7h23.5c0.6,0,0.9,0.4,1,0.7c0.1,0.3,0.2,0.7-0.3,1.2l-5.4,5.3c-4.5,1.5-9.5,1.6-14.1,0L51,11.4z M40.2,52.6 c1.4-9.3,5.3-25.5,15.3-31.2c2.6,0.8,5.3,1.3,8.1,1.3c2.7,0,5.5-0.4,8.1-1.3c4.9,2.7,8.3,8,10.7,13.7c2.5,6,3.9,12.7,4.6,17.5 c0.4,2.8-0.2,5.6-1.8,7.9l-19.7,6.2c-0.7-0.7-1.5-1.2-2.4-1.6l-15.9-6.4c-2.1-0.8-4.4-1.3-6.7-1.5C40.1,55.7,39.9,54.2,40.2,52.6 z M91.2,70.7L67,87.9c-3,2.1-6.7,3-10.3,2.4L22,84.3V65.8l12.5-3.3c3.6-0.9,7.4-0.7,10.9,0.7l15.9,6.4c0.5,0.2,0.9,0.5,1.1,1 c0.2,0.5,0.2,1,0,1.5c-0.3,0.8-1.1,1.3-2,1.1l-18.8-3c-1.3-0.2-2.6,0.7-2.8,2c-0.2,1.3,0.7,2.6,2,2.8l18.8,3 c0.3,0.1,0.7,0.1,1.1,0.1c2.7,0,5.1-1.6,6.2-4.1c0.4-0.9,0.5-1.9,0.5-2.8l20.9-6.6c0.9-0.3,1.9-0.2,2.7,0.3 c0.8,0.5,1.4,1.2,1.7,2.1C92.9,68.4,92.4,69.9,91.2,70.7z"
        ></path>
        <path
          d="M65.2,50.9h-3.4c-1.5,0-2.7-1.2-2.7-2.7h-4.3c0,3.7,2.9,6.7,6.5,6.9v3.5h4.3v-3.5c3.6-0.2,6.5-3.2,6.5-6.9 c0-3.8-3.1-6.9-6.9-6.9h-3.4c-1.5,0-2.7-1.2-2.7-2.7s1.2-2.7,2.7-2.7h3.4c1.5,0,2.7,1.2,2.7,2.7h4.3c0-3.7-2.9-6.7-6.5-6.9v-3.5 h-4.3v3.5c-3.6,0.2-6.5,3.2-6.5,6.9c0,3.8,3.1,6.9,6.9,6.9h3.4c1.5,0,2.7,1.2,2.7,2.7C67.9,49.7,66.7,50.9,65.2,50.9z"
        ></path>
      </svg>
      La donación
    </a>
    <div>
      <slot></slot>
    </div>
    <button role="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </button>
    <button role="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
        />
      </svg>
    </button>
  </nav>
`

customElements.define(
  'ladonacion-header',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    open() {
      this.shadowRoot.querySelector('nav').classList.add('backdrop')
      this.classList.add('expanded')
      document.body.lock()
    }

    close() {
      this.shadowRoot.querySelector('div').addEventListener(
        'transitionend',
        () => {
          if (!this.classList.contains('expanded')) {
            this.shadowRoot.querySelector('nav').classList.remove('backdrop')
          }
        },
        { once: true }
      )

      this.classList.remove('expanded')
      document.body.unlock()
    }

    connectedCallback() {
      const nav = this.shadowRoot.querySelector('nav')
      const closeButton = nav.querySelector('button[role=button]')
      const searchButton = nav.querySelector('button[role=search]')

      ;[
        ...this.querySelectorAll('a'),
        this.shadowRoot.querySelector('a'),
      ].forEach((link) => {
        link.addEventListener('click', () => {
          this.close()
          window.scrollTo({ top: 0 })
        })
      })

      nav.addEventListener(
        'click',
        (event) => event.target === nav && this.close()
      )

      closeButton.addEventListener('click', () => {
        this.classList.contains('expanded') ? this.close() : this.open()
      })

      searchButton.addEventListener('click', () => {
        if (!document.querySelector('ladonacion-search')) {
          this.close()
          document.body.append(document.createElement('ladonacion-search'))
        }
      })

      this.listener = (event) => {
        if (event.key !== 'Escape') {
          return
        }

        if (this.classList.contains('expanded')) {
          this.close()
          event.stopPropagation()
        }
      }

      document.addEventListener('scroll', () => {
        nav.classList.toggle(
          'shadow',
          window.pageYOffset > this.getAttribute('scrollOffset')
        )
      })

      document.addEventListener('activate', (event) => {
        const path = window.location.pathname.split('/')[1]
        this.querySelectorAll('a[href]').forEach((a) => {
          const section = new URL(a.href).pathname.split('/')[1]
          a.classList.toggle('active', section === path)
        })
      })

      document.addEventListener('keydown', this.listener, { capture: true })
    }
  }
)
