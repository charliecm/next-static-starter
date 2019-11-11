# next-static-starter

A static website boilerplate, built on top of [Next.js](https://nextjs.org), uses [styled-components](https://www.styled-components.com/) and deploys to [now](http://zeit.co/).

## Development

Please install [node](https://nodejs.org) and [Now CLI](https://zeit.co/download). Then, run `npm i`.

- `npm run dev` starts a local server for development.
- `npm run export` generates static files for deployment.
- `npm run export-test` exports and runs a local test server using [http-server](https://github.com/http-party/http-server).
- `now out` deploys the website to [Now](https://zeit.co/now).

## Structure

### Configurations

- **config.json** — Site configurations.
- **styles/theme.tsx** — Design tokens.
- **styles/globals.tsx** — Global styles.
- **utils/pages.tsx** - Page meta definition.
- **next.config.js** — [Next config](https://nextjs.org/docs) for plugins and static export routing paths (`exportPathMap`).
- **now.json** — Now [deployment config](https://zeit.co/docs/configuration/).

### Folders

- **pages/** (`@pages`) — Pages, written as React components.
- **components/** (`@components`) — Common React components.
- **styles/** (`@styles`) — CSS styles and design tokens.
- **utils/** (`@utils`) — Common utility functions.
- **public/** — Static assets and images.
- **public/static/fonts** — Custom fonts.
- **out/** — Generated static files.

## Components

Useful components when constructing pages.

- `attribute-name={type!}`, where `!` means optional
- `0` = number
- `x0` = multiplier number
- `''` = string
- `true!` = boolean switch (no value required)

```jsx
// External link
<Link href="">Text</Link>

<Image alt={''} src={''!} srcSet={''!} width={0!} height={0!} color={''!} sizes={''!} id={''!} onLoad={any!} />

// Section wrap
<Wrap width={0!} full={true!} paddings={'none'|'safe-area'|'page'} paddingTop={x0!} paddingBottom={x0!} marginTop={x0!} marginBottom={x0!} align={'left'|'center'|'right'} noContent={true!} color={''!} dark={true!}></Wrap>

// Grid
<Row useAs="ul" options={[
  {
    gutter: theme.spacing.gutterSm,
    columns: 2,
  },
  {
    bp: theme.bp.largeLayout,
    gutter: theme.spacing.gutterLg,
    columns: 12,
  },
]}>
  <Col as="li" span={[1, 3]}>A</Col>
  <Col as="li" span={[1, 9]}>B</Col>
</Row>
```

## Responsive Breakpoints

To check breakpoint in JavaScript:

```jsx
import * as theme from 'styles/theme'
import { useBreakpoint } from '@components/Breakpoint'

//...

const bp = useBreakpoint()
bp.gt(theme.bp.largeLayout)
bp.lt(theme.bp.largeLayout)
bp.eq(theme.bp.largeLayout)
```

To insert breakpoint media query in a styled-component:

```js
import { gt, lt } from '@styles/mixins'

${gt(theme.bp.largeLayout)}
${lt(theme.bp.largeLayout)}
```

## Snippets

### Page

```jsx
import { Meta } from '@utils/manifest'
import styled from 'styled-components'
import { wrap } from '@styles/mixins'
import * as theme from '@styles/theme'

export const meta: Meta = {
  title: 'Title',
  description: '',
}

export default () => {
  return (
    <Wrap>
      <p>Hello!</p>
    </Wrap>
  )
)

const Wrap = styled.div`
  ${wrap(theme.wrap.normal)}
`
```

### Component

```jsx
import styled from 'styled-components'
import * as theme from '@styles/theme'

const Component = () => {
  return (
    <div>Hello!</div>
  )
}

const Wrap = styled.div`
  color: ${theme.color.textInfo};
`

export { Component }
```
