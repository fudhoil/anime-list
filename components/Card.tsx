import Image from "next/image";
import Link from "next/link";
import { css } from '@emotion/css';
import parse from "html-react-parser";
import TitleElement from "./elements/TitleElement";
import DescriptionElement from "./elements/DescriptionElement";
import SmallDetailElement from "./elements/SmallDetailElement";

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
padding: 10px;
border-radius: 5px;
display: flex;
height: 100%;
flex-direction: column;
gap: 1rem;
cursor: pointer;

&:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    background-color: #111;

    // h3 {
    //     display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
    // }
`

const card_header_css = css`
width: 100%;
border-radius: 5px;
overflow: hidden;
position: relative;
max-height: 350px;
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
gap: 1rem;
align-items: end;
`

const Card = (props: CardProps) => {
    return (
        <Link href={`anime/${props?.title?.english}`} className={css`position: relative;`}>
            <div className={card_css} name="card">
                <div className={card_header_css} name="card-header">
                    <Image src={props?.coverImage?.extraLarge} alt={props?.title?.romaji} layout="responsive" width={300} height={300} />
                </div>
                <TitleElement text={props?.title?.romaji} />
                <DescriptionElement text={props?.description} />
                <div className={card_footer_css}>
                    <div>
                        <SmallDetailElement text={props?.startDate?.year} />
                        {' | '}
                        <SmallDetailElement text={props?.duration + " min"} />
                    </div>

                    <div className={css`
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        align-items: flex-end;
                    `}>
                        <SmallDetailElement text={props?.genres[0] + ", " + props?.genres[1]} />
                        <div className={css`
                            display: flex;
                            flex-direction: row;
                            gap: 0.5rem;
                            align-items: center;
                        `}>
                            <SmallDetailElement text={"EP " + props?.episodes} />
                        </div>
                    </div>
                </div>
            </div>
        </Link >
    );
}

export default Card;