import Image from "next/image";
import Link from "next/link";
import { css } from '@emotion/css';
import parse from "html-react-parser";
import TitleElement from "./elements/TitleElement";
import SmallDetailElement from "./elements/SmallDetailElement";
import { use, useEffect, useRef, useState } from "react";
import PopupDescriptionElement from "./elements/PopupDescriptionElement";
import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { useRouter } from "next/router";
import type { CardProps } from "@/types/elements";

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

const button_css = css`
padding: 0.5rem 1rem;
border-radius: 5px;
background-color: #333;
color: #fff;
border: 1px solid #333;
cursor: pointer;
transition: all 0.2s ease-in-out;
outline: none;
font-size: 0.7rem;
font-weight: 600;
width: 11rem;

&:hover {
    background - color: #111;
border: 1px solid #fff;
    }
`

const Card = (props: CardProps) => {
    const [showDescription, setShowDescription] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [isLeft, setIsLeft] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const dispatch = useCollectionsDispatch()
    const router = useRouter()

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])


    // check if the card is located on the very left side of the screen
    const isLeftSide = () => {
        if (ref.current) {
            return ref.current.getBoundingClientRect().left < 50
        }
        return false
    }

    useEffect(() => {
        setIsLeft(isLeftSide())
    }, [isLeft, ref])

    return (
        <div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        padding: 1rem 0.25rem;
        `}>
            <button className={css`
                position: relative;
                reset button styles
                padding: 0;
                border: none;
                background: none;
                outline: none;
                cursor: pointer;
                `}
                // href={`/anime/${props?.title?.romaji?.replace(/\s/g, "-").toLowerCase()}-${props?.id}`}
                // onClick={() => {
                //     dispatch({ type: "SET_MODAL", modal: true });
                //     dispatch({ type: "SET_MODAL_CONTENT", modalContent: props });
                //     dispatch({ type: "SET_MODAL_TYPE", modalType: "show_details" });
                // }}
                onClick={() => {
                    router.push(`/anime/${props?.title?.romaji?.replace(/\s/g, "-").toLowerCase()}`)
                }}
                onMouseEnter={() => !isMobile && setShowDescription(true)}
                onMouseLeave={() => setShowDescription(false)}>
                <div className={card_css} data-name="card" ref={ref}>
                    <div className={card_header_css} data-name="card-header">
                        <Image src={props?.coverImage?.large} alt={props?.title?.romaji} layout="responsive" width={300} height={300} />
                    </div>
                    <TitleElement text={props?.title?.romaji} f_size={0.9} f_weight={600} />
                    {/* popup on hover */}
                    <div data-name="popup" className={css`
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        transition: all 0.2s ease-in-out;
                        opacity: ${showDescription ? 1 : 0};
                        visibility: ${showDescription ? "visible" : "hidden"};
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem;
                        height: 100%;
                    `}>
                        {/* arror to the right */}
                        <div className={css`
                            position: absolute;
                            width: 0;
                            height: 0;
                            border-top: 1rem solid transparent;
                            border-bottom: 1rem solid transparent;
                            border-left: 1rem solid #fafafa;
                            left: ${isLeft ? "auto" : "0"};
                            right: ${isLeft ? "0" : "auto"};
                            top: 30%;
                            z-index: 1;
                            rotate: ${isLeft ? "180deg" : "0deg"};

                            @media (max-width: 768px) {
                                display: none;
                            }
                        `} />
                        <PopupDescriptionElement content={props} isLeft={isLeft} />
                    </div>

                    {props?.averageScore && (
                        <div className={css`
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                            position: absolute;
                            top: 0.5rem;
                            right: 0.5rem;
                            z-index: 2;
                            background-color: #111;
                            padding: 0.5rem;
                            border-radius: 5px;
                        `}>

                            <div className={css`
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                        `}>
                                <svg className={css`
                            width: 1.2rem;
                            height: 1.2rem;
                            fill: #f1c40f;
                            margin-right: 0.5rem;
                        `} viewBox="0 0 24 24">
                                    <path d="M12 2.5L9.5 8.5H2.5L8.5 13.5L6.5 20.5L12 15L17.5 20.5L15.5 13.5L21.5 8.5H14.5L12 2.5Z" />
                                </svg>
                                <span className={css`
                                font-size: 0.8rem;
                                font-weight: 600;
                            `}>{props?.averageScore}%</span>
                            </div>
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
            </button>
            <button className={button_css}
                onClick={() => {
                    dispatch({ type: "SET_MODAL", modal: true });
                    dispatch({ type: "SET_MODAL_CONTENT", modalContent: props });
                    dispatch({ type: "SET_MODAL_TYPE", modalType: "add_to_collection" });
                }}>
                Add to collection
            </button>
        </div>
    );
}

export default Card;