/**
 * Content Block Styles
 * Provides article content formatting through `className="content"`.
 */

import { rem } from 'polished'
import { css } from 'styled-components'
import { gt, h1, h2, h3, responsiveText } from './mixins'
import * as theme from './theme'
import { TextScale, TextSize } from './theme'
import { getDropMargin } from './utils'

const listPaddingSm = 32
const listPaddingLg = 56
const listULOffset = 8
const listIndentSm = 8
const listIndentLg = 16

export default css`
  .content {
    /* Block */
    p,
    blockquote,
    figure {
      margin-bottom: ${rem(getDropMargin(TextScale.Small, 1))};
      ${responsiveText(TextSize.Medium)}

      ${gt(theme.bp.largeText)} {
        margin-bottom: ${rem(getDropMargin(TextScale.Large, 1))};
      }
    }

    /* List */
    ul,
    ol {
      margin-bottom: ${rem(getDropMargin(TextScale.Small, 1))};
      ${responsiveText(TextSize.Medium)}

      li {
        margin-bottom: ${rem(getDropMargin(TextScale.Small, 0.5))};
      }

      ${gt(theme.bp.largeText)} {
        margin-bottom: ${rem(getDropMargin(TextScale.Large, 1))};

        li {
          margin-bottom: ${rem(getDropMargin(TextScale.Large, 0.5))};
        }
      }
    }

    /* Add large spacing between items */
    ul.large,
    ol.large {
      li {
        margin-bottom: ${rem(getDropMargin(TextScale.Small, 1))};
      }

      ${gt(theme.bp.largeText)} {
        li {
          margin-bottom: ${rem(getDropMargin(TextScale.Large, 1))};
        }
      }
    }

    /* Unordered list */
    /* TODO: Nested list styles. */
    ul {
      list-style-type: disc;
      padding-left: ${rem(listPaddingSm - listIndentSm + listULOffset)};

      li {
        padding-left: ${rem(listIndentSm - listULOffset)};
      }

      ${gt(theme.bp.largeText)} {
        padding-left: ${rem(listPaddingLg - listIndentLg + listULOffset)};

        li {
          padding-left: ${rem(listIndentLg - listULOffset)};
        }
      }
    }

    /* Ordered list */
    ol {
      counter-reset: item;
      padding-left: ${rem(listPaddingSm)};

      li {
        counter-increment: item;
      }

      li::before {
        content: counter(item) '.';
        display: inline-block;
        position: absolute;
        margin-top: ${rem(-2)};
        margin-left: ${rem(-listPaddingSm)};
        padding-right: ${rem(listIndentSm)};
        width: ${rem(listPaddingSm)};
        font-family: ${theme.font.secondary.family};
        font-weight: ${theme.font.secondary.bold};
        text-align: right;
      }

      ${gt(theme.bp.largeText)} {
        padding-left: ${rem(listPaddingLg)};

        li::before {
          margin-left: ${rem(-listPaddingLg)};
          padding-right: ${rem(listIndentLg)};
          width: ${rem(listPaddingLg)};
        }
      }
    }

    ol.letter {
      li::before {
        content: counter(item, upper-alpha) '.';
      }
    }

    h1 {
      ${h1()}
    }

    h2 {
      ${h2()}
    }

    h3 {
      ${h3()}
    }

    /* Add large top spacing to h2 to separate sections */
    p + h2,
    blockquote + h2,
    ul + h2,
    ol + h2,
    figure + h2 {
      margin-top: ${rem(getDropMargin(TextScale.Small, 2))};

      ${gt(theme.bp.largeText)} {
        margin-top: ${rem(getDropMargin(TextScale.Large, 2))};
      }
    }

    /* Media caption */
    figcaption {
      color: ${theme.color.textInfo};
      ${responsiveText(TextSize.Small)}
    }

    figcaption {
      margin-top: ${rem(getDropMargin(TextScale.Small, 0.5))};

      ${gt(theme.bp.largeText)} {
        margin-top: ${rem(getDropMargin(TextScale.Large, 0.5))};
      }
    }

    /* Code block */
    pre,
    code {
      font-family: ${theme.font.monospace.family};
      ${responsiveText(TextSize.Small)};
    }

    code {
      padding: ${rem(4)};
      background-color: ${theme.color.codeHighlight};
    }

    /* Anchor */
    /* Add depression on press */
    a {
      position: relative;

      &:active,
      &.active {
        top: ${theme.style.activeOffset};
      }
    }

    /* Small text */
    small {
      ${responsiveText(TextSize.Small)}
    }

    /* Add drop margin */
    .drop {
      margin-bottom: ${rem(getDropMargin(TextScale.Small, 1))};

      ${gt(theme.bp.largeText)} {
        margin-bottom: ${rem(getDropMargin(TextScale.Large, 1))};
      }
    }

    /* Remove drop margin */
    .no-drop {
      margin-bottom: 0;

      ${gt(theme.bp.largeText)} {
        margin-bottom: 0;
      }
    }
  }
`
