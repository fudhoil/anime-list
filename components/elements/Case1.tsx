import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import parse from "html-react-parser";
import Image from "next/image";
import {toast} from "react-toastify";
import InputCollection from "./InputCollection";

const Case1 = ({
    modalContent,
    newModalContent,
    newCollectionName,
    setNewCollectionName,
    editCollectionName,
    editCollectionId,
    handleChange,
    handleEdit,
    setEditCollectionId,
    setEditCollectionName,
    error,
    errorEdit,
    handleSelect,
    selectedCollections,
    selectChange,
}: any) => {
    const {collections} = useCollections()
    const dispatch = useCollectionsDispatch()

    return (
        <>
         {collections?.length < 1 && (
            <div className={css`
            display: flex;
            flex-direction: column;
            max-width: 500px;
            gap: 1rem;
            width: 100%;
            padding: 1rem;
            box-shadow: -2px 0px 0px 0px #333;
            `}>
                {/* or create new collection */}
                <InputCollection />
            </div>
        )}
        </>
    )
}

export default Case1;