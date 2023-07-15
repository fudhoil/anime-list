import { css } from "@emotion/css";
import type { CardProps } from "@/types/elements";
import Image from "next/image";
import Link from "next/link";
import { useCollectionsDispatch } from "@/contexts/CollectionsContext";

const CardElement = ({media}: {media: CardProps}) => {
    const dispatch = useCollectionsDispatch();
    return (
        <Link
            href={`/anime/${media?.title?.romaji?.replace(/\s/g, "-").toLowerCase()}`}
            className={css`
            border-radius: 5px;
            flex-direction: column;
            gap: 1rem;
            cursor: pointer;
            width: 11rem;
            &:hover {
                transition: all 0.2s ease-in-out;
                background-color: #111;
            }
            position: relative;
            overflow: hidden;
        `} onClick={() => {
            dispatch({type: "SET_MODAL", modal: false});
            dispatch({type: "SET_MODAL_CONTENT", modalContent: null});
            dispatch({type: "SET_MODAL_TYPE", modalType: null});
        }}>
            {/* Image */}
            <div className={css`
                width: 100%;
                height: 16rem;
            `}>
                <Image src={media?.coverImage?.large} alt={media?.title?.english} layout="responsive" width={300} height={300} />
            </div>

            {/* Title */}
            <div className={css`
                width: 100%;
                background-color: #444;
                padding: 0.5rem;
                bottom: 0;
                position: absolute;
            `}>
                <span className={css`
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                `}>{media?.title?.english}</span>
            </div>
        </Link>
    )
}

export default CardElement