/**
 * Global Styles
 */

import { hideVisually, normalize } from 'polished'
import { createGlobalStyle } from 'styled-components'
import content from './content'
import * as theme from './theme'

export const GlobalStyles = createGlobalStyle`

  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    height: 100%;
    font-size: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ${theme.font.primary.family};
    font-size: 1rem;
    line-height: 1;
    color: ${theme.color.textBody};
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  ::selection {
    background-color: ${theme.color.selection};
    color: ${theme.color.textBody};
  }

  ::-moz-selection {
    background-color: ${theme.color.selection};
    color: ${theme.color.textBody};
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* Reset blocks */
  p, ul, ol, blockquote, figcaption, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-size: inherit;
    line-height: inherit;
  }

  ul, ol {
    list-style: none;
    padding-left: 0;
  }

  img {
    vertical-align: middle;
  }
  
  figure {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Content block styling */
  ${content}

  .visually-hidden {
    ${hideVisually()}
  }

  .text-info {
    color: ${theme.color.textInfo};
  }

  .text-center {
    text-align: center;
  }

  .flex-center {
    align-self: center;
    justify-self: center;
  }
`
