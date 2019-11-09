/**
 * Watch Hover
 * Disables hover state style for touch.
 * https://stackoverflow.com/a/30303898
 */

let container = null
let isWatching = false
let hasHoverClass = false
let lastTouchTime = 0

function enableHover() {
  // Filter emulated events coming from touch events
  if (new Date().getTime() - lastTouchTime < 500) return
  if (hasHoverClass) return

  container.classList.add('has-hover')
  hasHoverClass = true
}

function disableHover() {
  if (!hasHoverClass) return

  container.classList.remove('has-hover')
  hasHoverClass = false
}

function updateLastTouchTime() {
  lastTouchTime = new Date().getTime()
}

function watchForHover() {
  if (isWatching) return
  container = document.body
  document.addEventListener('touchstart', updateLastTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)
  isWatching = true
}

export { watchForHover }
