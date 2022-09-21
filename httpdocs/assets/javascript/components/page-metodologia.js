const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    iframe {
      display: block;
      width: 100vw;
      height: 100vh;
      border: none;
    }
  </style>
`

customElements.define(
  'page-metodologia',
  class extends HTMLElement {
    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      // Path containing the presentation exported from slides.com, unzipped.
      // See https://help.slides.com/knowledgebase/articles/546541
      const src = `/slides/index.html`

      // See https://stackoverflow.com/a/29859214
      const iframe = document.createElement('iframe')
      iframe.toggleAttribute('allowfullscreen')
      iframe.setAttribute('referrerpolicy', 'no-referrer')
      iframe.setAttribute(
        'sandbox',
        'allow-popups allow-scripts allow-popups-to-escape-sandbox allow-same-origin'
      )

      this.shadowRoot.append(iframe)

      this.addEventListener('activate', () => {
        iframe.setAttribute('src', src)
        iframe.addEventListener('load', () => iframe.contentWindow.focus(), {
          once: true,
        })
      })

      this.addEventListener('deactivate', () => iframe.removeAttribute('src'))

      document.dispatchEvent(new Event('ready'))
    }
  }
)
