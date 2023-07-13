import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, client } from '/lib/graphql'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
