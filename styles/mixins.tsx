/**
 * Mixins
 * Functions that output shared styles.
 */

import { em, rem } from 'polished'
import * as theme from './theme'
import { TextScale, TextScaleDefault, TextSize, TextSizeDefault } from './theme'
import { getDropMargin, getTypeSizes } from './utils'

/**
 * Returns media query for viewports greater than the defined width.
 *
 * ```js
 * ${gt(theme.bp.tablet)} {}
 * ```
 *
 * @param width Breakpoint width.
 */
export const gt = (width: number) =>
  `@media only screen and (min-width: ${em(width)})`

/**
 * Returns media query for viewports less than the defined width.
 * @param width Breakpoint width.
 */
export const lt = (width: number) =>
  `@media only screen and (max-width: ${em(width)})`

/**
 * Returns size for specific font size and line height
 */
export const textSize = (
  scale: TextScale = TextScaleDefault,
  size: TextSize = TextSizeDefault
) => {
  const [fontSize, lineHeight] = getTypeSizes(scale, size)
  return `
    font-size: ${rem(fontSize)};
    line-height: ${rem(lineHeight)};
  `
}

/**
 * Returns responsive text style.
 * @param size Text size to use.
 * @param breakpoint Breakpoint before changing size.
 */
export const responsiveText = (
  size: TextSize = TextSizeDefault,
  breakpoint: number = theme.bp.largeText
) => {
  return `
      ${textSize(TextScale.Small, size)}
      ${gt(breakpoint)} {
        ${textSize(TextScale.Large, size)}
      }
    `
}

/**
 * Returns wrap style
 * @param width Wrap width. If set to `0`, wrap will be full-width.
 * @param paddings Horizontal padding preset.
 * @param align Self-alignment.
 * @param bp Breakpoint for using larger paddings.
 */
export const wrap = (
  width = 0,
  paddings: 'none' | 'safe-area' | 'page' = 'page',
  align: 'left' | 'center' | 'right' = 'center',
  bp: number = theme.bp.mediumLayout
) => {
  const safeAreaLeft = 'env(safe-area-inset-left)'
  const safeAreaRight = 'env(safe-area-inset-right)'
  const marginLeft = align === 'center' || align === 'right' ? 'auto' : ''
  const marginRight = align === 'center' || align === 'left' ? 'auto' : ''
  let paddingsSm = ''
  let paddingsLg = ''
  let maxWidthSm = ''
  let maxWidthLg = ''
  if (paddings === 'none') {
    if (width > 0) maxWidthSm = `max-width: ${rem(width)}`
  } else if (paddings === 'safe-area') {
    paddingsSm = `
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    `
    if (width > 0) {
      maxWidthSm = `
        max-width: ${rem(width)};
        max-width: calc(${rem(width)} + ${safeAreaLeft} + ${safeAreaRight});
      `
    }
  } else {
    const paddingSm = theme.spacing.pagePaddingSm
    const widthSm = width + paddingSm * 2
    paddingsSm = `
      padding-left: ${rem(paddingSm)};
      padding-right: ${rem(paddingSm)};
      padding-left: calc(${rem(paddingSm)} + ${safeAreaLeft});
      padding-right: calc(${rem(paddingSm)} + ${safeAreaRight});
    `
    if (width > 0) {
      maxWidthSm = `
        max-width: ${rem(widthSm)};
        max-width: calc(${rem(widthSm)} + ${safeAreaLeft} + ${safeAreaRight});
      `
    }

    const paddingLg = theme.spacing.pagePaddingLg
    const widthLg = width + paddingLg * 2
    paddingsLg = `
      padding-left: ${rem(paddingLg)};
      padding-right: ${rem(paddingLg)};
      padding-left: calc(${rem(paddingLg)} + ${safeAreaLeft});
      padding-right: calc(${rem(paddingLg)} + ${safeAreaRight});
    `
    if (width > 0) {
      maxWidthLg = `
        max-width: ${rem(widthLg)};
        max-width: calc(${rem(widthLg)} + ${safeAreaLeft} + ${safeAreaRight});
      `
    }
  }

  return `
    margin-left: ${marginLeft};
    margin-right: ${marginRight};
    ${paddingsSm}
    ${maxWidthSm}
    width: 100%;

    ${gt(bp)} {
      ${paddingsLg}
      ${maxWidthLg}
    }
  `
}

/**
 * Returns heading 1 style.
 */
export const h1 = () => `
  margin-bottom: ${rem(getDropMargin(TextScale.Small, 0.5))};
  font-family: ${theme.font.secondary.family};
  font-weight: ${theme.font.secondary.bold};
  ${responsiveText(TextSize.XLarge)}

  ${gt(theme.bp.largeText)} {
    margin-bottom: ${rem(getDropMargin(TextScale.Large, 0.5))};
  }
`

/**
 * Returns heading 2 style.
 */
export const h2 = () => `
  margin-bottom: ${rem(getDropMargin(TextScale.Small, 0.5))};
  font-family: ${theme.font.secondary.family};
  font-weight: ${theme.font.secondary.bold};
  ${responsiveText(TextSize.Large)}

  ${gt(theme.bp.largeText)} {
    margin-bottom: ${rem(getDropMargin(TextScale.Large, 0.5))};
  }
`

/**
 * Returns heading 3 style.
 */
export const h3 = () => `
  margin-bottom: ${rem(getDropMargin(TextScale.Small, 0.25))};
  font-weight: ${theme.font.primary.bold};
  ${responsiveText(TextSize.MediumHeading)}

  ${gt(theme.bp.largeText)} {
    margin-bottom: ${rem(getDropMargin(TextScale.Large, 0.25))};
  }
`
