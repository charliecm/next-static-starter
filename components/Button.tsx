/**
 * Button
 */

import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { gt, responsiveText } from '@styles/mixins'
import * as theme from '@styles/theme'
import { TextSize } from '@styles/theme'
import { isExternal as isHrefExternal, persistActive } from '@utils/common'
import { Link } from '@components/Link'

const hoverTiming = '0.2s'
const textColor = theme.palette.charcoal800
const bgColor = theme.palette.charcoal10
const bgColorActive = theme.palette.charcoal20
const primaryTextColor = theme.palette.goldDark
const primaryBgColor = theme.palette.gold500
const primaryBgColorActive = theme.palette.gold600

type Props = Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>> & {
  /** If true, use primary style. */
  primary?: boolean
  /** If true, use full width. */
  full?: boolean
}

const Button = ({ href, primary, full, children, ...props }: Props) => {
  const [isExternal, setExternal] = React.useState(false)

  React.useEffect(() => {
    if (href) setExternal(isHrefExternal(href))
  }, [href])

  if (isExternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      {...props}
      onMouseDown={persistActive}
      onTouchStart={persistActive}
    >
      {children}
    </a>
  )
}

const StyledButton = styled(Button)`
  display: ${p => (p.full ? 'block' : 'inline-block')};
  position: relative;
  transition: background-color ${hoverTiming};
  border: 0;
  border-radius: 100vw;
  background-color: ${p => (p.primary ? primaryBgColor : bgColor)};
  padding: ${rem(8)} ${rem(24)};
  font-weight: ${theme.font.primary.medium};
  text-align: center;
  text-decoration: none;
  color: ${p => (p.primary ? primaryTextColor : textColor)};
  cursor: pointer;
  appearance: none;
  ${responsiveText(TextSize.Medium)}

  .has-hover &:hover {
    background-color: ${p =>
      p.primary ? primaryBgColorActive : bgColorActive};
  }

  &:active,
  &.active {
    transition-duration: 0s;
    top: ${theme.style.activeOffset};
    background-color: ${p =>
      p.primary ? primaryBgColorActive : bgColorActive};
  }

  &:focus {
    outline: 0;
  }

  ${gt(theme.bp.largeText)} {
    padding: ${rem(12)} ${rem(32)};
  }
`

export { StyledButton as Button }
