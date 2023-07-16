import { css } from "@emotion/css";

const TitleModal = ({ children }: any) => {
  return (
    <>
      <h2
        className={css`
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
        `}
      >
        {children}
      </h2>
    </>
  );
};

export default TitleModal;
