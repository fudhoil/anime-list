import { css } from "@emotion/css";

const Button = ({ text, onClick, disabled }: { text: string, onClick: any, disabled?: boolean }) => {
    return (

        <button className={css`
            background-color: transparent;
            box-shadow: -2px 0px 0px 0px #333;
            color: #fafafa;
            border: none;
            padding: 0.5rem 1rem;
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