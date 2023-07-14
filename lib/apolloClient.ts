import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_ANILIST_API_URL,
    cache: new InMemoryCache()
});

export { client, ApolloProvider, gql, useQuery };