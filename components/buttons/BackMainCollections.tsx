import { useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";

const BackMainCollections = () => {
  const dispatch = useCollectionsDispatch();
  return (
    <button
      className={css`
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border: none;
        background-color: transparent;
        cursor: pointer;
        z-index: 1000;
      `}
      onClick={() => {
        dispatch({ type: "SET_MODAL", modal: true });
        dispatch({ type: "SET_MODAL_CONTENT", modalContent: null });
        dispatch({ type: "SET_MODAL_TYPE", modalType: "show_collections" });
      }}>
      <svg
        className={css`
          width: 1rem;
          height: 1rem;
          fill: #fafafa;
        `}
        viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83
                        13H20v-2z"
        />
      </svg>
    </button>
  );
};

export default BackMainCollections;
