/**
 * App
 */

import { BreakpointProvider } from '@components/Breakpoint'
import { GlobalStyles } from '@styles/globals'
import * as theme from '@styles/theme'
import { getMeta } from '@utils/pages'
import { watchForHover } from '@utils/watch-hover'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import * as config from '../config'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }

  render() {
    const { Component, pageProps, router } = this.props
    return (
      <InnerApp Component={Component} pageProps={pageProps} router={router} />
    )
  }
}

function InnerApp({ Component, pageProps, router }) {
  const meta = getMeta(router.route)

  // Metadata
  const title = pageProps.title || (meta && meta.title) || ''
  const description = (meta && meta.description) || ''
  const keywords = (meta && meta.tags && meta.tags.join(', ')) || false
  const author = config.AUTHOR || ''
  const ogImage = (meta && meta.ogImage) || '/static/og.png'

  React.useEffect(() => {
    watchForHover()
  }, [])

  return (
    <>
      <GlobalStyles />
      <Head>
        <meta
          content="width=device-width, initial-scale=1, viewport-fit=cover"
          name="viewport"
        />
        <link rel="stylesheet" href="/static/fonts/styles.css" />
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {author && <meta name="author" content={author} />}
        <meta property="og:image" content={ogImage} />
        <meta name="theme-color" content={theme.color.androidThemeColor} />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/static/favicon-16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/static/icon-android.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/icon-apple.png"
        />
      </Head>
      <BreakpointProvider>
        <Component />
      </BreakpointProvider>
    </>
  )
}

export default MyApp
