import { css } from "@emotion/css";

const Button = ({ text, onClick, disabled }: { text: string, onClick: any, disabled?: boolean }) => {
    return (

        <button className={css`
            background-color: #111;
            color: #fafafa;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            &:hover {
                background-color: #222;
            }
        `} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default Button