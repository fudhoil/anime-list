import { css } from '@emotion/css';
import parse from 'html-react-parser';

const DescriptionElement = ({ text, clamp }: { text: string, clamp: number }) => {
    return (
        <p className={css`
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: justify;
            font-size: 0.7rem;
            font-weight: 200;
            display: -webkit-box;
            -webkit-line-clamp: ${clamp};
            -webkit-box-orient: vertical;
            color: #999;
        `} data-name="description">
            {parse(text)}
        </p>
    )
}

export default DescriptionElement;