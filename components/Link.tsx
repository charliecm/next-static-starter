/**
 * Link
 * Anchor for external URL with tracking.
 */

import { persistActive } from '@utils/common'
import { link } from '@utils/gtag'

type Props = {
  href: string
  className?: string
  children: any
}

const Link = ({ href, className, children }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    onClick={link}
    onMouseDown={persistActive}
    onTouchStart={persistActive}
    className={className}
  >
    {children}
  </a>
)

export { Link }
