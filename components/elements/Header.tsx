import { useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import Link from "next/link";

const Header = ({ title, subtitle }: { title: string, subtitle: string }) => {
    const dispatch = useCollectionsDispatch();
    return (
        <div className={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

        `}>
            <h1 className={title_css}>
                {title}
            </h1>
            {/* by fudhoil */}
            <span className={css`
          font-size: 1rem;
          font-weight: 400;
          color: #999;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        `}>
                <Link href="https://github.com/fudhoil"
                    className={css`
              text-decoration: underline;

              &:hover {
                color: #fff;
              }

              @media (max-width: 768px) {
                display: none;
              }
            `}>by fudhoil </Link>

                {/* button modal */}
                <button className={css`
            padding: 0.5rem 1rem;
            background-color: #333;
            border: none;
            border-radius: 5px;
            color: #fafafa;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &:hover {
              background-color: #444;
            }

          `} onClick={() => dispatch({ type: 'SET_MODAL', modal: true, modalType: 'show_collections' })}>
                    My Collections
                </button>
            </span>
        </div>
    )
}

const title_css = css`
font-size: 2rem;
margin: 2rem 0;
`

export default Header