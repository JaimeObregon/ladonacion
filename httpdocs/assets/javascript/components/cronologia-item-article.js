const template = document.createElement('template')

template.innerHTML = `
  <style>
    slot[name="source"] {
      display: block;
      line-height: var(--bullet-size);
    }

    h1 {
      font-style: italic;
      font-size: 1.35em;
      font-weight: 600;
      margin: 0.5em 0;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.15em;
      }
    }
  </style>
  <article>
    <slot name="source"></slot>
    <h1>
      <slot name="title"></slot>
    </h1>
  </article>
`

customElements.define(
  'cronologia-item-article',
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
