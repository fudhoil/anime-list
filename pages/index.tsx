import Head from 'next/head'
import Image from 'next/image'
import { gql, useQuery } from '../lib/graphql'
import Cards from '@/components/Cards'
import { css } from '@emotion/css'
import Link from 'next/link'

// anilist
const anime_list = gql(`
query {
  Page {
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

const title_css = css`
font-size: 2rem;
margin: 2rem 0;
`

export default function Home() {
  const { data, error, loading } = useQuery(anime_list)
  console.log(data)
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
    </>
  )
}
