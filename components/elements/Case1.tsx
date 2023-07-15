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
                {/* or create new collection */}
            <div className={css`
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 100%;
            padding: 1rem 0.25rem;
            border: none;
            gap: 1rem;
            `}>
                {/* title */}

                <h2 className={css`
                font-size: 1rem;
                font-weight: 400;
                line-height: 1.5;
                `}>Create New Collection</h2>

                <div className={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 1rem;
                width: 100%;
                `}>
                    <input type="text" placeholder="ex: OP Anime Collections" className={css`
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border-radius: 2px;
                    border: none;
                    outline: none;
                    font-size: 0.75rem;
                    font-weight: 300;
                    line-height: 1.5;
                    background-color: #333;
                    // text color inside input
                    color: #fff;
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
                    background-color: transparent;
                    padding: ${error?.length > 0 || newCollectionName?.length < 1 ? '0 1rem' : '0.5rem 1rem'};
                    box-shadow: -2px 0px 0px 0px #333;
                    border: none;
                    outline: none;
                    color: #fff;
                    margin-left: auto;
                    cursor: pointer;
                    height: 100%;
                    &:hover {
                        background-color: #222;
                    }

                    &:disabled {
                        cursor: auto;
                        &:hover {
                            background-color: transparent;
                        }
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
                                media: [modalContent]
                            }})
                            setNewCollectionName('');
                            localStorage.setItem('collections', JSON.stringify([...collections, {
                                id: id,
                                title: newCollectionName,
                                media: [modalContent]
                            }]));
                            dispatch({ type: 'SET_MODAL', modal: false })
                            toast.success('Collection created successfully!')
                        }}
                        disabled={error?.length > 0 || newCollectionName?.length < 1}
                    >{error?.length > 0 || newCollectionName?.length < 1 ? (
                        <span className={css`
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 0.5rem;
                        `}>
                        {/* long arrow to left */}
                        <svg xmlns="http://www.w3.org/2000/svg" className={css`
                        width: 2rem;
                        height: 2rem;
                        `} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        <span>Fill this, if you want to create a new collection</span>
                        </span>
                    ) : 'Create'}</button>
                </div>
            </div>
            </>
        )}
        </>
    )
}

export default Case1;