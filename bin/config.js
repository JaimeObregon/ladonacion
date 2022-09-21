require('json5/lib/register')

module.exports = {
  cache: {
    path: `${__dirname}/../tmp/cache`,
    ttl: 1000 * 60 * 60 * 24 * 365, // 365 days (in milliseconds)
  },
  fetch: {
    timeout: 10,
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:73.0) Gecko/20100101 Firefox/73.0',
  },
  subschemas: [
    require(`${__dirname}/../data/schemas/subschemas/country.json5`),
    require(`${__dirname}/../data/schemas/subschemas/language.json5`),
    require(`${__dirname}/../data/schemas/subschemas/gender.json5`),
    require(`${__dirname}/../data/schemas/subschemas/url.json5`),
    require(`${__dirname}/../data/schemas/subschemas/wikipedia.json5`),
    require(`${__dirname}/../data/schemas/subschemas/relation.json5`),
    require(`${__dirname}/../data/schemas/subschemas/picture.json5`),
  ],
  documents: [
    {
      name: 'sources',
      data: require(`${__dirname}/../data/sources.json5`),
      schema: require(`${__dirname}/../data/schemas/sources.json5`),
    },
    {
      name: 'relations',
      data: require(`${__dirname}/../data/relations.json5`),
      schema: require(`${__dirname}/../data/schemas/relations.json5`),
    },
    {
      name: 'documents',
      data: require(`${__dirname}/../data/documents.json5`),
      schema: require(`${__dirname}/../data/schemas/documents.json5`),
    },
    {
      name: 'entities',
      data: require(`${__dirname}/../data/entities.json5`),
      schema: require(`${__dirname}/../data/schemas/entities.json5`),
    },
    {
      name: 'places',
      data: require(`${__dirname}/../data/places.json5`),
      schema: require(`${__dirname}/../data/schemas/places.json5`),
    },
    {
      name: 'events',
      data: require(`${__dirname}/../data/events.json5`),
      schema: require(`${__dirname}/../data/schemas/events.json5`),
    },
    {
      name: 'persons',
      data: require(`${__dirname}/../data/persons.json5`),
      schema: require(`${__dirname}/../data/schemas/persons.json5`),
    },
    {
      name: 'articles',
      data: require(`${__dirname}/../data/articles.json5`),
      schema: require(`${__dirname}/../data/schemas/articles.json5`),
    },
  ],
  payloads: {
    elconfidencial: `
      document.querySelector('body').innerHTML += \`
        <style>
          body.tp-modal-open { overflow: scroll !important; }
          div.tp-modal, div.tp-backdrop, div.skinRevenue { display: none; }
        </style>\`
      setTimeout(() => {
        if (document.querySelector('button#didomi-notice-agree-button')) {
          document.querySelector('button#didomi-notice-agree-button').click()
        }
      }, 100)
    `,
    telegraph: `
      document.querySelector('body').innerHTML += \`
      <style>
        div#advert_tmg_ban, div.martech-hard-paywall-overlay { display: none; }
        div.martech-modal-component-overlay { display: none; }
        body.martech-overlay-not-visible { overflow: scroll !important; }
      </style>\`
      document.querySelectorAll('iframe').forEach(iframe => iframe.style.display = 'none')
      document.querySelector('div#sp_message_container_330645').style.display = 'none'
    `,
    elespanol: `
      document.querySelector('button#didomi-notice-agree-button').click()
      document.querySelector('div#megasuperior').style.display = 'none'
    `,
    larazon: `
      document.querySelector('button#didomi-notice-agree-button').click()
      document.querySelectorAll('.ad-background').forEach(ad => ad.remove())
      document.querySelectorAll('.content__ad').forEach(ad => ad.setAttribute('hidden', true))
    `,
    lesoir: `
      document.querySelector('button#didomi-notice-agree-button').click()
    `,
    dw: `
      document.querySelectorAll('.adsContainer').forEach(ad => ad.setAttribute('hidden', true))
      document.querySelectorAll('iframe').forEach(iframe => iframe.setAttribute('hidden', true))
    `,
    thetimes: `
      document.querySelectorAll('iframe').forEach(iframe => iframe.style.display = 'none')
      document.querySelector('div#paywall-portal-page-footer').setAttribute('hidden', true)
      document.querySelector('html').classList.remove('sp-message-open')
    `,
    bbc: `
      document.querySelector('button').click()
      document.querySelectorAll('*[aria-label*=Publicidad]').forEach(e => e.setAttribute('hidden', true))
    `,
    sueddeutsche: `
      document.querySelectorAll('iframe').forEach(iframe => iframe.style.display = 'none')
      document.querySelector('html').classList.remove('sp-message-open')
      document.querySelector('div[id^=sp_message_container').remove()
    `,
    tagesanzeiger: `
      if (document.querySelector('button[data-context=YES]')) {
        document.querySelector('button[data-context=YES]').click()
      }
      document.querySelector('div[class^=PageLayout_topaddesktop]').style.display = 'none'
      document.querySelectorAll('div[class^=Ad_]').forEach(i => i.style.display = 'none')
      document.querySelector('body').classList.remove('h-disable-scroll')
      document.querySelector('header').innerHTML += \`
        <style>
          div.o-overlay__horizontal-alignment { display: none }
          div.o-tamedia-wrapper { display: none }
        </style>\`
    `,
    lavanguardia: `
      document.querySelector('button#didomi-notice-agree-button').click()
      document.querySelector('header').innerHTML += \`
        <style>
          body { overflow: scroll !important; position: relative !important }
          div.ev-open-modal-paywall-REQUIRE_LOGIN { display: none !important }
        </style>\`
    `,
    vozpopuli: `
      document.querySelector('div[class$=-summary-buttons] button[mode=primary]').click()
    `,
    eldiario: `
      document.querySelector('a.sibbo-cmp-button[data-accept-all]').click()
    `,
    nyt: `
      document.querySelector('button[data-testid=GDPR-accept]').click()
      document.querySelectorAll('iframe').forEach(iframe => iframe.style.display = 'none')
    `,
    nius: `
      document.querySelector('button#didomi-notice-agree-button').click()
    `,
    tdg: `
      document.querySelector('button[data-qa=oil-YesButton]').click()
      if (document.querySelector('button[data-context=YES]')) {
        document.querySelector('button[data-context=YES]').click()
      }
      document.querySelector('div[class^=PageLayout_topaddesktop]').style.display = 'none'
      document.querySelectorAll('div[class^=Ad_]').forEach(i => i.style.display = 'none')
      document.querySelector('html').classList.remove('h-disable-scroll')
      document.querySelector('header').innerHTML += \`
        <style>
          div.o-overlay__horizontal-alignment { display: none }
          div.o-tamedia-wrapper { display: none }
        </style>\`
    `,
    huffingtonpost: `
      document.querySelector('button#didomi-notice-agree-button').click()
      document.querySelector('body').innerHTML += \`
        <style>
          div.newsletter-toaster__inner-container { display: none; }
          div.body-splash { display: none; }
        </style>\`
    `,
    elpais: `
      document.querySelector('button#didomi-notice-agree-button').click()
      document.querySelector('header').innerHTML += \`
        <style>
          div#paywallOfferSmall { display: none; }
        </style>\`
    `,
    elmundo: `
      document.querySelector('button#didomi-notice-agree-button').click()
    `,
    rtve: `
      document.querySelector('div#auxGPDR button#OK').click()
    `,
    abc: `
      document.querySelector('button#didomi-notice-agree-button').click()
    `,
    '20minutos': `
      document.querySelector('button#didomi-notice-agree-button').click()
      document.querySelectorAll('div[id^=axds]').forEach(div => div.style.display = 'none')
    `,
    bild: `
      document.querySelectorAll('iframe').forEach(iframe => iframe.style.display = 'none')
      document.querySelector('html').style.position = 'relative !important'
      document.querySelector('html').style.overflow = 'scroll !important'
      document.querySelector('div[id^=sp_message_container').remove()
      document.querySelector('html').classList.remove('sp-message-open')
    `,
    ft: `
      if (document.querySelector('a.o-cookie-message__button')) {
        document.querySelector('a.o-cookie-message__button').click()
      }
    `,
    lastampa: `
      if (document.querySelector('button.iubenda-cs-accept-btn').click()) {
        document.querySelector('button.iubenda-cs-accept-btn').click()
      }
    `,
    casareal: ``,
    boe: ``,
    okdiario: `
      if (document.querySelector('button#didomi-notice-agree-button')) {
        document.querySelector('button#didomi-notice-agree-button').click()
      }
      if (document.querySelector('button#onesignal-slidedown-cancel-button')) {
        document.querySelector('button#onesignal-slidedown-cancel-button').click()
      }
      document.querySelectorAll('*[id^=google_ads]').forEach(element => element.style.display = 'none')
      document.querySelectorAll('iframe').forEach(element => element.style.display = 'none')
      document.querySelector('div#tbl-next-up').style.display = 'none'
    `,
  },
}
