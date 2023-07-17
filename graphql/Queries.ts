import { gql } from "@/lib/apolloClient";

const anime_list = ({ page, perPage }: { page: number; perPage: number }) => {
  return gql(`
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
    `);
};

export { anime_list };
