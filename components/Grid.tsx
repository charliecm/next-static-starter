/**
 * Responsive Grid
 *
 * ```jsx
 * <Row useAs="ul" options={[
 *   {
 *     gutter: theme.spacing.gutterSm,
 *     columns: 2,
 *   },
 *   {
 *     bp: theme.bp.largeLayout,
 *     gutter: theme.spacing.gutterLg,
 *     columns: 12,
 *   },
 * ]}>
 *   <Col as="li" span={[1, 3]}>A</Col>
 *   <Col as="li" span={[1, 9]}>B</Col>
 * </Row>
 * ```
 */

import React from 'react'
import styled from 'styled-components'
import { rem } from 'polished'
import { gt } from '@styles/mixins'
import { FlexDirectionProperty } from 'csstype'

type Options = {
  /** Breakpoint width (greater than) to apply grid. */
  bp?: number
  gutter: number
  columns: number
  direction?: FlexDirectionProperty
}

type RowProps = {
  /** Grid options, organized by breakpoints. */
  options: Options[]
  /**
   * Render as a different element.
   * Workaround for styled-components `as` prop because of this issue:
   * https://github.com/styled-components/styled-components/issues/2448
   */
  useAs?: keyof JSX.IntrinsicElements
  className?: string
  children: any
}

const Row = ({ options, useAs, className, children }: RowProps) => (
  <Wrap options={options} className={className} as={useAs}>
    {React.Children.map(children, child =>
      child ? React.cloneElement(child, { options }) : null
    )}
  </Wrap>
)

type WrapProps = {
  options: Options[]
}

const Wrap = styled.div<WrapProps>`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;

  ${p =>
    p.options.map(option => {
      const margin = rem(-option.gutter / 2)
      const styles = `
        flex-direction: ${option.direction || 'row'};
        margin-right: ${margin};
        margin-left: ${margin};
      `
      if (!option.bp) {
        return styles
      }
      return `${gt(option.bp)} {
        ${styles}
      }`
    })}
`

type ColProps = {
  /**
   * Number of column spaces to use.
   * Span value is carried forward when `options.length` > `span.length`.
   *
   * For example:
   * ```jsx
   * <Row options={[
   *   {columns: 2, ...},
   *   {columns: 12, ...}]
   * }>
   *   <Col span={[1]}>
   *   <Col span={[1]}>
   * </Row>
   * ```
   *
   * At 2nd breakpoint, the value of `span` becomes `6` in a 12-columns grid.
   */
  span: number[]
  options?: Options[]
}

const Col = styled.div<ColProps>`
  ${p =>
    p.options.map((option, index) => {
      const padding = rem(option.gutter / 2)
      const spanIndex = index >= p.span.length ? p.span.length - 1 : index
      const multiplier = Math.floor(
        option.columns / p.options[spanIndex].columns
      )
      const width =
        (1 / option.columns) * 100 * p.span[spanIndex] * multiplier + '%'
      const styles = `
      padding-right: ${padding};
      padding-left: ${padding};
      width: ${width};
    `
      if (!option.bp) {
        return styles
      }
      return `${gt(option.bp)} {
      ${styles}
    }`
    })}
`

export { Row, Col }
