const capture = require('capture-website')
const jsonschema = require('jsonschema')
const fetch = require('node-fetch')
const mime = require('mime-types')
const globby = require('globby')
const cache = require('cacache')
const util = require('util')
const cpy = require('cpy')
const fs = require('fs')
const gm = require('gm')

cache.fetch = async (key, callback) => {
  const info = await cache.get.info(config.cache.path, key)

  let fresh = false
  if (info) {
    const response = await cache.get(config.cache.path, key)
    const now = new Date().getTime()
    fresh = now - info.time < config.cache.ttl
  }

  if (!info || !fresh) {
    const result = await callback()
    if (result) {
      await cache.put(config.cache.path, key, result)
    }
  }

  return await cache.get.info(config.cache.path, key)
}

cache.remove = (regex) =>
  cache.ls(config.cache.path).then((items) => {
    const matches = Object.values(items).filter((item) => item.key.match(regex))
    matches.forEach((match) => cache.rm.entry(config.cache.path, match.key))
  })

cpy.copy = (source, target) => {
  try {
    fs.unlinkSync(
      `${directories.target}/${target.replace(`${directories.target}/`, '')}`
    )
  } catch {}
  cpy(source, directories.target, {
    rename: target.replace(`${directories.target}/`, ''),
  })
}

const catalog = {
  semanticErrors: [],
  screenshots: [],
  thumbnails: [],
  references: [],
  ids: [],
  files: [],
}

const directories = {
  source: `${__dirname}/../data`,
  target: `${__dirname}/../httpdocs/resources`,
}

