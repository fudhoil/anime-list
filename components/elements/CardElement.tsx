import { css } from "@emotion/css";
import type { CardProps } from "@/types/elements";
import Image from "next/image";
import Link from "next/link";
import { useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { tooltip_css } from "@/pages/anime/[title]";
import parse from "html-react-parser";

const CardElement = ({media}: {media: CardProps}) => {
    const dispatch = useCollectionsDispatch();
    return (
    <div className={css`
        flex-direction: row;
        gap: 1rem;
        width: 100%;
        position: relative;
        height: 100%;
        display: flex;
        align-items: start;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            width: 10rem;
        }
    `}>
        {/* image */}
        <div className={css`
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            min-width: 10rem;
            height: 100%;
            position: relative;
            overflow: hidden;
        `}>
            <Link href={`/anime/${media?.title?.romaji?.replace(/\s/g, "-").toLowerCase()}`} 
                className={css`
                    cursor: pointer;
                    display: flex;
                    max-width: 10rem;
                `} onClick={() => {
                    dispatch({type: "SET_MODAL", modal: false});
                    dispatch({type: "SET_MODAL_CONTENT", modalContent: null});
                    dispatch({type: "SET_MODAL_TYPE", modalType: null});
                }}>
                    {/* Image */}
                <Image 
                    src={media?.coverImage?.extraLarge || media?.coverImage?.large || media?.coverImage?.medium || media?.coverImage?.color || '/images/placeholder.png'}
                    alt={media?.title?.english || media?.title?.romaji || media?.title?.native}
                    layout="responsive"
                    width={media?.coverImage?.extraLarge ? 225 : 150}
                    height={media?.coverImage?.extraLarge ? 350 : 250}
                    className={css`
                        cursor: pointer;
                    `}
                />
            </Link>
        </div>

        {/* details */}
        <div className={css`
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            padding: 0.5rem;
            justify-content: flex-start;

            @media (max-width: 768px) {
                position: absolute;
                bottom: 0;
                right: 0;
                padding: 0.5rem;
                background: linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
                background-color: rgba(0,0,0,0.5);
            }
        `}>
            <div className={css`
               display: flex;
                flex-direction: row;
                gap: 0.5rem;
                width: 100%;
                align-items: center;
                justify-content: flex-start;
            `}>
                <div className={css`
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    width: 100%;
                    align-items: start;
                    justify-content: flex-start;
                `}>
                    <div className={tooltip_css}>
                            {/* tooltip text */}
                            <span className={css`
                                visibility: hidden;
                                width: 120px;
                                background-color: #111;
                                color: #fff;
                                text-align: center;
                                border-radius: 6px;
                                padding: 5px 0;
                                position: absolute;
                                z-index: 1;
                                bottom: 125%;
                                left: 50%;
                                margin-left: -60px;
                                opacity: 0;
                                transition: opacity 0.3s;
                                `}>
                                Scores
                            </span>
                           <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1c40f" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M12 17.25l-6.386 3.92l1.623-7.067l-5.587-4.853l7.34-.636L12 3l2.71 6.614l7.34 .636l-5.587 4.853l1.623 7.067z" />
                            </svg>
                            <span className={css`
                            font-size: 1.2rem;
                            font-weight: 400;

                            @media (max-width: 768px) {
                                font-size: 1rem;
                            }
                            `}>
                                {media?.averageScore}%
                            </span>
                       </div>
                       {/* title */}
                            <h3 className={css`
                                font-size: 1.2rem;
                                font-weight: 400;
                                line-height: 1.5;
                                color: #fff;
                                margin: 0;
                                display: -webkit-box;
                                -webkit-line-clamp: 1;
                                -webkit-box-orient: vertical;
                                overflow: hidden;

                                @media (max-width: 768px) {
                                    font-size: 0.9rem;
                                }
                                `}>
                                {media?.title?.english || media?.title?.romaji || media?.title?.native}
                            </h3>
                </div>
            </div>
            <div className={css`
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                width: 100%;
                align-items: center;
                justify-content: flex-start;
            `}>
                <div className={css`
                    display: flex;
                    flex-direction: row;
                    gap: 0.5rem;
                    width: 100%;
                    align-items: flex-start;
                    justify-content: flex-start;
                    white-space: nowrap;

                    @media (max-width: 768px) {
                        gap: 0.25rem;
                        align-items: flex-start;
                        & > * {
                            color: #fff;
                        }
                    }
                `}>
                    <span className={css`
                        font-size: 0.75rem;
                        font-weight: 400;
                        line-height: 1.5;
                        color: #888;
                    `}>{media?.duration} min</span>
                    <span className={css`
                        font-size: 0.75rem;
                        font-weight: 400;
                        line-height: 1.5;
                        color: #888;
                    `}>({media?.episodes} episodes)</span>
                </div>

                {/* descriptions */}
                <div className={css`
                    display: flex;
                    flex-direction: row;
                    gap: 0.5rem;
                    width: 100%;
                    align-items: center;

                    @media (max-width: 768px) {
                        display: none;
                    }
                    `}>
                        <p className={css`
                            font-size: 0.75rem;
                            font-weight: 400;
                            line-height: 1.5;
                            color: #888;
                            display: -webkit-box;
                            -webkit-line-clamp: 9;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        `}>
                            {parse(media?.description)}
                        </p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CardElement