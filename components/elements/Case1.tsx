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
            <>
                {/* or create new collection */}
            <InputCollection />
            </>
        )}
        </>
    )
}

export default Case1;