const config = {
  makeThumbnails: async (items) => {
    for (const item of items) {
      item.file = `${directories.source}/${item.file}`
      const info = await cache.fetch(`thumbnails:${item.file}`, async () => {
        console.log(`Making thumbnail of ${item.file}...`)
        return await new Promise((resolve, reject) =>
          gm(`${item.file}[0]`)
            .flatten()
            .density(300, 300)
            .resize(640)
            .crop(640, 400, 0, 0)
            .quality(75)
            .toBuffer('JPG', (error, buffer) => {
              if (error) {
                reject(error)
              }

              // https://github.com/aheckmann/gm/issues/654#issuecomment-773560480
              const start = buffer.indexOf('FFD8FF', 0, 'hex')
              const thumbnail = buffer.slice(start)
              resolve(Buffer.from(thumbnail, 'binary'))
            })
        )
      })

      cpy.copy(info.path, item.thumbnail)
    }
  },
  takeScreenshots: async (items) => {
    for (const item of items) {
      const screenshotInfo = await cache.fetch(
        `screenshots:${item.url}`,
        async () => {
          console.log(`Taking screenshot of ${item.url}...`)
          return await capture.buffer(item.url, {
            width: 1280,
            height: 800,
            fullPage: true,
            timeout: 180,
            modules: [config.payloads[item.source]],
          })
        }
      )

      const optimizedInfo = await cache.fetch(
        `optimized:${item.url}`,
        async () => {
          console.log(`Optimizing ${item.url}...`)
          return await new Promise((resolve, reject) =>
            gm(screenshotInfo.path)
              .resize(1280)
              .quality(75)
              .toBuffer('JPG', (error, thumbnail) => {
                if (error) {
                  reject(error)
                }
                resolve(Buffer.from(thumbnail, 'binary'))
              })
          )
        }
      )

      cpy.copy(optimizedInfo.path, item.screenshot)

      const thumbnailInfo = await cache.fetch(
        `thumbnails:${item.url}`,
        async () => {
          console.log(`Making thumbnail of ${screenshotInfo.path}...`)
          return await new Promise((resolve, reject) =>
            gm(screenshotInfo.path)
              .trim()
              .resize(640)
              .crop(640, 400, 0, 0)
              .quality(75)
              .toBuffer('JPG', (error, thumbnail) => {
                if (error) {
                  reject(error)
                }
                resolve(Buffer.from(thumbnail, 'binary'))
              })
          )
        }
      )

      cpy.copy(thumbnailInfo.path, item.thumbnail)
    }
  },
  validateURL: async (instance, schema, options, context) => {
    await cache.fetch(`responses:${instance}`, async () => {
      // Needed to fetch https://www.ohl.es
      // See https://stackoverflow.com/a/21961005
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

      console.log(`Fetching ${instance}...`)
      const response = await fetch(instance, {
        headers: config.fetch,
      })

      if (response.ok) {
        const body = await response.text()
        return JSON.stringify(body)
      }

      const result = new jsonschema.ValidatorResult(
        instance,
        schema,
        options,
        context
      )
      result.addError(response.statusText)
      catalog.semanticErrors.push(result.errors)
      return false
    })
  },
  hooks: [
    {
      schema: '/articles/article',
      func: function takeScreenshot(article) {
        const screenshot = `articles/screenshots/${article.id}.jpg`
        const thumbnail = `articles/thumbnails/${article.id}.jpg`
        const [, source] = article.source.match(/^#\/sources\/(.+)$/)

        catalog.screenshots.push({
          url: article.url,
          source,
          screenshot: `${directories.target}/${screenshot}`,
          thumbnail: `${directories.target}/${thumbnail}`,
        })

        return {
          ...article,
          screenshot,
          thumbnail,
        }
      },
    },
    {
      schema: '/articles/article',
      func: function validateOrigin(instance, schema, options, context) {
        const [, id] = instance.source.match(/^#\/sources\/(.+)$/)
        const origin = config.documents
          .find((document) => document.name === 'sources')
          .data.find((source) => source.id === id).origin
        if (!new RegExp(origin).test(instance.url)) {
          const result = new jsonschema.ValidatorResult(
            instance,
            schema,
            options,
            context
          )
          result.addError('Unknown origin')
          catalog.semanticErrors.push(result.errors)
        }
        return instance
      },
    },
    {
      schema: '/documents/document',
      func: function makeThumbnail(document) {
        const thumbnail = `documents/thumbnails/${document.id}.jpg`

        catalog.thumbnails.push({
          file: document.file.replace(/^file:/, `${directories.source}/`),
          thumbnail: `${directories.target}/${thumbnail}`,
        })

        return {
          ...document,
          thumbnail,
        }
      },
    },
    {
      schema: '/relation',
      func: function validateRelation(instance, schema, options, context) {
        const { subject, object } = instance
        const [, type] = instance.type.match(/^#\/relations\/(.+)$/)
        const relation = config.documents
          .find((document) => document.name === 'relations')
          .data.find((relation) => relation.id === type)

        const regex = `^#/(${config.documents
          .map((document) => document.name)
          .join('|')})/(.+)$`

        const validSubject = relation.subjects.includes(subject.match(regex)[1])
        const validObject = relation.objects.includes(object.match(regex)[1])
        if (!validObject || !validSubject) {
          const result = new jsonschema.ValidatorResult(
            instance,
            schema,
            options,
            context
          )
          result.addError(validObject ? 'Illegal subject' : 'Illegal object')
          catalog.semanticErrors.push(result.errors)
        }

        return instance
      },
    },
    {
      schema: '/articles/article',
      func: (article) => ({
        ...article,
        metadata: {
          title: article.title.replace(/<[^>]*>?/gm, ''),
          description: `Noticia publicada en ${
            config.documents
              .find((document) => document.name === 'sources')
              .data.find(
                (item) =>
                  item.id === article.source.match(/^#\/sources\/(.+)$/)[1]
              ).name
          } el ${new Date(article.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}.`,
          image: `https://ladonacion.es/resources/${article.thumbnail}`,
        },
      }),
    },
    {
      schema: '/documents/document',
      func: (document) => ({
        ...document,
        metadata: {
          title: document.title.replace(/<[^>]*>?/gm, ''),
          description: document.description.replace(/<[^>]*>?/gm, ''),
          image: `https://ladonacion.es/resources/${document.thumbnail}`,
        },
      }),
    },
    {
      schema: '/entities/entity',
      func: (entity) => ({
        ...entity,
        metadata: {
          title: entity.title.replace(/<[^>]*>?/gm, ''),
          description: entity.description.replace(/<[^>]*>?/gm, ''),
          image: `https://ladonacion.es/resources/${entity.avatar}`,
        },
      }),
    },
    {
      schema: '/events/event',
      func: (event) => ({
        ...event,
        metadata: {
          title: event.title.replace(/<[^>]*>?/gm, ''),
          description: event.description.replace(/<[^>]*>?/gm, ''),
          image: `https://ladonacion.es/assets/images/cronologia.jpg`,
        },
      }),
    },
    {
      schema: '/persons/person',
      func: (person) => ({
        ...person,
        metadata: {
          title: person.title.replace(/<[^>]*>?/gm, ''),
          description: person.description.replace(/<[^>]*>?/gm, ''),
          image: `https://ladonacion.es/resources/${person.avatar}`,
        },
      }),
    },
    {
      schema: '/places/place',
      func: (place) => ({
        ...place,
        metadata: {
          title: place.title.replace(/<[^>]*>?/gm, ''),
          description: place.description.replace(/<[^>]*>?/gm, ''),
          image: `https://ladonacion.es/assets/images/mapa.jpg`,
        },
      }),
    },
  ],
  customKeywords: {
    validate: (instance, schema, options, context) => {
      if (schema.format === 'date' && typeof instance === 'string') {
        const date = new Date(instance)
        if (!(date instanceof Date && !isNaN(date))) {
          return 'Invalid date'
        }

        const now = new Date()
        const epoch = new Date('1920-01-01')
        if (date > now) {
          return 'Date is in the future'
        } else if (date < epoch) {
          return 'Date is too old'
        }
        return
      }
      if (schema.format === 'uri' && typeof instance === 'string') {
        if (
          !new jsonschema.Validator().validate(instance, schema).errors.length
        ) {
          config.validateURL(instance, schema, options, context)
        }
        return
      }
    },
  },
  customFormats: {
    file: (value) => {
      if (!value.match(/^file:/)) {
        return false
      }

      const file = value.replace(/^file:/, `${directories.source}/`)
      if (!fs.existsSync(file)) {
        return false
      }

      catalog.files.push(value)

      const type = mime.lookup(file)
      const extensions = mime.extensions[type]
      const [, extension] = file.match(/.+\.(.+)$/)
      return extensions.includes(extension)
    },
    reference: (value) => {
      if (typeof value !== 'string') {
        return
      }

      const regex = `^#/(${config.documents
        .map((document) => document.name)
        .join('|')})/(.+)$`
      if (!value.match(new RegExp(regex))) {
        return false
      }
      const [, model, id] = value.match(new RegExp(regex))
      if (!model || !id) {
        return false
      }

      catalog.references.push({
        value,
        model,
        id,
      })

      const document = config.documents.find(
        (document) => document.name === model
      )
      return document.data.find((item) => item.id === id)
    },
    id: (value) => {
      const ids = config.documents
        .map((document) => {
          return document.data.filter((item) => item.id === value)
        })
        .flat()

      if (ids.length !== 1) {
        return false
      }

      catalog.ids.push(value)
      return true
    },
  },
  ...require('./config.js'),
}

const validator = new jsonschema.Validator()
config.subschemas.forEach((schema) => validator.addSchema(schema))

validator.customFormats = config.customFormats
validator.attributes.validate = config.customKeywords.validate

const validationErrors = config.documents
  .map(
    (document) =>
      validator.validate(document.data, document.schema, {
        rewrite: (instance, schema, options, context) => {
          const hooks = config.hooks.filter(
            (callback) => callback.schema === schema.id
          )
          hooks.forEach(
            (callback) =>
              (instance = callback.func(instance, schema, options, context))
          )

          if (instance && schema.format === 'file') {
            return instance.replace(/^file:/, '')
          }

          if (
            instance &&
            schema.type === 'string' &&
            !schema.format &&
            !schema.id
          ) {
            const regex = `=["'](#/(${config.documents
              .map((document) => document.name)
              .join('|')})/(.+?))["']`
            const matches = instance.match(new RegExp(regex, 'g'))
            if (matches) {
              matches.forEach((match) => {
                const [, reference] = match.match(new RegExp(regex))
                validator
                  .validate(reference, {
                    type: 'string',
                    format: 'reference',
                  })
                  .errors.forEach((error) => catalog.semanticErrors.push(error))
              })
            }
          }

          return instance
        },
      }).errors
  )
  .filter((errors) => errors.length)

config.makeThumbnails(catalog.thumbnails)
config.takeScreenshots(catalog.screenshots)

const results = Object.fromEntries(
  config.documents.map((document) => [document.name, document.data])
)

const contents = `export const data = ${JSON.stringify(results)}`
fs.writeFile(`${directories.target}/ladonacion.js`, contents, (error) => {
  if (error) {
    console.error(error)
  }
})

const files = catalog.files.map((file) => file.replace(/^file:/, ''))
cpy(files, directories.target, {
  parents: true,
  cwd: directories.source,
})

const output = {
  stats: Object.keys(results).map((model) => ({
    [model]: config.documents.find((document) => document.name === model).data
      .length,
  })),
  unused: catalog.ids
    .filter(
      (id) =>
        config.documents
          .filter(
            (document) => !['articles', 'documents'].includes(document.name)
          )
          .filter((document) => document.data.find((item) => item.id === id))
          .length
    )
    .filter(
      (id) =>
        !catalog.references.filter((reference) => reference.id === id).length
    ),
  errors: [...validationErrors, ...catalog.semanticErrors],
}

;(async () => {
  const exceptions = [
    `!${directories.source}/*.json5`,
    `!${directories.source}/schemas/**/*.json5`,
    `!${directories.target}/ladonacion.js`,
  ]
  const files = await globby([
    `${directories.source}/**`,
    `${directories.target}/**`,
    ...exceptions,
  ])

  const expected = [
    ...catalog.screenshots.map((file) => file.screenshot),
    ...catalog.screenshots.map((file) => file.thumbnail),
    ...catalog.thumbnails.map((file) => file.thumbnail),
    ...catalog.files.map((file) =>
      file.replace(/^file:/, `${directories.target}/`)
    ),
    ...catalog.files.map((file) =>
      file.replace(/^file:/, `${directories.source}/`)
    ),
  ]

  const orphans = files.filter((file) => !expected.includes(file))
  output.orphans = orphans

  console.log(
    util.inspect(output, {
      depth: null,
      colors: true,
      maxArrayLength: null,
    })
  )
})()
