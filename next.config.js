const fs = require('fs')
const path = require('path')
const glob = require('glob')
const withPlugins = require('next-compose-plugins')
const pages = require('./manifest.json')

const config = {
  pageExtensions: ['tsx'],
  exportTrailingSlash: true,
  exportPathMap: function() {
    const pagesDir = './pages'
    const pagesGlob = `${pagesDir}/**/[^_]*.tsx`
    const files = glob.sync(pagesGlob)
    let map = {}

    files.map(file => {
      const index = file.indexOf('/index')
      const end = index === -1 ? file.indexOf(path.extname(file)) : index
      const url = file.substring(pagesDir.length, end) || '/'
      map[url] = {
        page: url,
      }
    })

    console.log(map)
    return map
  },
  webpack: config => {
    // Add Modernizr (.modernizrrc)
    // https://www.npmjs.com/package/modernizr-loader
    // https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
    config.module.rules.push({
      test: /\.modernizrrc$/,
      loader: ['modernizr-loader', 'json-loader'],
    })
    config.resolve.alias['modernizr$'] = path.resolve(__dirname, '.modernizrrc')
    return config
  },
}

module.exports = withPlugins([], config)
