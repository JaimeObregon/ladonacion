import { data } from '/resources/ladonacion.js'
import { references } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/ladonacion-panel-description.js'
import '/assets/javascript/components/ladonacion-reference.js'
import '/assets/javascript/components/ladonacion-citations.js'
import '/assets/javascript/components/ladonacion-country.js'
import '/assets/javascript/components/ladonacion-excerpt.js'
import '/assets/javascript/components/mapa-panel.js'
import mapboxgl from 'https://cdn.skypack.dev/pin/mapbox-gl@v2.0.1-kkTjXSUiu4Vcrz2LgHY4/min/mapbox-gl.js'

const template = document.createElement('template')

template.innerHTML = `
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"/>
  <style>
    :host {
      display: block;
    }

    :host > div {
      width: 100%;
      height: 100vh;
    }

    mapa-panel {
      --padding: 1.5rem;
    }

    mapa-panel div[slot="google_embed"] {
      overflow: hidden;
    }

    mapa-panel div[slot="google_embed"] iframe {
      --offset: -6.25em;
      --aspect-ratio: calc(16 / 9);
      display: block;
      width: var(--width);
      height: calc(var(--width) / var(--aspect-ratio) - var(--offset));
      margin-top: var(--offset);
      border: none;
    }

    mapa-panel [slot="town"] {
      margin-right: 0.5em;
    }

    mapa-panel [slot="address"] svg,
    mapa-panel [slot="town"] svg {
      display: inline;
      vertical-align: middle;
    }

    mapa-panel a[slot="google_link"] {
      text-decoration: none;
      color: inherit;
      font-weight: 100;
      font-size: 0.75em;
    }

    mapa-panel a[slot="google_link"]:hover {
      text-decoration: underline;
    }

    mapa-panel ladonacion-reference {
      display: inline-block;
      margin: 0.25em 0;
      font-size: 1.15em;
      font-weight: 500;
    }
  </style>
  <div></div>
`

