import { router } from '/assets/javascript/modules/router.js'
import '/assets/javascript/components/ladonacion-header.js'
import '/assets/javascript/components/ladonacion-popup.js'
import '/assets/javascript/components/ladonacion-search.js'

const site = {
  init: function (options) {
    const { routes, popupTimeout, mapboxToken } = options

    window.ladonacion = {
      mapboxToken,
    }

    router.init(routes)
    router.dispatch(window.location.pathname)

    document.addEventListener('click', (event) => {
      const link = event
        .composedPath()
        .find((element) => element.nodeName === 'A')
      if (!link?.href || event.metaKey || event.ctrlKey) {
        return
      }

      const current = new URL(window.location)
      const target = new URL(link.href)
      if (current.origin === target.origin) {
        if (current.pathname !== target.pathname) {
          history.pushState(null, null, target.pathname)
        }
        router.dispatch(target.pathname)
        event.preventDefault()
      }
    })

    setTimeout(() => {
      document.body.append(document.createElement('ladonacion-popup'))
    }, popupTimeout)

    document.addEventListener('keydown', (event) => {
      const actions = {
        '?': () => {
          if (!document.querySelector('ladonacion-search')) {
            document.body.append(document.createElement('ladonacion-search'))
            event.preventDefault()
          }
        },
      }

      const action = event.key.toLowerCase()
      actions[action] && actions[action]()
    })

    document.addEventListener('notfound', router.error)

    document.addEventListener('close', (event) => {
      ;({
        'LADONACION-POPUP': () =>
          document.querySelector('ladonacion-popup').remove(),
        'LADONACION-SEARCH': () =>
          document.querySelector('ladonacion-search').remove(),
      }[event.target.tagName]())
    })

    document.body.lock = function () {
      this.dataset.overflow = getComputedStyle(this)['overflow']
      this.style.overflow = 'hidden'
    }

    document.body.unlock = function () {
      this.style.overflow = this.dataset.overflow
    }

    window.addEventListener('popstate', () => {
      const url = new URL(window.location)
      router.dispatch(url.pathname)
    })
  },
}

document.querySelector('body').innerHTML += `
  <ladonacion-header scrollOffset="50">
    <a href="/entramado">Quién es quién</a>
    <a href="/cronologia">Los hechos</a>
    <a href="/mapa">Los lugares</a>
    <a href="/biblioteca">La biblioteca</a>
    <a href="/metodologia">La metodología</a>
    <a href="/autor">El autor</a>
  </ladonacion-header>
`

site.init({
  popupTimeout: 1000 * 60 * 5, // 5 minutes
  mapboxToken: '', // Insert your Mapbox' account token here
  routes: [
    {
      page: 'portada',
      regex: '^/$',
      payload: async () =>
        await import('/assets/javascript/components/page-portada.js'),
    },
    {
      page: 'metodologia',
      regex: '^/metodologia/?$',
      payload: async () =>
        await import('/assets/javascript/components/page-metodologia.js'),
    },
    {
      page: 'entramado',
      regex: '^/entramado(/(\\w*))?$',
      payload: async () =>
        await import('/assets/javascript/components/page-entramado.js'),
    },
    {
      page: 'cronologia',
      regex: '^/cronologia(/(\\w*))?$',
      payload: async () =>
        await import('/assets/javascript/components/page-cronologia.js'),
    },
    {
      page: 'mapa',
      regex: '^/mapa(/(\\w*))?$',
      payload: async () =>
        await import('/assets/javascript/components/page-mapa.js'),
    },
    {
      page: 'biblioteca',
      regex: '^/biblioteca(/(\\w*))?$',
      payload: async () =>
        await import('/assets/javascript/components/page-biblioteca.js'),
    },
    {
      page: 'autor',
      regex: '^/autor(/(\\w*))?$',
      payload: async () =>
        await import('/assets/javascript/components/page-autor.js'),
    },
  ],
})
