/**
 * Image
 * Displays a responsive image that lazy loads.
 */

import { rem } from 'polished'
import React from 'react'
import styled from 'styled-components'
import * as theme from '@styles/theme'

interface Props {
  src?: string
  srcSet?: string
  srcSetWebp?: string
  width?: string | number
  height?: string | number
  color?: string
  placeholder?: string
  sizes?: string
  alt: string
  id?: string
  className?: string
  onLoadBegin?: any
  onLoad?: any
}

const Image = React.forwardRef(
  (
    {
      src,
      srcSet,
      srcSetWebp,
      width,
      height,
      color,
      placeholder,
      sizes,
      alt,
      className,
      id,
      onLoadBegin,
      onLoad,
    }: Props,
    ref: React.RefObject<HTMLImageElement>
  ) => {
    if (!src && !srcSet) {
      throw Error('Image needs to have either a src or srcSet.')
    }

    const imgRef = React.useRef<HTMLImageElement>()
    const [isLoaded, setLoaded] = React.useState(false)

    // https://css-tricks.com/preventing-content-reflow-from-lazy-loaded-images/
    const srcPlaceholder =
      placeholder ||
      (width && height
        ? `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
        : 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')

    React.useEffect(() => {
      // Update ref
      if (!ref) return
      ;(ref as any).current = imgRef.current
    }, [imgRef])

    React.useEffect(() => {
      const el = imgRef.current
      if (!el) return
      el.src = srcPlaceholder
      if (el.srcset) el.srcset = ''
      el.classList.remove('lazyloaded')
      el.classList.add('lazyload')
      setLoaded(false)
      if (onLoadBegin) onLoadBegin()
    }, [src, srcSet])

    function handleLoad() {
      const src = imgRef.current.currentSrc || imgRef.current.src
      if (src === srcPlaceholder) return
      setLoaded(true)
      if (onLoad) onLoad()
    }

    if (srcSetWebp) {
      return (
        <Wrap
          isLoaded={isLoaded}
          width={width}
          color={color}
          className={className}
        >
          <picture>
            <source type="image/webp" data-srcset={srcSetWebp} />
            <source type="image/jpeg" data-srcset={srcSet} />
            <img
              ref={imgRef}
              alt={alt}
              data-sizes={sizes || (srcSet ? 'auto' : undefined)}
              src={srcPlaceholder}
              width={width}
              height={height}
              className={className}
              id={id}
              onLoad={handleLoad}
            />
          </picture>
        </Wrap>
      )
    }

    return (
      <Wrap
        isLoaded={isLoaded}
        width={width}
        color={color}
        className={className}
      >
        <img
          ref={imgRef}
          alt={alt}
          data-sizes={sizes || (srcSet ? 'auto' : undefined)}
          data-srcset={srcSet}
          data-src={src}
          src={srcPlaceholder}
          width={width}
          height={height}
          id={id}
          onLoad={handleLoad}
        />
      </Wrap>
    )
  }
)

type WrapProps = {
  isLoaded: boolean
  width?: number | string
  color: string
}

const Wrap = styled.div<WrapProps>`
  transition: background-color ${theme.timing.short};
  position: relative;
  ${p => (p.width ? `max-width: ${rem(p.width + 'px')};` : '')}
  background-color: ${p =>
    p.isLoaded ? 'transparent' : p.color || 'transparent'};

  /* Loading throbber */
  /* https://tobiasahlin.com/spinkit/ */
  &::after {
    content: '';
    ${p => (p.isLoaded ? 'display: none;' : `display: block;`)}
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    width: ${rem(40)};
    height: ${rem(40)};
    background-color: ${theme.palette.white};
    animation: sk-scaleout 1s infinite ease-in-out;
    opacity: 0.4;
  }

  @keyframes sk-scaleout {
    0% {
      transform: translateX(-50%) translateY(-50%) scale(0);
    }
    100% {
      transform: translateX(-50%) translateY(-50%) scale(1);
      opacity: 0;
    }
  }

  img {
    transition: opacity ${theme.timing.medium};
    opacity: 0;
    width: 100%;
    height: auto;
  
    &.lazyloaded {
      opacity: 1;
    }
  }
`

export { Image }
