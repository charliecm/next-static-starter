/**
 * Utility Functions
 */

import { MotionValue, useTransform } from 'framer-motion'
import { debounce } from 'lodash'

/**
 * Triggers window scroll event.
 */
const triggerScroll = () => {
  window.dispatchEvent(new Event('scroll'))
}

/**
 * Requests animation frame by using a workaround for a Chrome/Safari bug that executes callback on current frame.
 * https://github.com/mui-org/material-ui/blob/b61e8d54b614e76cbdf92c917a32dec9714d183f/src/internal/Transition.js#L19-L35
 */
const requestAnimationStart = (callback: FrameRequestCallback) => {
  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(() => window.requestAnimationFrame(callback))
    return
  }
  setTimeout(callback, 0)
}

/**
 * Returns element offset position before CSS transform.
 * https://stackoverflow.com/a/35543016
 */
const getOffset = (el: HTMLElement) => {
  let ele: any = el
  let top = 0
  let left = 0
  do {
    top += ele.offsetTop
    left += ele.offsetLeft
    ele = ele.offsetParent
  } while (ele)
  return { top, left }
}

/**
 * Returns a vertical parallax motion value to be used in a Framer `motion` element.
 *
 * ```jsx
 * const eleRef = React.useRef()
 * const { scrollY } = useViewportScroll()
 * const parallaxY = useParallaxY(scrollY, eleRef, -6, false)
 * <motion.div ref={eleRef} style={{ y: parallaxY }}>Hello</motion.div>
 * ```
 *
 * @param scrollY Motion value from useViewportScroll().
 * @param ref Element to parallax to calculate relative positioning.
 * @param multiplier How slow to move the object. Can be a negative value to parallax in the opposite direction.
 * @param anchor Reference point for calculating parallax distance.
 */
const useParallaxY = (
  scrollY: MotionValue,
  ref: React.RefObject<any>,
  multiplier: number = 2,
  anchor: 'absolute' | 'relative' = 'absolute'
) =>
  useTransform(scrollY, scrollTop => {
    if (!ref.current) return 0
    const el = ref.current
    const offset = getOffset(el).top
    const vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
    const ratio = 800 / vh
    const scroll =
      anchor === 'absolute' ? scrollTop : Math.max(0, scrollTop + vh - offset)
    return -scroll * multiplier * ratio
  })

/**
 * Returns true if URL is external.
 * https://stackoverflow.com/a/6238456
 *
 * @param url Target URL.
 */
const isExternal = (url: string) => {
  var match = url.match(
    /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
  )
  if (
    typeof match[1] === 'string' &&
    match[1].length > 0 &&
    match[1].toLowerCase() !== location.protocol
  )
    return true
  if (
    typeof match[2] === 'string' &&
    match[2].length > 0 &&
    match[2].replace(
      new RegExp(
        ':(' + { 'http:': 80, 'https:': 443 }[location.protocol] + ')?$'
      ),
      ''
    ) !== location.host
  )
    return true
  return false
}

/**
 * Returns string in kebab-case.
 * https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2870157
 */
const toKebabCase = (str: string) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-')

/**
 * Add active state on press and persist when clicked for better feedback.
 *
 * @param target Target element or event.
 */
const persistActive = (
  target: Element | React.MouseEvent | React.TouchEvent
) => {
  const DELAY = 1000
  const t = 'currentTarget' in target ? target.currentTarget : target
  let isClicked = false
  let isDragged = false

  t.classList.add('active')

  function handleMove() {
    isDragged = true
  }

  function handleUp() {
    if (isClicked) return
    if (t && t.parentNode) t.classList.remove('active')
    cleanUp()
  }

  function handleClick() {
    if (isDragged) return
    isClicked = true
    t.classList.add('active')
    debounce(() => {
      if (t && t.parentNode) t.classList.remove('active')
    }, DELAY)()
    cleanUp()
  }

  function cleanUp() {
    t.removeEventListener('touchmove', handleMove)
    t.removeEventListener('mouseup', handleClick)
    t.removeEventListener('touchend', handleClick)
    window.removeEventListener('mouseup', handleUp)
    window.removeEventListener('touchend', handleUp)
    window.removeEventListener('dragend', handleUp)
  }

  t.addEventListener('touchmove', handleMove)
  t.addEventListener('mouseup', handleClick)
  t.addEventListener('touchend', handleClick)
  window.addEventListener('mouseup', handleUp)
  window.addEventListener('touchend', handleUp)
  window.addEventListener('dragend', handleUp)
}

export {
  requestAnimationStart,
  triggerScroll,
  getOffset,
  useParallaxY,
  isExternal,
  toKebabCase,
  persistActive,
}
