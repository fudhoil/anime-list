import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import parse from "html-react-parser";
import Image from "next/image";
import {toast} from "react-toastify";

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
                <div className={css`
                display: flex;
                flex-direction: column;
                align-items: start;
                width: 100%;
                padding: 1rem 0.25rem;
                border: none;
                gap: 1rem;

                @media (min-width: 768px) {
                    width: 200px;
                }
                `}>
                </div>

                <div className={css`
                display: flex;
                flex-direction: column;
                align-items: start;
                width: 100%;
                padding: 1rem 0.25rem;
                border: none;
                gap: 1rem;
                `}>
                    {/* note: there is no collection, please create one */}
                    <span className={css`
                    font-size: 0.75rem;
                    font-weight: 300;
                    line-height: 1.5;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    `}>You don&apos;t have any collection yet, please create one.</span>
                    <h2>Create New Collection</h2>
                    <input type="text" placeholder="New collection title" className={css`
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    border: 1px solid #333;
                    background-color: #fafafa;
                    color: #333;
                    `} value={newCollectionName} onChange={(e) => handleChange(e)} />
                    {error && (
                        <span className={css`
                        font-size: 0.75rem;
                        font-weight: 300;
                        line-height: 1.5;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        color: red;
                        `}>{error}</span>
                    )}
                    <button className={css`
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    background-color: #333;
                    color: #fff;
                    border: none;
                    outline: none;
                    margin-left: auto;
                    cursor: pointer;

                    &:disabled {
                        display: none;
                    }
                    `}
                        onClick={() => {
                            if (error) {
                                return;
                            }
                            const id = new Date().getTime();
                            dispatch({ type: 'SET_COLLECTIONS', newCollections: { 
                                id: id,
                                title: newCollectionName, 
                                media: [modalContent] }});
                            setNewCollectionName('');
                            dispatch({ type: 'SET_MODAL', modal: false });
                            localStorage.setItem('collections', JSON.stringify([...collections, { 
                                id: id,
                                title: newCollectionName, 
                                media: [modalContent] }]));
                            toast.dismiss()
                            toast.success('Collection created successfully')
                        }}
                        disabled={error?.length > 0 || newCollectionName?.length < 1}
                    >Create </button>
                </div>
            </>
        )}
        </>
    )
}

export default Case1;