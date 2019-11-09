/**
 * Build Manifest
 * Generates a list of metadata for all pages with `meta` prop.
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chokidar = require('chokidar')
const chalk = require('chalk')
const isPost = require('./config').isPost

require('@babel/register')({
  extensions: ['.tsx'],
})

const DEV = process.env.NODE_ENV === 'development'
const LOG_PREFIX = `[ ${chalk.magenta('manifest')} ]`
const PAGES_DIR = './pages'
const PAGES_GLOB = `${PAGES_DIR}/**/*.tsx`
const MANIFEST_PATH = './manifest.json'

/**
 * Returns string in kebab-case.
 * https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2870157
 */
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

async function buildManifest(changedFile) {
  const files = glob.sync(PAGES_GLOB)
  const data = []

  await Promise.all(
    files.map(async file => {
      if (file.endsWith('_document.tsx') || file.endsWith('_app.tsx')) return
      delete require.cache[require.resolve(file)] // http://derpturkey.com/reload-module-with-node-js-require/
      const mod = await require(file)
      if (!mod || !mod.meta) return
      let meta = mod.meta
      const index = file.indexOf('/index')
      const ext = path.extname(file)
      const end = index === -1 ? file.indexOf(ext) : index
      const basename = path.basename(file, ext)
      const isDraft = basename.charAt(0) === '_'
      const id = toKebabCase(basename.substr(isDraft ? 1 : 0))
      let url = file.substring(PAGES_DIR.length, end)
      url = url === '' ? '/' : url
      let missingFields = []

      // See `Meta` type in `utils/pages.tsx`
      let ogImage = meta.ogImage || path.join('static', url, 'og.png')
      if (fs.existsSync(path.join('public', ogImage))) {
        meta.ogImage = '/' + ogImage
      } else {
        missingFields.push('ogImage' + (ogImage ? ` (${ogImage})` : ''))
      }

      if (
        missingFields.length &&
        // Show warnings for changed file only during watch
        (changedFile ? path.relative(__dirname, file) === changedFile : true)
      )
        console.log(
          LOG_PREFIX,
          chalk.yellow(`Missing fields for ${url}:`),
          missingFields.join(', ')
        )

      data.push({
        id,
        url,
        isDraft,
        ...meta,
      })
    })
  )

  // Sort pages by date
  data.sort((a, b) => {
    return new Date(b.date || 0) - new Date(a.date || 0)
  })

  // Write to file
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(data))
  console.log(LOG_PREFIX, chalk.green('Created:'), MANIFEST_PATH)
}

buildManifest()

if (DEV) {
  // Rebuild manifest on changes
  // FIXME: Watch stops on failure.
  chokidar
    .watch(PAGES_GLOB, {
      ignoreInitial: true,
    })
    .on('change', buildManifest)
    .on('add', buildManifest)
  console.log(LOG_PREFIX, 'Watching for changes...')
}
