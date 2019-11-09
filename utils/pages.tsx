/**
 * Pages
 * Provides helper functions and a manifest for dealing with page metas.
 */

import manifest from '../manifest.json'

export type Meta = {
  /** Page title. */
  title: string
  /** Meta description. */
  description: string
  /** Meta keywords. */
  tags?: string[]

  /* GENERATED ON BUILD */

  /** If true, exclude from index. Files with _ prefix are marked as draft. */
  isDraft?: boolean
  /** Open Graph image. Checks for `/static/<path>/og.png`. */
  ogImage?: string
  /** Relative URL to page. */
  url?: string
  /** `title` in kebab-case. */
  id?: string
}

const all = manifest as Meta[]

/**
 * Returns page meta for URL.
 *
 * @param url Page URL.
 */
const getMeta = (url: string) => all.find(meta => meta.url === url)

/**
 * Returns a subset of pages that match the provided URL.
 *
 * @param url Base URL to match.
 */
const getSubset = (url: string) =>
  all.filter(meta => meta.url.startsWith(url) && !meta.isDraft)

/**
 * Returns pages that exist in the subset of the provided URL.
 *
 * @param url Page URL.
 */
const getCurrentSubset = (url: string) =>
  all.filter(
    meta =>
      meta.url.startsWith(url.substr(0, url.lastIndexOf('/'))) && !meta.isDraft
  )

/**
 * Returns the previous and next page.
 *
 * @param meta All pages.
 * @param url Page URL.
 */
const getSiblings = (meta: Meta[], url: string) => {
  const index = meta.findIndex(page => page.url === url)
  if (index === -1) {
    console.warn('Failed to find page in manifest:', url)
    return { prev: null, next: null }
  }
  return {
    prev: index + 1 <= meta.length ? meta[index + 1] : null,
    next: index - 1 >= 0 ? meta[index - 1] : null,
  }
}

/**
 * Returns relative path without hash.
 *
 * @param href Full URL.
 */
const getURL = (href: string) => {
  let hashIndex = href.indexOf('#')
  if (hashIndex !== -1 && href[hashIndex - 1] === '/') hashIndex -= 1
  return href
    .substring(0, hashIndex === -1 ? href.length : hashIndex)
    .replace(window.location.origin, '')
}

export { getMeta, getSubset, getCurrentSubset, getSiblings, getURL }
