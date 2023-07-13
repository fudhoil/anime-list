import { css } from '@emotion/css';

const TitleElement = ({ text }: { text: string }) => {
    return (
        <h3 className={css`
        font-size: 1.2rem;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    `} name="title">
            {text}
        </h3>
    )
}

export default TitleElement;