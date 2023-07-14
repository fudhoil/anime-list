import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, client } from '../lib/apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
