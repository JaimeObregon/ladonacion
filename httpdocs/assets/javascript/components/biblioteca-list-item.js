const template = document.createElement('template')

template.innerHTML = `
  <style>
    figure {
      display: flex;
      align-items: stretch;
      margin: 0;
    }

    figcaption {
      display: flex;
      flex-direction: column;
      padding: 1em 1.5em;
      width: calc(100% - 20em);
      flex-grow: 1;
      box-sizing: border-box;
    }

    h2 {
      font-size: 1.5em;
      font-weight: 600;
      line-height: 1.15;
      margin: 0.25em 0 1em 0;
    }

    ul {
      flex-grow: 1;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    footer {
      font-size: 0.85em;
      display: flex;
      align-items: center;
      margin-top: 1em;
      flex-grow: 0;
    }

    footer > * {
      display: block;
    }

    footer cite {
      flex-grow: 1;
      font-style: normal;
      font-weight: 100;
      color: var(--color-warmGray-500);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    @media (max-width: 1024px) {
      :host {
        hyphens: auto;
      }
    }

    @media (max-width: 640px) {
      figure {
        flex-direction: column;
      }

      slot[name="thumbnail"] {
        display: block;
        width: 100%;
      }

      figcaption {
        width: 100%;
        padding: 1em;
      }
    }
  </style>
  <figure>
    <slot name="thumbnail"></slot>
    <figcaption>
      <header>
        <slot name="time"></slot>
        <h2>
          <slot name="title"></slot>
        </h2>
      </header>
      <ul>
        <slot name="mentions"></slot>
      </ul>
      <footer>
        <slot name="meta"></slot>
        <cite>
          <slot name="url"></slot>
        </cite>
        <slot name="source"></slot>
      </footer>
    </figcaption>
  </figure>
`

customElements.define(
  'list-item',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }
  }
)
