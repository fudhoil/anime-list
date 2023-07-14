import { css } from "@emotion/css";
import CardSkeleton from "./CardSkeleton";

const CardsSkeleton = ({ count }: { count: number }) => {
    return (
        <div className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
            gap: 2.5rem 0.2rem;
            width: 100%;
            margin: 1rem 0;
        `}>
            {
                Array.from(Array(count).keys()).map((_, i) => {
                    return (
                        <CardSkeleton key={i} />
                    )
                })
            }
        </div>
    )
}

export default CardsSkeleton;