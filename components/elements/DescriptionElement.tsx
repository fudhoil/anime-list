import { css } from '@emotion/css';
import parse from 'html-react-parser';

const DescriptionElement = ({ text }: { description: string }) => {
    return (
        <p className={css`
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: justify;
            font-size: 1rem;
            font-weight: 200;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        `} name="description">
            {parse(text)}
        </p>
    )
}

export default DescriptionElement;