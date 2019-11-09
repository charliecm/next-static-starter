/**
 * Design Tokens
 */

export const palette = {
  black: '#000',
  white: '#fff',
}

export const color = {
  textBody: palette.black,
  textInfo: palette.black,
  textPlaceholder: palette.black,

  anchor: palette.black,
  anchorHover: palette.black,

  codeHighlight: palette.black,
  selection: palette.black,
  androidThemeColor: palette.black,
}

export const font = {
  primary: {
    family: 'Arial, san-serif',
    regular: 400,
    bold: 700,
  },
  secondary: {
    family: 'Georgia, serif',
    regular: 400,
    bold: 700,
  },
  monospace: {
    family: 'Roboto Mono, Menlo, Consolas, monospace',
  },
}

export enum TextSize {
  XSmall,
  Small,
  Medium,
  MediumHeading,
  Large,
  XLarge,
}

export const TextSizeDefault = TextSize.Medium

export enum TextScale {
  Small,
  Large,
}

export const TextScaleDefault = TextScale.Small

export const typeSize = {
  [TextSize.XSmall]: {
    [TextScale.Small]: [12, 20],
    [TextScale.Large]: [12, 20],
  },
  [TextSize.Small]: {
    [TextScale.Small]: [14, 24],
    [TextScale.Large]: [16, 28],
  },
  [TextSize.Medium]: {
    [TextScale.Small]: [16, 28],
    [TextScale.Large]: [20, 32],
  },
  [TextSize.MediumHeading]: {
    [TextScale.Small]: [16, 24],
    [TextScale.Large]: [20, 28],
  },
  [TextSize.Large]: {
    [TextScale.Small]: [24, 32],
    [TextScale.Large]: [30, 40],
  },
  [TextSize.XLarge]: {
    [TextScale.Small]: [36, 48],
    [TextScale.Large]: [45, 60],
  },
}

export enum spacing {
  xsm = 4,
  sm = 8,
  md = 12,
  lg = 20,

  gutterSm = 12,
  gutterLg = 20,

  pagePaddingSm = 16,
  pagePaddingLg = 40,
}

export enum wrap {
  narrow = 480,
  normal = 600,
  wide = 960,
  mbp = 1280,
  hd = 1920,
}

export enum bp {
  smallLayout = 420,
  largeText = 540,
  mediumLayout = 768,
  largeLayout = 820,
}

export enum timing {
  short = '0.15s',
  medium = '0.3s',
}

export const style = {
  activeOffset: '1.5px',
}
