import { useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import Link from "next/link";

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const dispatch = useCollectionsDispatch();
  return (
    <>
      <div
        className={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Link href="/">
          <h1 className={title_css}>{title}</h1>
        </Link>
        {/* by fudhoil */}
        <span
          className={css`
            font-size: 1rem;
            font-weight: 400;
            color: #999;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          <Link
            href="https://github.com/fudhoil"
            className={css`
              padding: 0.5rem 1rem;
              box-shadow: -2px 0px 0px 0px #333;
              background-color: transparent;
              border: none;
              color: #fafafa;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              font-size: 0.8rem;
              &:hover {
                background-color: #222;
              }
              @media (max-width: 768px) {
                display: none;
              }
            `}
          >
            by fudhoil{" "}
          </Link>

          {/* button modal */}
          <button
            className={css`
              padding: 0.5rem 1rem;
              box-shadow: -2px 0px 0px 0px #333;
              background-color: transparent;
              border: none;
              color: #fafafa;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              &:hover {
                background-color: #222;
              }
            `}
            onClick={() => {
              dispatch({ type: "SET_MODAL", modal: true });
              dispatch({ type: "SET_MODAL_CONTENT", modalContent: null });
              dispatch({
                type: "SET_MODAL_TYPE",
                modalType: "show_collections",
              });
            }}
          >
            My Collections
          </button>
        </span>
      </div>
      {/* line */}
      <div
        className={css`
          width: 100%;
          height: 1px;
          background-color: #333;
          margin-bottom: 2rem;
        `}
      />
    </>
  );
};

const title_css = css`
  font-size: 2rem;
  margin: 2rem 0;
`;

export default Header;
