/**
 * Build Images
 * Generates responsive images and output data for consumption in `photos.tsx`:
 * `<path>_<size>.jpg`
 * `<path>_<size>.webp`
 * `<path>_placeholder.jpg`
 *
 * Options:
 * `-d` Outputs data and copy to clipboard without generating images.
 * `-w` Outputs Webp images (off by default).
 */

const process = require('process')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const chalk = require('chalk')
const clipboardy = require('clipboardy')
const Vibrant = require('node-vibrant')

const SIZES = [360, 750, 1280, 1920, 2560]

// Check for flags and extract inputs
let dataOnly = false
let includeWebp = false
let includePlaceholder = false
const inputs = process.argv.slice(2).filter(arg => {
  if (arg === '-d') {
    dataOnly = true
    return false
  }
  if (arg === '-w') {
    includeWebp = true
    return false
  }
  if (arg === '-p') {
    includePlaceholder = true
    return false
  }
  return true
})

inputs.forEach(async input => {
  const ext = path.extname(input)
  const output = path.relative(
    process.cwd(),
    path.join(path.dirname(input), path.basename(input, ext))
  )

  // Retrieve image data
  const info = await sharp(input).metadata()

  if (info.format !== 'jpeg') {
    // TODO: Support PNG
    throw Error(`Currently not supporting non-JPG images: ${output}`)
    return
  }

  const sizes = SIZES.filter(size => size < info.width)
  const outWebp = `${output}.webp`
  const outPlaceholder = `${output}_placeholder${ext}`
  const palette = await Vibrant.from(input).getPalette()

  let data = {
    src: '/' + output + ext,
    sizes,
    width: info.width,
    height: info.height,
    color: palette.Vibrant.getHex(),
  }

  if (!dataOnly) {
    if (includePlaceholder) {
      // Save lqip placeholder image
      data.hasPlaceholder = true
      sharp(input)
        .resize(20)
        .toFile(outPlaceholder, err => {
          if (err) {
            throw Error(`Failed to save placeholder: ${input}`)
            return
          }
          console.log(chalk.green('Created:'), path.basename(outPlaceholder))
        })
    }
    if (includeWebp) {
      // Save Webp image
      data.hasWebp = true
      sharp(input).toFile(outWebp, err => {
        if (err) {
          throw Error(`Failed to save as webp: ${input}`)
          return
        }
        console.log(chalk.green('Created:'), path.basename(outWebp))
      })
    }
  }

  sizes.forEach(size => {
    const outResize = `${output}_${size}${ext}`
    const outResizeWebp = `${output}_${size}.webp`

    // Save reszied image
    if (dataOnly) return
    sharp(input)
      .resize(size)
      .jpeg({
        quality: 100,
      })
      .toFile(outResize, err => {
        if (err) {
          throw Error(`Failed to resize (${size}): ${input}`)
          return
        }
        console.log(chalk.green('Created:'), path.basename(outResize))
      })
    if (includeWebp) {
      // Save resized Webp image
      sharp(input)
        .resize(size)
        .webp({
          quality: 100,
        })
        .toFile(outResizeWebp, err => {
          if (err) {
            throw Error(`Failed to resize (${size}) as webp: ${input}`)
            return
          }
          console.log(chalk.green('Created:'), path.basename(outResizeWebp))
        })
    }
  })

  // Copy and output props
  // TODO: Copy data for multiple inputs.
  const dataJSON = JSON.stringify(data)
  clipboardy.writeSync(dataJSON.substr(1, dataJSON.length - 2))
  console.log(chalk.blue('Image Data (copied to clipboard):\n'), data, '\n')
})
