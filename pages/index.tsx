import Head from 'next/head'
import Image from 'next/image'
import { gql, useQuery } from '../lib/apolloClient'
import Cards from '@/components/Cards'
import { css } from '@emotion/css'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import PaginationElement from '@/components/elements/PaginationElement'
import Modal from '@/components/Modal'
import { useCollections, useCollectionsDispatch } from '@/contexts/CollectionsContext'
import CardsSkeleton from '@/components/elements/skeleton/CardsSkeleton'
import Header from '@/components/elements/Header'

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
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
            color
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
          reviews {
            nodes {
              id
              summary
              body
              rating
              ratingAmount
            }
          }
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
  const collections = useCollections()
  const dispatch = useCollectionsDispatch()

  const [query, setQuery] = useState(anime_list({ page, perPage }))

  const { data, error, loading } = useQuery(query)

  useEffect(() => {
    if (data?.Page?.pageInfo?.lastPage) {
      setLastPage(data?.Page?.pageInfo?.lastPage)
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      {/* anilist with pagination */}
      <div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        padding: 1rem 1rem;
        color: #fafafa;
      `}>
        <Header title="Anime List" subtitle="List of all anime" />
        {/* line */}
        <div className={css`
          width: 100%;
          height: 1px;
          background-color: #333;
          margin-bottom: 2rem;
        `} />
        {loading &&
          <CardsSkeleton count={perPage} />
        }

        <Cards data={data?.Page?.media} />
      </div >

      {/* modal */}
      <Modal open={collections?.state?.modal} setOpen={dispatch}>
        {/* showing all collections */}
      </Modal>

      {/* pagination */}
      <PaginationElement page={page} setPage={setPage} lastPage={lastPage} setQuery={setQuery} list={anime_list} perPage={perPage} />
    </>
  )
}
