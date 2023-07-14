import { css } from "@emotion/css";
import DescriptionElement from "./elements/DescriptionElement";
import { useEffect, useState } from "react";
import { CardProps } from "./Card";
import TitleElement from "./elements/TitleElement";
import SmallDetailElement from "./elements/SmallDetailElement";

const PopupDescriptionElement = ({ content, isLeft }: { content: CardProps, isLeft: boolean }) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        }
    }, [])

    return (
        <div className={css`
            position: absolute;
            width: 110%;
            height: ${isMobile ? "100%" : "90%"};
            overflow: auto;
            padding: 1rem;
            box-sizing: border-box;
            background-color: #111;
            opacity: ${isMobile ? "0.9" : "1"};
            top: ${isMobile ? "0" : "20%"};
            left: ${(isMobile || isLeft) ? "0" : "-111%"};
            z-index: 999;
        `}>
            {/* All details */}
            <div className={css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: start;
                margin-bottom: 1rem;
                gap: 1rem;
            `}>
                {/* details */}
                <div className={css`
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: end;
                    gap: 0.5rem;
                    line-height: 1.2rem;
                    `}>
                    <SmallDetailElement text={content?.startDate?.year} />
                    {' | '}
                    <SmallDetailElement text={content?.episodes ? "EP " + content?.episodes : ""} />
                </div>
                <TitleElement text={content?.title?.romaji} f_size={0.9} f_weight={600} />
                <DescriptionElement text={content?.description} clamp={isMobile ? 0 : 5} />

                {/* button add to collection */}
                <button className={css`
                    padding: 0.5rem 1rem;
                border-radius: 5px;
                background-color: #333;
                color: #fff;
                border: 1px solid #333;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
                outline: none;

                &:hover {
                    background - color: #111;
                border: 1px solid #fff;
                    }
                `}>
                    Add to collection
                </button>
            </div>
        </div >
    )
}

export default PopupDescriptionElement;