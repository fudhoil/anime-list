import Head from 'next/head'
import Image from 'next/image'
import { gql, useQuery } from '../lib/apolloClient'
import Cards from '@/components/Cards'
import { css } from '@emotion/css'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import PaginationElement from '@/components/elements/PaginationElement'
import { useCollections, useCollectionsDispatch } from '@/contexts/CollectionsContext'
import CardsSkeleton from '@/components/elements/skeleton/CardsSkeleton'
import Header from '@/components/elements/Header'
import getLayouts from '@/utils/getLayouts'

// anilist
const anime_list = ({ page, perPage }: { page: number, perPage: number }) => {
  return (
    gql(`
    query {
      Page(page: ${page}, perPage: ${perPage}) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        },
        media {
          id
          title {
            romaji
          }
          coverImage {
            large
            medium
          }
          description
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          episodes
          duration
          genres
          averageScore
        }
      }
    }
  `)
  )
}

export default function Home() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [lastPage, setLastPage] = useState(1)
  const [query, setQuery] = useState(anime_list({ page, perPage }))
  const { data, error, loading } = useQuery(query, {
    ssr: true,
  })
  const dispatch = useCollectionsDispatch()
  const { collections, collection, collection_id, modal, modalContent, modalType } = useCollections()

  useEffect(() => {
    if (data?.Page?.pageInfo?.lastPage) {
      setLastPage(data?.Page?.pageInfo?.lastPage)
    }
  }, [data])

  console.log('collections: ', collections)
  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      {/* anilist with pagination */}
      {loading &&
        <CardsSkeleton count={perPage} />
      }

      <Cards data={data?.Page?.media} />

      {/* pagination */}
      {data?.Page?.pageInfo?.lastPage && (
        <>
          <PaginationElement page={page} setPage={setPage} lastPage={lastPage} setQuery={setQuery} list={anime_list} perPage={perPage} />
        </>
      )}
    </>
  )
}

// initial prop
export async function getServerSideProps() {
  return {
    props: {
      initialApolloState: {},
    },
  }
}

Home.getLayout = (page: any, pageProps: any) => getLayouts(page, "base", pageProps);
