import { css } from "@emotion/css";
import DescriptionElement from "./DescriptionElement";
import { useEffect, useState } from "react";
import type { CardProps } from "@/types/elements";
import TitleElement from "./TitleElement";
import SmallDetailElement from "./SmallDetailElement";

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
            width: ${isMobile ? "99%" : "110%"};
            height: ${isMobile ? "fit-content" : "90%"};
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
                <DescriptionElement text={content?.description} clamp={isMobile ? 3 : 5} />
            </div>
        </div >
    )
}

export default PopupDescriptionElement;