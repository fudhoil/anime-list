import { css } from "@emotion/css";
import Header from "./elements/Header";
import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { useEffect } from "react";

const Layout = (props: any) => {
    const { children } = props
    const dispatch = useCollectionsDispatch()
    const { collections} = useCollections()

    useEffect(() => {
      const local: any = localStorage.getItem('collections')
      if (local?.length > 0) {
          dispatch({ type: 'SET_ALL_COLLECTIONS', allCollections: JSON.parse(local) })
        } else {
          dispatch({ type: 'REMOVE_ALL_COLLECTIONS' })
      }
    }, [dispatch])

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
            {children}
        </div>
    )
}

export default Layout