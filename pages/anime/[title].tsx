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
                       
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                            `}>
                                <span className={css`
                                font-size: 0.75rem;
                                font-weight: 400;
                                color: #999;
                                `}>
                                    Scores
                                </span>
                            <span className={css`
                            font-size: 1.2rem;
                            font-weight: 400;
                            `}>
                                {data?.averageScore}%
                            </span>
                        </div>

                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                            `}>
                                <span className={css`
                                font-size: 0.75rem;
                                font-weight: 400;
                                color: #999;
                                `}>
                                    Favorites
                                </span>
                            <span className={css`
                            font-size: 1.2rem;
                            font-weight: 400;
                            `}>
                                {data?.favourites}
                            </span>
                        </div>

                      
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 0.5rem;
                            `}>
                                <span className={css`
                                font-size: 0.75rem;
                                font-weight: 400;
                                color: #999;
                                `}>
                                    Popularity
                                </span>
                            <span className={css`
                            font-size: 1.2rem;
                            font-weight: 400;
                            `}>
                                {data?.popularity}
                            </span>
                        </div>

                    </div>
                </div>
                <div className={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    max-width: 800px;
                    width: 100%;

                    @media (max-width: 768px) {
                        flex-direction: column;
                        gap: 2rem;
                    }
                    `}>
                    <h1 className={css`
                        font-size: 2rem;
                        margin-left: auto;
                        width: 100%;
                        height: 100%;
                        display: flex;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;

                        @media (max-width: 768px) {
                            justify-content: space-between;
                        }
                        `}>
                        {data?.title?.romaji} 
                        <span className={css`
                            font-size: 1rem;
                            font-weight: 400;
                            color: #999;
                            margin-left: 1rem;
                            align-self: center;
                            white-space: nowrap;
                            `}>
                        ({data?.episodes} EP)</span>
                    </h1>
                    {/* section details */}
                    <div className={css`
                        display: flex;
                        flex-direction: column;
                        align-items: start;
                        gap: 1rem;
                        box-shadow: -2px 0px 0px 0px #333;
                        padding: 1rem;
                        background-color: transparent;
                        outline: none;
                        border: none;
                        max-width: 20rem;
                        overflow: hidden;=

                        @media (max-width: 768px) {
                            width: 100%;
                            margin-top: 1rem;
                        `}>
                        
                        <span className={css`
                            font-size: 1.2rem;
                            font-weight: 400;
                            color: #999;
                            // no wrap
                            white-space: nowrap;
                            `}>
                            {data?.duration} min
                        </span>
                        <div className={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 0.5rem;
                            font-size: 0.75rem;
                            `}>
                                <span>
                                Tags:
                               </span>
                            {data?.tags?.map((tag: any) => (
                            <span className={css`
                                color: #555;
                                // no wrap
                                white-space: nowrap;
                                `} key={tag}>
                                {tag?.name}
                                {data?.tags?.length > 1 ? ", " : ""}
                            </span>
                            ))}
                        </div>

                        <div className={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 0.5rem;
                            font-size: 0.75rem;
                            `}>
                                <span>
                                Genre:
                               </span>
                            {data?.genres?.map((genre: any) => (
                            <span className={css`
                                color: #555;
                                // no wrap
                                white-space: nowrap;
                                `}
                                key={genre}>
                                {genre}
                                {data?.genres?.length > 1 ? ", " : ""}
                            </span>
                            ))}
                        </div>

                    </div>
                </div>
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
                    max-width: 800px;
                    margin: 0 auto;
                    gap: 2rem;

                    `}>
                    <p className={css`
                    font-size: 1.2rem;
                    font-weight: 300;
                    text-align: justify;
                    // letter spacing

                    text-indent: 2rem;
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
                        genres
                        tags {
                            name
                        }
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