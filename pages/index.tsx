import Head from 'next/head'
import Image from 'next/image'
import { gql, useQuery } from '../lib/graphql'
import Cards from '@/components/Cards'
import { css } from '@emotion/css'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'
import PaginationElement from '@/components/elements/PaginationElement'

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

const title_css = css`
font-size: 2rem;
margin: 2rem 0;
`

export default function Home() {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [lastPage, setLastPage] = useState(1)

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
        <div className={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

        `}>
          <h1 className={title_css}>
            Anime List
          </h1>
          {/* by fudhoil */}
          <span className={css`
          font-size: 1rem;
          font-weight: 400;
          color: #999;
        `}>
            by <Link href="https://github.com/fudhoil"
              className={css`
              text-decoration: underline;

              &:hover {
                color: #fff;
              }
            `}>fudhoil </Link>
          </span>
        </div>
        {/* line */}
        <div className={css`
          width: 100%;
          height: 1px;
          background-color: #333;
          margin-bottom: 2rem;
        `} />
        {loading &&
          <p>Loading...</p>
        }

        <Cards data={data?.Page?.media} />
      </div >

      {/* pagination */}
      <PaginationElement page={page} setPage={setPage} lastPage={lastPage} setQuery={setQuery} list={anime_list} perPage={perPage} />
    </>
  )
}
