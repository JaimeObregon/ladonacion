import { data } from '/resources/ladonacion.js'
import { references } from '/assets/javascript/modules/references.js'
import '/assets/javascript/components/ladonacion-details.js'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      display: block;
      font-size: 0.85em;
    }

    :host([dark]) div:not(:empty) {
      border: none;
    }

    ladonacion-details {
      transition: margin-bottom 250ms;
    }

    ladonacion-details::part(marker) {
      padding: 0.5em 1em;
    }

    ladonacion-details span[slot="summary"] {
      display: block;
      padding: 0.5em 1.5em 0.5em 2.5em;
    }

    ladonacion-details::part(contents) {
      padding: 0 1em 0 2.5em;
    }

    ladonacion-details::part(summary) {
      width: 100%;
      box-sizing: border-box;
      background: var(--color-white);
      transition: background var(250ms);
    }

    ladonacion-details:first-of-type {
      border-top: 1px solid var(--color-warmGray-200);
    }

    :host([dark]) ladonacion-details:first-of-type {
      border-top: 1px solid var(--color-warmGray-900);
    }

    ladonacion-details {
      border-bottom: 1px solid var(--color-warmGray-200);
    }

    :host([dark]) ladonacion-details {
      border-bottom: 1px solid var(--color-warmGray-900);
    }

    :host([dark]) ladonacion-details::part(summary) {
      background: var(--color-warmGray-800);
    }

    ladonacion-details::part(marker) {
      margin-top: 0.5em;
    }

    ladonacion-details,
    ladonacion-details[open]::part(summary) {
      background: var(--color-coolGray-100);
    }

    :host([dark]) ladonacion-details,
    :host([dark]) ladonacion-details[open]::part(summary) {
      background: var(--color-warmGray-800);
    }

    ladonacion-details::part(summary):hover {
      filter: brightness(95%);
    }

    :host([dark]) ladonacion-details:not([open])::part(summary):hover {
      background: var(--color-warmGray-700);
    }

    ladonacion-details[open] {
      box-shadow: 0 4px 6px -3px var(--color-warmGray-400);
    }

    :host([dark]) ladonacion-details[open] {
      box-shadow: 0 4px 6px -3px var(--color-black);
    }

    ladonacion-details[open] {
      margin-bottom: 2em;
    }

    ladonacion-details[open]::part(summary) {
      font-weight: 600;
    }

    ladonacion-details ladonacion-reference {
      margin-left: 0.25em;
      font-weight: 600;
      color: var(--color-yellow-700);
    }

    :host([dark]) ladonacion-details ladonacion-reference {
      color: var(--color-yellow-600);
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 1em 0 0 0;
      hyphens: auto;
    }

    li {
      padding-bottom: 1em;
    }

    figure {
      display: flex;
      align-items: flex-start;
      margin: 0;
    }

    figure > img {
      width: 120px;
      height: 90px;
      padding: 0 0.25em;
      margin-right: 1em;
      border: 1px solid var(--color-warmGray-300);
      background: var(--color-white);
      object-fit: cover;
    }

    a {
      display: block;
      font-weight: 500;
      text-decoration: none;
    }

    li:not(:last-of-type) a {
      padding-bottom: 1em;
      border-bottom: 1px solid var(--color-warmGray-200);
    }

    :host([dark]) li:not(:last-of-type) a {
      border-bottom: 1px solid var(--color-warmGray-700);
    }

    a time {
      display: block;
      color: var(--color-warmGray-400);
      font-size: 0.9em;
    }

    :host([dark]) a time {
      color: var(--color-warmGray-500);
    }

    a cite {
      font-size: 1.15em;
      font-style: normal;
      font-weight: 600;
      color: var(--color-warmGray-800);
    }

    :host([dark]) a cite {
      color: var(--color-warmGray-200);
    }

    a:hover cite {
      text-decoration: underline;
    }

    @media (max-width: 640px) {
      figure > img {
        display: none;
      }
    }
  </style>
  <div></div>
`

customElements.define(
  'ladonacion-citations',
  class extends HTMLElement {
    connectedCallback() {
      const subject = this.getAttribute('subject')
      const id = references.object(subject).id

      const relations = ((items) =>
        items
          .map((i) =>
            i.relations
              .filter((relation) => {
                return (
                  references.parse(relation.subject).id === id ||
                  references.parse(relation.object).id === id
                )
              })
              .map((relation) => ({
                context: references.build({
                  model: i.model,
                  id: i.id,
                }),
                ...relation,
              }))
          )
          .filter((items) => items.length)
          .flat())([
        ...data.articles.map((item) => ({ ...item, model: 'articles' })),
        ...data.documents.map((item) => ({ ...item, model: 'documents' })),
      ])

      const citations = [
        ...new Set(
          relations
            .reduce((accumulator, current) => {
              return [
                ...accumulator,
                relations.filter(
                  (relation) =>
                    relation.object === current.object &&
                    relation.subject === current.subject &&
                    relation.type === current.type
                ),
              ]
            }, [])
            .map((citation) => JSON.stringify(citation))
        ),
      ].map((citation) => JSON.parse(citation))

      this.shadowRoot.querySelector('div').innerHTML = citations
        .map((citation) => {
          const templates = references.object(citation[0].type).templates

          let phrase
          if (citation[0].subject === subject) {
            const predicate = templates.direct ?? templates
            const gender = references.object(subject).gender ?? 'male'
            phrase = {
              subject: citation[0].subject,
              object: citation[0].object,
              predicate: predicate[gender],
            }
          } else {
            const predicate = templates.reverse ?? templates
            const gender =
              references.object(citation[0].object).gender ?? 'male'
            phrase = {
              subject: citation[0].object,
              object: citation[0].subject,
              predicate: predicate[gender],
            }
          }

          return `
            <ladonacion-details>
              <span slot="summary">
                ${
                  phrase.predicate.charAt(0).toUpperCase() +
                  phrase.predicate.slice(1)
                }<!--
                  --><ladonacion-reference part="reference" ref="${
                    phrase.object
                  }"></ladonacion-reference>
              </span>
              <ul slot="contents">
                ${citation
                  .map((cite) => {
                    const source = references.object(cite.context)
                    return `
                      <li>
                        <a href="${references.link(cite.context)}">
                          <figure>
                            <img src="/resources/${
                              source.thumbnail
                            }" loading="lazy">
                            <figcaption>
                              <time datetime="${source.date}">
                                  ${new Date(source.date).toLocaleDateString(
                                    'es-ES',
                                    {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      timeZone: 'UTC',
                                    }
                                  )}
                              </time>
                              <cite>${source.title}</cite>
                            </figcaption>
                          </figure>
                        </a>
                      </li>`
                  })
                  .join('')}
              </ul>
            </ladonacion-details>`
        })
        .join('')
    }

    constructor() {
      super()

      const root = this.attachShadow({
        mode: 'open',
      })
      root.append(template.content.cloneNode(true))
    }
  }
)
