/**
 * Error Override
 * https://nextjs.org/docs#custom-error-handling
 */

import { Wrap } from '@components/Wrap'
import React from 'react'

class Error extends React.Component {
  static getInitialProps() {
    return { title: 'Error 404' }
  }

  render() {
    return <Content />
  }
}

const Content = () => {
  return (
    <Wrap>
      <h1>Error 404 ☹️</h1>
    </Wrap>
  )
}

export default Error
