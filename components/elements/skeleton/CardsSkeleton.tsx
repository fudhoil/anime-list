import { css } from "@emotion/css";
import CardSkeleton from "./CardSkeleton";

const CardsSkeleton = ({ count }: { count: number }) => {
    return (
        <div className={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
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