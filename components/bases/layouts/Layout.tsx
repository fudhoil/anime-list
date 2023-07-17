import { css } from "@emotion/css";
import {
  useCollections,
  useCollectionsDispatch,
} from "@/contexts/CollectionsContext";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const DynamicHeader = dynamic(
  () => import("@/components/bases/headers/Header"),
  {
    ssr: false,
  }
);

const DinamicModal = dynamic(() => import("@/components/modals/Modal"), {
  ssr: false,
});

const Layout = (props: any) => {
  const { children } = props;
  const dispatch = useCollectionsDispatch();
  const { collections } = useCollections();

  useEffect(() => {
    const local: any = localStorage.getItem("collections");
    if (local?.length > 0) {
      dispatch({
        type: "SET_ALL_COLLECTIONS",
        allCollections: JSON.parse(local),
      });
    } else {
      dispatch({ type: "REMOVE_ALL_COLLECTIONS" });
    }
  }, [dispatch]);

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        padding: 1rem 1rem;
        color: #fafafa;
      `}>
      <DynamicHeader title="Anime List" subtitle="List of all anime" />
      {children}
      <DinamicModal />
    </div>
  );
};

export default Layout;
