import { css } from '@emotion/css';
import { TitleElementProps } from '@/types/elements';

const TitleElement = ({ text, f_size, f_weight }: TitleElementProps) => {
    return (
        <h3 className={css`
        font-size: ${f_size} || 1rem;
        font-weight: ${f_weight} || 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    `} data-name="title">
            {text}
        </h3>
    )
}

export default TitleElement;