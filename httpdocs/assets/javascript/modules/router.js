export const router = {
  init: function (routes = []) {
    this.routes = routes
  },

  error: async () => {
    const response = await fetch(`/error.html`)
    const content = await response.text()
    document.body.innerHTML = content
    document.head.innerHTML = `
      <style>
        ${document.body.querySelector('style').innerText}
      </style>
    `
    document.body.querySelector('style').remove()
    document.title = 'Error'
    return false
  },

  dispatch: async function (path) {
    const rule = this.routes.find((route) => path.match(route.regex))
    if (!rule) {
      return this.error()
    }

    const pages = [...document.querySelectorAll('body > *')].filter((element) =>
      element.tagName.match(/^PAGE-/)
    )

    pages
      .find((page) => !page.hidden)
      ?.dispatchEvent(
        new Event('deactivate', {
          bubbles: true,
        })
      )

    const slug = rule.page
    let component = document.querySelector(`page-${slug}`)

    pages.forEach((component) => {
      component.toggleAttribute(
        'hidden',
        component.tagName.toLowerCase() !== `page-${slug}`
      )
    })

    if (!component) {
      document.addEventListener(
        'ready',
        () => {
          component.dispatchEvent(new Event('activate', { bubbles: true }))
        },
        { once: true }
      )

      rule.payload()
      component = document.createElement(`page-${slug}`)
      document.body.append(component)
    } else {
      component.dispatchEvent(new Event('activate', { bubbles: true }))
    }
  },
}
