import { useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import { useEffect } from "react";

const ModalBase = ({ children, open }: { children: any; open: boolean }) => {
  const dispatch = useCollectionsDispatch();

  useEffect(() => {
    if (open) {
      window.document.body.style.overflow = "hidden";
      window.document.body.style.height = "100vh";
    } else {
      window.document.body.style.overflow = "auto";
      window.document.body.style.height = "auto";
    }
  }, [open]);

  return (
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: ${open ? "flex" : "none"};
        justify-content: center;
        align-items: center;
      `}>
      <div
        className={css`
          position: relative;
          background-color: #111;
          box-shadow: -2px 0px 0px 0px #333;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 90%;
          height: 90%;

          @media (min-width: 1024px) {
            width: 50%;
          }
        `}>
        {children}
        <button
          className={css`
            position: absolute;
            top: 0;
            right: 0;
            padding: 0.5rem 1rem;
            border: none;
            color: #fafafa;
            cursor: pointer;
            border-radius: 0 0 0 5px;
            background-color: #333;

            &:hover {
              background-color: #222;
            }
          `}
          onClick={() => dispatch({ type: "SET_MODAL", modal: false })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={css`
              width: 1rem;
              height: 1rem;
              fill: #fafafa;
            `}
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.707 10l4.147-4.146a.5.5 0 10-.708-.708L10 9.293 5.854 5.146a.5.5 0 00-.708.708L9.293 10l-4.147 4.146a.5.5 0 10.708.708L10 10.707l4.146 4.147a.5.5 0 00.708-.708L10.707 10z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModalBase;
