import Image from "next/image";
import Link from "next/link";
import { css } from '@emotion/css';
import parse from "html-react-parser";
import TitleElement from "./elements/TitleElement";
import SmallDetailElement from "./elements/SmallDetailElement";
import { use, useEffect, useRef, useState } from "react";
import PopupDescriptionElement from "./PopupDescriptionElement";

export type CardProps = {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    description: string;
    coverImage: {
        large: string;
        extraLarge: string;
        medium: string;
        color: string;
    };
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
    episodes: number;
    duration: number;
    genres: string[];
    reviews: {
        nodes: {
            id: number;
            summary: string;
            body: string;
            rating: number;
            ratingAmount: number;
        }[];
    };
};

const card_css = css`
padding: 5px;
border-radius: 5px;
display: flex;
height: 100%;
flex-direction: column;
gap: 1rem;
cursor: pointer;
width: 11rem;
justify-content: space-between;

&:hover {
    transition: all 0.2s ease-in-out;
    background-color: #111;
}
`

const card_header_css = css`
width: 100%;
border-radius: 5px;
overflow: hidden;
position: relative;
height: 14rem;
transition: all 0.2s ease-in-out;

&:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%);
}
`

const card_footer_css = css`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: end;
`

const Card = (props: CardProps) => {
    const [showDescription, setShowDescription] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [isLeft, setIsLeft] = useState(false)

    // check if the card is located on the very left side of the screen
    const isLeftSide = () => {
        if (ref.current) {
            return ref.current.getBoundingClientRect().left < 50
        }
        return false
    }

    useEffect(() => {
        console.log(isLeftSide())
        setIsLeft(isLeftSide())
    }, [isLeft, ref])

    return (
        <Link href={`anime/${props?.title?.english}`} className={css`
        position: relative;
        `}
            onMouseEnter={() => setShowDescription(true)}
            onMouseLeave={() => setShowDescription(false)}>
            <div className={card_css} data-name="card" ref={ref}>
                <div className={card_header_css} data-name="card-header">
                    <Image src={props?.coverImage?.extraLarge} alt={props?.title?.romaji} layout="responsive" width={300} height={300} />
                </div>
                <TitleElement text={props?.title?.romaji} f_size={0.9} f_weight={600} />
                {/* popup on hover */}
                {showDescription && (
                    <div data-name="popup">
                        <PopupDescriptionElement content={props} isLeft={isLeft} />
                    </div>
                )}
                <div className={card_footer_css}>
                    <div>
                        <SmallDetailElement text={props?.startDate?.year} />
                        {' | '}
                        <SmallDetailElement text={props?.episodes ? "EP " + props?.episodes : ""} />
                    </div>

                    <div className={css`
                        display: flex;
                flex-direction: column;
                gap: 0.4rem;
                padding: 0.1rem;
                    `}>
                        <SmallDetailElement text={props?.genres[0]} />
                    </div>
                </div>
            </div >
        </Link >
    );
}

export default Card;