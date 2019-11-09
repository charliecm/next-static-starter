/**
 * GTag
 * Provides helper functions for tracking with Google Analytics.
 * https://github.com/zeit/next.js/blob/canary/examples/with-google-analytics/lib/gtag.js
 */

import { isExternal } from '@utils/common'

export const GA_TRACKING_ID = require('../config').GA_TRACKING_ID

const isLoaded = () => 'ga' in window && (window as any).ga.loaded

/**
 * Tracks pageview.
 * https://developers.google.com/analytics/devguides/collection/gtagjs/pages
 *
 * @param url URL to track.
 */
export const pageview = (url: string) => {
  if (!isLoaded()) return
  ;(window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

/** GA event options. */
type EventOptions = {
  /** Event action. */
  action?: string
  /** Event category. */
  category?: string
  /** Event label. */
  label?: string
  /** Event value. */
  value?: number
  /** Callback after success. */
  callback?: Function
}

/**
 * Tracks event.
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 *
 * @param options Event options.
 */
export const event = ({
  action,
  category,
  label,
  value,
  callback,
}: EventOptions) => {
  if (!isLoaded()) return
  ;(window as any).gtag('event', action, {
    transport_type: 'beacon',
    event_category: category,
    event_label: label,
    event_callback: callback,
    value,
  })
}

/**
 * Tracks link click.
 *
 * @param e Mouse event.
 * @param options Event options.
 * @param trackOnly If true, track without navigating.
 */
export const link = (
  e: React.MouseEvent<HTMLAnchorElement>,
  options?: EventOptions,
  trackOnly = false
) => {
  if (!isLoaded()) return
  const url = e.currentTarget.href
  if (!url || url.charAt(0) === '#') return
  let action = (options && options.action) || 'link click'
  const category = (options && options.category) || 'page'
  const label = (options && options.label) || url
  if (isExternal(url) && action === 'link click') action = 'outbound link click'
  const isBlank = e.currentTarget.target === '_blank'
  if (!trackOnly) e.preventDefault()
  event({
    action,
    category,
    label,
    callback: () => {
      if (trackOnly) return
      if (isBlank) window.open(url, '_blank')
      // @ts-ignore
      else window.location = url
    },
  })
}
