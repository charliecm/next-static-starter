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
import { Outbound } from '@components/Outbound'

// TODO: Update button colors
const hoverTiming = '0.2s'
const textColor = theme.palette.black
const bgColor = theme.palette.black
const bgColorActive = theme.palette.black
const primaryTextColor = theme.palette.black
const primaryBgColor = theme.palette.black
const primaryBgColorActive = theme.palette.black

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
      <Outbound href={href} {...props}>
        {children}
      </Outbound>
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
  font-weight: ${theme.font.primary.bold};
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
