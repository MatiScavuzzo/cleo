import { Html, Head, Main, NextScript } from 'next/document'
import { josefinSans } from './index'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={josefinSans.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
