import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextComponentType } from 'next'
import { ApolloProvider, client } from '../lib/apolloClient'
import { CollectionsProvider } from '@/contexts/CollectionsContext'
import { ReactNode } from 'react'
import { NextPage } from 'next'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <ApolloProvider client={client}>
      <CollectionsProvider>
        {getLayout(
          <Component {...pageProps} />
        )}
      </CollectionsProvider>
    </ApolloProvider>
  )
}

export default App
