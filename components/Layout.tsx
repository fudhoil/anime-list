import { css } from "@emotion/css";
import Header from "./elements/Header";
import Modal from "./Modal";

const Layout = (props: any) => {
    const { children } = props
    return (
        <div className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        padding: 1rem 1rem;
        color: #fafafa;
      `}>
            <Header title="Anime List" subtitle="List of all anime" />
            {/* line */}
            <div className={css`
          width: 100%;
          height: 1px;
          background-color: #333;
          margin-bottom: 2rem;
        `} />
            {children}
            {/* <Footer /> */}
            {/* modal */}
            <Modal />
        </div>
    )
}

export default Layout