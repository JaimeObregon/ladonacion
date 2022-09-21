const template = document.createElement('template')

template.innerHTML = `
  <style>
    figure {
      margin: 0;
    }

    figcaption,
    header {
      padding: 0.5em 1rem;
    }

    header {
      display: flex;
      font-size: 0.85em;
      font-weight: 200;
      justify-content: space-between;
      background: var(--color-warmGray-200);
      color: var(--color-warmGray-700);
    }

    h2 {
      font-size: 1.15em;
      font-weight: 400;
      line-height: 1.15;
      margin: 0;
    }
  </style>
  <figure>
    <header>
      <slot name="time"></slot>
      <slot name="source"></slot>
    </header>
    <slot name="thumbnail"></slot>
    <figcaption>
      <h2>
        <slot name="title"></slot>
      </h2>
    </figcaption>
  </figure>
`

customElements.define(
  'grid-item',
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
