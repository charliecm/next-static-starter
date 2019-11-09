/**
 * Responsive Image
 * Provides helper functions to responsive images generated via:
 * `node build-image <image in /public/static/>`.
 */

import { toKebabCase } from '@utils/common'

/** Base image props. */
type Image = {
  src: string
  srcWebp?: string
  width: number
  height: number
}

/** For photos with responsive images. */
export type ResponsiveImage = {
  id?: string
  alt: string
  title?: string
  caption?: string
  sizes?: number[]
  color?: string
  hasWebp?: boolean
  hasPlaceholder?: boolean
  /** Generated. */
  placeholder?: string
  /** Generated. */
  srcSet?: string
  /** Generated. */
  srcSetWebp?: string
  /** Generated: list of all responsive images. */
  images?: { [key: number]: Image }
} & Image

/**
 * Returns additional data for a responsive image: Webp url, srcsets,
 * placeholder url and an array of data for each size.
 *
 * @param src Path to original image.
 * @param width Width of original image.
 * @param height Height of original image.
 * @param sizes Responsive image widths.
 * @param hasWebp If true, include Webp images.
 */
const getResponsiveData = (image: ResponsiveImage) => {
  const id = image.id || toKebabCase(image.title)
  const title = image.title
  const caption = image.caption
  const src = image.src
  const sizes = image.sizes
  const width = image.width
  const height = image.height
  const hasWebp = image.hasWebp || false
  const dot = src.lastIndexOf('.')
  const path = src.substring(0, dot)
  const ext = src.substring(dot, src.length)
  const srcWebp = hasWebp ? `${path}.webp` : null
  const placeholder = image.hasPlaceholder ? `${path}_placeholder${ext}` : null
  let srcSet = `${src} ${width}w`
  let srcSetWebp = `${srcWebp} ${width}w`
  let images: { [size: number]: Image } = {
    [width]: {
      src,
      srcWebp,
      width,
      height,
    },
  }

  sizes.forEach(size => {
    const url = `${path}_${size}${ext}`
    const urlWebp = `${path}_${size}.webp`
    srcSet += `, ${url} ${size}w`
    srcSetWebp += `, ${urlWebp} ${size}w`
    images[size] = {
      src: url,
      srcWebp: hasWebp ? urlWebp : null,
      width: size,
      height: (size / width) * height,
    }
  })

  return {
    ...image,
    id,
    srcWebp,
    srcSet,
    srcSetWebp: hasWebp ? srcSetWebp : null,
    placeholder,
  }
}

/**
 * Returns a manifest populated with extra responsive image data.
 *
 * @param images List of responsive images.
 */
const getManifest = (images: ResponsiveImage[]) => {
  return images.map(image => {
    return getResponsiveData(image)
  })
}

/**
 * Returns a manifest object populated with extra responsive image data with
 * `src` as key.
 *
 * @param images List of responsive images.
 */
const getManifestAsObj = (images: ResponsiveImage[]) => {
  let manifest = {}
  images.forEach(image => {
    manifest[image.id || image.src] = getResponsiveData(image)
  })
  return manifest
}

export { getResponsiveData, getManifest, getManifestAsObj }
