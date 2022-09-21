/*
 * Takes an screenshot of the URL passed as an argument.
 *
 * It removes the ads and closes the cookie warning for the selected domains.
 * To be invoked from the command line by Node.js.
 *
 * Usage: node screennshot.js FILE URL
 */
const puppeteer = require('puppeteer')

if (process.argv.length !== 4) {
  console.log('Usage: node %s FILE URL', process.argv[1])
  process.exit()
}

const [, , filename, url] = process.argv

async function screenshot(filename, url, options) {
  const browser = await puppeteer.launch({
    headless: true,
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: options.width,
    height: options.height,
  })

  try {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 0,
    })
  } catch (exception) {
    console.error(`Error while taking an screenshot of ${url}\n`, exception)
    process.exit()
  }

  await page.evaluate((url) => {
    const payloads = {
      '^(https://)?(www\\.)?elconfidencial\\.com': () => {
        if (document.querySelector('button#didomi-notice-agree-button')) {
          document.querySelector('button#didomi-notice-agree-button').click()
        }
        document.querySelector('body').innerHTML += `
          <style>
            body.tp-modal-open { display: scroll !important; }
            div.tp-modal, div.tp-backdrop, div.skinRevenue { display: none; }
          </style>`
      },
      '^(https://)?(www\\.)?telegraph\\.co\\.uk': () => {
        document.querySelector('body').innerHTML += `
          <style>
            div#sp_message_container_330645, div#advert_tmg_ban,
            div.martech-hard-paywall-overlay { display: none; }
            div.martech-modal-component-overlay { display: none; }
            body.martech-overlay-not-visible { display: scroll !important; }
          </style>`
        document
          .querySelectorAll('iframe')
          .forEach((iframe) => (iframe.style.display = 'none'))
      },
      '^(https://)?(www\\.)?elespanol\\.com': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
        document.querySelector('div#megasuperior').style.display = 'none'
      },
      '^(https://)?(www\\.)?larazon\\.es': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
        document.querySelectorAll('.ad-background').forEach((ad) => ad.remove())
        document
          .querySelectorAll('.content__ad')
          .forEach((ad) => ad.setAttribute('hidden', true))
      },
      '^(https://)?(www\\.)?lesoir\\.be': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
      },
      '^(https://)?(www\\.)?dw\\.com': () => {
        document
          .querySelectorAll('.adsContainer')
          .forEach((ad) => ad.setAttribute('hidden', true))
        document
          .querySelectorAll('iframe')
          .forEach((iframe) => iframe.setAttribute('hidden', true))
      },
      '^(https://)?(www\\.)?thetimes\\.co\\.uk': () => {
        document
          .querySelectorAll('iframe')
          .forEach((iframe) => (iframe.style.display = 'none'))
        document
          .querySelector('div#paywall-portal-page-footer')
          .setAttribute('hidden', true)
      },
      '^(https://)?(www\\.)?bbc\\.com': () => {
        document.querySelector('button').click()
        document
          .querySelectorAll('*[aria-label*=Publicidad]')
          .forEach((e) => e.setAttribute('hidden', true))
      },
      '^(https://)?(www\\.)?sueddeutsche\\.de': () => {
        document
          .querySelectorAll('iframe')
          .forEach((iframe) => (iframe.style.display = 'none'))
        document.querySelector('html').classList.remove('sp-message-open')
        document.querySelector('div[id^=sp_message_container').remove()
      },
      '^(https://)?(www\\.)?tagesanzeiger\\.ch': () => {
        document.querySelector('button[data-context=YES]').click()
        document.querySelector(
          'div[class^=PageLayout_topaddesktop]'
        ).style.display = 'none'
        document
          .querySelectorAll('div[class^=Ad_]')
          .forEach((i) => (i.style.display = 'none'))
      },
      '^(https://)?(www\\.)?lavanguardia\\.com': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
        document.querySelector('header').innerHTML += `
          <style>
            body { overflow: scroll !important; position: relative !important }
            div.ev-open-modal-paywall-REQUIRE_LOGIN { display: none !important }
          </style>`
      },
      '^(https://)?(www\\.)?vozpopuli\\.com': () => {
        document
          .querySelector('div[class$=-summary-buttons] button[mode=primary]')
          .click()
      },
      '^(https://)?(www\\.)?eldiario\\.es': () => {
        document.querySelector('a.sibbo-cmp-button[data-accept-all]').click()
      },
      '^(https://)?(www\\.)?tdg\\.ch': () => {
        document.querySelector('button[data-qa=oil-YesButton]').click()
        document.querySelector('button[data-context=YES]').click()
        document.querySelector(
          'div[class^=PageLayout_topaddesktop]'
        ).style.display = 'none'
        document
          .querySelectorAll('div[class^=Ad_]')
          .forEach((i) => (i.style.display = 'none'))
        document.querySelector('header').innerHTML += `
          <style>
            div.o-overlay__horizontal-alignment { display: none }
            div.o-tamedia-wrapper { display: none }
          </style>`
      },
      '^(https://)?(www\\.)?huffingtonpost\\.es': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
        document.querySelector('body').innerHTML += `
          <style>
            div.newsletter-toaster__inner-container { display: none; }
            div.body-splash { display: none; }
          </style>`
      },
      '^(https://)?(www\\.)?elpais\\.com': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
        document.querySelector('header').innerHTML += `
          <style>
            div#paywallOfferSmall { display: none; }
          </style>`
      },
      '^(https://)?(www\\.)?elmundo\\.es': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
      },
      '^(https://)?(www\\.)?rtve\\.es': () => {
        document.querySelector('div#auxGPDR button#OK').click()
      },
      '^(https://)?(www\\.)?abc\\.es': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
      },
      '^(https://)?(www\\.)?20minutos\\.es': () => {
        document.querySelector('button#didomi-notice-agree-button').click()
      },
      '^(https://)?(www\\.)?bild\\.de': () => {
        document
          .querySelectorAll('iframe')
          .forEach((iframe) => (iframe.style.display = 'none'))
        document.querySelector('html').style.position = 'relative !important'
        document.querySelector('html').style.overflow = 'scroll !important'
        document.querySelector('div[id^=sp_message_container').remove()
      },
    }

    Object.entries(payloads).forEach(([regex, payload]) => {
      if (url.match(new RegExp(regex, 'i'))) {
        payload()
      }
    })
  }, url)

  await page.screenshot({
    path: filename,
    fullPage: options.fullPage,
  })

  await browser.close()
}

screenshot(process.argv[2], process.argv[3], {
  width: 1280,
  height: 800,
  fullPage: true,
})
