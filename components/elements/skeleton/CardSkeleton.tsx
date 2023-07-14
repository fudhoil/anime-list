import { css } from "@emotion/css";

const CardSkeleton = () => {
    return (
        // card loading skeleton
        <div className={css`
            margin: 0.5rem 0;
            position: relative;
            height: 14rem;
            width: 11rem;
            border-radius: 5px;
            overflow: hidden;
            background-color: #333;
            animation: loading 1s infinite;
            @keyframes loading {
                0% {
                    background-color: #333;
                }
                50% {
                    background-color: #444;
                }
                100% {
                    background-color: #333;
                }
            }
        `}>
            <div className={css`
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(90deg, #333 0px, #444 40px, #333 80px);
                background-size: 600px;
                animation: loading 1s infinite;
                @keyframes loading {
                    0% {
                        background-position: -600px;
                    }
                    100% {
                        background-position: -600px;
                    }
                }
            `}></div>
        </div>
    )
}

export default CardSkeleton;