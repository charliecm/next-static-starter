/**
 * Utility Functions for Styles
 */

import {
  TextSize,
  TextSizeDefault,
  TextScale,
  TextScaleDefault,
  typeSize,
} from './theme'

/**
 * Returns font size and line height at specified size and scale.
 */
export const getTypeSizes = (
  scale: TextScale = TextScaleDefault,
  size: TextSize = TextSizeDefault
) => typeSize[size][scale]

/**
 * Returns font size at specified size and scale.
 */
export const getFontSize = (
  scale: TextScale = TextScaleDefault,
  size: TextSize = TextSizeDefault
) => getTypeSizes(scale, size)[0]

/**
 * Returns line height at specified size and scale.
 */
export const getLineHeight = (
  scale: TextScale = TextScaleDefault,
  size: TextSize = TextSizeDefault
) => getTypeSizes(scale, size)[1]

/**
 * Returns drop margin for consistent vertical rhythm.
 */
export const getDropMargin = (
  textScale: TextScale = TextScaleDefault,
  scale: number = 1
) => getLineHeight(textScale, TextSizeDefault) * scale
