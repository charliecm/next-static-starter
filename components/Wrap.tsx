/**
 * Wrap
 * Centered layout container with content styling.
 */

import { gt, wrap } from '@styles/mixins'
import * as theme from '@styles/theme'
import { TextScale, wrap as Size } from '@styles/theme'
import { getDropMargin } from '@styles/utils'
import { rem } from 'polished'
import styled from 'styled-components'
import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  width?: Size | number
  /** Stretch to width. Overrides `width`. */
  full?: boolean
  /** Horizontal padding. */
  paddings?: 'none' | 'safe-area' | 'page'
  /** Top padding multiplier. */
  paddingTop?: number
  /** Bottom padding multiplier. */
  paddingBottom?: number
  /** Top margin multiplier. */
  marginTop?: number
  /** Bottom margin multiplier. */
  marginBottom?: number
  /* Self-alignment. */
  align?: 'left' | 'center' | 'right'
}

const Wrap = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => (
    <StyledWrap {...props} ref={ref} className={className}>
      {children}
    </StyledWrap>
  )
)

const StyledWrap = styled.div<Props>`
  ${p => wrap(p.full ? 0 : p.width, p.paddings, p.align)}
  ${p =>
    !p.marginTop
      ? ''
      : `margin-top: ${rem(getDropMargin(TextScale.Small, p.marginTop))};`}
  ${p =>
    !p.marginBottom
      ? ''
      : `margin-bottom: ${rem(
          getDropMargin(TextScale.Small, p.marginBottom)
        )};`}
  ${p =>
    !p.paddingTop
      ? ''
      : `padding-top: ${rem(getDropMargin(TextScale.Small, p.paddingTop))};`}
  ${p =>
    !p.paddingBottom
      ? ''
      : `padding-bottom: ${rem(
          getDropMargin(TextScale.Small, p.paddingBottom)
        )};`}
  ${p => (!p.color ? '' : `background-color: ${p.color};`)}

  ${gt(theme.bp.largeText)} {
    ${p =>
      !p.marginTop
        ? ''
        : `margin-top: ${rem(getDropMargin(TextScale.Large, p.marginTop))};`}
    ${p =>
      !p.marginBottom
        ? ''
        : `margin-bottom: ${rem(
            getDropMargin(TextScale.Large, p.marginBottom)
          )};`}
    ${p =>
      !p.paddingTop
        ? ''
        : `padding-top: ${rem(getDropMargin(TextScale.Large, p.paddingTop))};`}
    ${p =>
      !p.paddingBottom
        ? ''
        : `padding-bottom: ${rem(
            getDropMargin(TextScale.Large, p.paddingBottom)
          )};`}
  }
`

Wrap.defaultProps = {
  width: theme.wrap.normal,
  paddings: 'page',
  align: 'center',
}

export { Wrap, Size as WrapSize }
