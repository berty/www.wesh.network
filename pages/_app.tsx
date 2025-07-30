import '../styles/globals.css'
import '../styles/comparison-table.css'
import type { AppProps } from 'next/app'

import "highlight.js/styles/atom-one-dark.css";


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