customElements.define(
  'page-mapa',
  class extends HTMLElement {
    places = ((items) => ({
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: items.map((item) => ({
          type: 'Feature',
          properties: item,
          geometry: {
            type: 'Point',
            coordinates: item.coords.reverse(),
          },
        })),
      },
    }))(data.places)

    open(id, pushState = true) {
      if (this.panel && this.panel.getAttribute('item') === id) {
        return
      }

      this.panel && this.close(false)
      this.panel = document.createElement('mapa-panel')
      this.panel.setAttribute('item', id)
      this.shadowRoot.append(this.panel)

      const place = data.places.find((place) => place.id === id)
      if (!place) {
        return document.dispatchEvent(new Event('notfound'))
      }

      const panelWidth =
        this.panel.shadowRoot.querySelector('aside').offsetWidth
      this.map.flyTo({
        zoom: place.zoom,
        center: [...place.coords],
        padding: { right: panelWidth },
      })

      const reference = references.build({
        model: 'places',
        id: id,
      })

      this.panel.innerHTML = `
        <span slot="title">${place.title}</span>
        <div slot="google_embed">
          <iframe
            src="${place.google.embed}"
            sandbox="allow-scripts"
            referrerpolicy="no-referrer" allowfullscreen=""></iframe>
        </div>
        <a
          slot="google_link"
          href="${place.google.maps}" rel="noreferrer" target="_blank">
          Abrir en Google Maps
        </a>

        ${
          place.address
            ? `
            <span slot="address">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              ${place.address}
            </span>
        `
            : ''
        }

        ${
          place.town
            ? `
            <span slot="town">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
              </svg>
              ${place.town} ${place.zip ?? ''}
            </span>`
            : ''
        }

        <ladonacion-country
          slot="country"
          country="${place.country}"></ladonacion-country>
        <ladonacion-panel-description
          slot="description" dark>${references.replace(place.description)}
        </ladonacion-panel-description>
        <ladonacion-citations slot="relations" subject="${reference}"></ladonacion-citations>
      `

      this.panel.addEventListener('close', this.close.bind(this))

      this.panel.addEventListener('previous', () => {
        const id = this.panel.getAttribute('item')
        const current = data.places.findIndex((item) => item.id === id)
        current && this.open(data.places[current - 1].id)
      })

      this.panel.addEventListener('next', () => {
        const id = this.panel.getAttribute('item')
        const current = data.places.findIndex((item) => item.id === id)
        current + 1 < data.places.length &&
          this.open(data.places[current + 1].id)
      })

      pushState && history.pushState(null, null, `/mapa/${place.id}`)
    }

    close(pushState = true) {
      if (!this.panel) {
        return
      }

      this.panel = this.panel.remove()
      pushState && history.pushState(null, null, '/mapa')
    }

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      const madrid = [-3.703928, 40.420177]

      const styles = {
        satellite: 'mapbox://styles/jaimeobregon/ckk2wah2t3uut17npp65nahan',
        monochrome: 'mapbox://styles/jaimeobregon/ckk1sg32l2sa517qw5qfxyieq',
      }

      this.config = {
        marker: '/assets/images/marker.svg',
        map: {
          container: this.shadowRoot.querySelector('div'),
          style: styles.satellite,
          center: madrid,
          zoom: 1.75,
          minZoom: 2,
        },
        geojson: {
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 25,
        },
        layers: {
          points: {
            type: 'symbol',
            filter: ['!', ['has', 'point_count']],
            layout: {
              'icon-image': 'marker',
            },
          },
          counts: {
            type: 'symbol',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-size': [
                'interpolate',
                ['linear'],
                ['get', 'point_count'],
                1,
                13,
                15,
                50,
              ],
            },
          },
          clusters: {
            type: 'circle',
            filter: ['has', 'point_count'],
            paint: {
              'circle-stroke-color': '#FBBF24',
              'circle-color': '#ffffff',
              'circle-stroke-width': 5,
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'point_count'],
                1,
                15,
                15,
                50,
              ],
            },
          },
        },
      }

      mapboxgl.accessToken = window.ladonacion.mapboxToken
      this.map = new mapboxgl.Map({ ...this.config.map })

      const image = new Image(55, 55)
      image.src = this.config.marker
      image.onload = () => this.map.addImage('marker', image)

      this.places = { ...this.config.geojson, ...this.places }

      this.map.on('load', () => {
        this.map.resize()
        this.map.addSource('places', this.places)
        this.map.addLayer({
          source: 'places',
          id: 'points',
          ...this.config.layers.points,
        })
        this.map.addLayer({
          source: 'places',
          id: 'clusters',
          ...this.config.layers.clusters,
        })
        this.map.addLayer({
          source: 'places',
          id: 'counts',
          ...this.config.layers.counts,
        })
      })

      this.map.on('click', (event) => {
        const features = this.map.queryRenderedFeatures(event.point, {
          layers: ['points', 'clusters'],
        })

        features.length
          ? {
              points: () => this.open(features[0].properties.id),
              clusters: () => {
                const id = features[0].properties.cluster_id
                this.map
                  .getSource('places')
                  .getClusterExpansionZoom(id, (error, zoom) => {
                    this.map.easeTo({
                      center: features[0].geometry.coordinates,
                      zoom: zoom,
                    })
                  })
              },
            }[features[0].layer.id].call()
          : this.close()
      })
      ;['points', 'clusters'].forEach((layer) => {
        this.map.on(
          'mouseenter',
          layer,
          () => (this.map.getCanvas().style.cursor = 'pointer')
        )
        this.map.on(
          'mouseleave',
          layer,
          () => (this.map.getCanvas().style.cursor = '')
        )
      })

      this.addEventListener('activate', () => {
        const [, , id = null] =
          window.location.pathname.match(/^\/mapa(\/(\w+)?)?$/)
        id ? this.open(id, false) : this.close(false)

        // See https://docs.mapbox.com/help/troubleshooting/blank-tiles/#mapbox-gl-js
        this.map.resize()
      })

      this.addEventListener('deactivate', () => this.close(false))

      document.dispatchEvent(new Event('ready'))
    }
  }
)
