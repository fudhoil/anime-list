import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider, client } from '../lib/apolloClient'
import { CollectionsProvider } from '@/contexts/CollectionsContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CollectionsProvider>
        <Component {...pageProps} />
      </CollectionsProvider>
    </ApolloProvider>
  )
}
