/**
 * Build Sitemap
 * Generates a sitemap.
 * https://www.npmjs.com/package/sitemap
 */

const fs = require('fs')
const chalk = require('chalk')
const sm = require('sitemap')
const config = require('./config')
const manifest = require('./manifest.json')

const SITEMAP_PATH = './public/sitemap.xml'

const sitemap = sm.createSitemap({
  hostname: config.BASE_URL,
  urls: manifest
    .filter(page => !page.isDraft)
    .map(page => {
      return {
        url: page.url,
      }
    }),
})

const output = sitemap
  .toString()
  .replace(
    ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"',
    ''
  )
fs.writeFileSync(SITEMAP_PATH, output)

console.log(chalk.green('Sitemap created:'), SITEMAP_PATH)
