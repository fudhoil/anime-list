import { css } from "@emotion/css";

const SmallDetailElement = (props: any) => {
  return (
    <span
      className={css`
        font-size: 0.6rem;
        font-weight: 400;
        color: #999;
      `}
      data-name={props.name}
    >
      {props.text}
    </span>
  );
};

export default SmallDetailElement;
