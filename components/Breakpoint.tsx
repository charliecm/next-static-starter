/**
 * Breakpoint
 * Provides a clean way to check responsive breakpoint when window resizes.
 */

import React from 'react'
import { debounce } from 'lodash'
import { em } from 'polished'

type Breakpoint = {
  width: number
  height: number
  gt: Function
  lt: Function
  eq: Function
}

const Context = React.createContext<Breakpoint>(null)

const BreakpointProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>({
    width: 0,
    height: 0,
    gt: () => false,
    lt: () => false,
    eq: () => false,
  })

  React.useEffect(() => {
    const handleResize = debounce(() => {
      const width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )
      const height = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )
      setBreakpoint({
        ...breakpoint,
        width: width,
        height: height,
        gt: (bp: number) => {
          return window.matchMedia(`screen and (min-width: ${em(bp)})`).matches
        },
        lt: (bp: number) => {
          return window.matchMedia(`screen and (max-width: ${em(bp - 1)})`)
            .matches
        },
        eq: (bp: number) => {
          return window.matchMedia(`screen and (width: ${em(bp)})`).matches
        },
      })
    }, 500)

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <Context.Provider value={breakpoint}>{children}</Context.Provider>
}

const useBreakpoint = () => {
  const context = React.useContext(Context)
  if (!context)
    throw new Error('useBreakpoint must be used within a BreakpointProvider.')
  return context
}

export { BreakpointProvider, useBreakpoint }
