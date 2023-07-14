import getLayouts from "@/utils/getLayouts";
import { css } from "@emotion/css";
import Image from "next/image";
import parse from "html-react-parser";

const DetailPage = ({ data }: { data: any }) => {
    console.log(data);
    return (
        <>
            {/* anilist complete detail */}
            {/* image */}
            <div className={css`
                width: 100%;
                height: 50vh;
                background-image: url(${data?.coverImage?.large});
            background-position: center;
            background-repeat: no-repeat;
            background-color: #111;

            // gradient
            &::after {
                content: "";
                display: block;
                width: 100%;
                height: 100%;
                background: linear-gradient(0deg, rgba(0,0,0,5) 0%, rgba(0,0,0,0) 20%);
            }

            `} />

            {/* content */}
            <div className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: 1rem 0.25rem;
                `}>

                <div className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    margin: 0 auto;
                    padding: 1rem 0.25rem;
                    `}>
                    <div className={css`
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 1rem;
                        `}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1c40f" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M12 17.25l-6.386 3.92l1.623-7.067l-5.587-4.853l7.34-.636L12 3l2.71 6.614l7.34 .636l-5.587 4.853l1.623 7.067z" />
                        </svg>
                        <span className={css`
                        font-size: 1.2rem;
                        font-weight: 400;
                        `}>
                            {data?.averageScore}%
                        </span>

                        {/* fav */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e74c3c" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M20 4.586c0 2.903 -2.29 5.416 -5.583 7.93c-3.296 2.512 -6.417 4.043 -6.417 7.544c0 2.423 1.983 4.14 4.583 4.14c1.395 0 2.75 -.64 3.834 -1.77l.583 -.558l.583 .558c1.084 1.13 2.439 1.77 3.834 1.77c2.6 0 4.583 -1.717 4.583 -4.14c0 -3.5 -3.12 -5.032 -6.417 -7.544c-3.293 -2.514 -5.583 -5.027 -5.583 -7.93c0 -2.21 1.79 -4 4 -4c1.357 0 2.705 .638 3.743 1.802c1.037 -1.164 2.386 -1.802 3.743 -1.802c2.21 0 4 1.79 4 4z" />
                        </svg>
                        <span className={css`
                        font-size: 1.2rem;
                        font-weight: 400;
                        `}>
                            {data?.favourites}
                        </span>

                        {/* popularity */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trending-up" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2ecc71" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <polyline points="3 17 9 11 13 15 21 7" />
                            <polyline points="14 7 21 7 21 14" />
                        </svg>
                        <span className={css`
                        font-size: 1.2rem;
                        font-weight: 400;
                        `}>
                            {data?.popularity}
                        </span>

                    </div>
                </div>
                <h1 className={css`
                    font-size: 2rem;
                    margin: 1rem 0;
                    `}>
                    {data?.title?.romaji}
                </h1>
                {/* line */}
                <div className={css`
                width: 100%;
                height: 1px;
                background-color: #333;
                margin: 2rem 0;
                `} />
                <div className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    margin: 0 auto;
                    gap: 2rem;

                    `}>
                    <p className={css`
                    font-size: 1.2rem;
                    font-weight: 400;
                    text-align: justify;
                    `}>
                        {parse(data?.description)}
                    </p>
                </div>
            </div>
        </>
    )
}

// server side rendering
export const getServerSideProps = async (context: any) => {
    const { params } = context;
    const { title } = params;
    // title formatting
    const titleFormatted = title?.replace(/-/g, ' ');

    // fetch data from an API anilist.co
    const res = await fetch(`https://graphql.anilist.co`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // query
        body: JSON.stringify({
            query: `
                query ($search: String) {
                    Media (search: $search, type: ANIME) {
                        id
                        title {
                            romaji
                        }
                        description
                        coverImage {
                            large
                        }
                        averageScore
                        episodes
                        duration
                        reviews {
                            nodes {
                                id
                                summary
                                body
                                rating
                            }
                        }
                        favourites
                        popularity
                    }
                }
            `,
            variables: {
                search: titleFormatted
            }
        })
    });

    const data = await res.json();
    return {
        props: {
            data: data?.data?.Media
        }
    }
}

export default DetailPage;

DetailPage.getLayout = (page: any, pageProps: any) => getLayouts(page, "base", pageProps);