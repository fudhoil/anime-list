import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import {toast} from "react-toastify";
import TitleModal from "./TitleModal";
import { useState } from "react";

const InputCollection = () => {
    const {collections, modalContent} = useCollections()
    const dispatch = useCollectionsDispatch()
    const [newCollectionName, setNewCollectionName] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [editMode, setEditMode] = useState(collections?.length === 0 ? true : false)

    const handleChange = (e: any) => {
        setNewCollectionName(e.target.value)
        setError(false)

        // no special characters
        if (e.target.value.match(/^[a-zA-Z0-9 ]*$/)) {
            setErrorMessage('')
            setError(false)
        } else {
            setErrorMessage('No special characters allowed')
            setError(true)
            return
        }

        // cannot be the same as existing collection name
        if (collections?.some((collection: any) => collection.title === e.target.value)) {
            setErrorMessage('Collection name already exists')
            setError(true)
            return
        } else {
            setErrorMessage('')
            setError(false)
        }
    }


    return (
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

                <h1 className={css`
                font-size: 2rem;
                font-weight: 400;
                line-height: 1.5;
                `}>
                    {collections?.length === 0 ? 'Create your first collection' : 'Collections'}
                </h1>

                <div className={css`
                display: flex;
                width: 100%;
                flex-direction: row;
                align-items: center;
                padding: 0.5rem 1rem;
                border-radius: 2px;
                border: none;
                outline: none;
                font-size: 0.75rem;
                font-weight: 300;
                justify-content: space-between;

                @media (max-width: 768px) {
                    padding: 0.5rem 0.25rem;
                }
                `}>
                    <div className={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    grid-gap: 1rem;
                    background-color: #222;
                    // text color inside input
                    color: #fff;
                    border-radius: 2px;
                    margin-left: auto;
                    width: ${editMode ? '100%' : 'auto'};

                    @media (max-width: 768px) {
                        width: 100%;
                        flex-direction: column;
                        align-items: start;
                        gap: 0;
                        grid-gap: 0;
                        background-color: transparent;
                    }
                    `}>
                            <div className={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 1rem;
                            grid-gap: 1rem;
                            width: 100%;
                            margin: auto;

                            display: ${editMode ? 'flex' : 'none'};
                            position: relative;

                            @media (max-width: 768px) {
                                width: 100%;
                                background-color: #222;
                            }
                            `}>
                                <input type="text" placeholder="ex: OP Anime Collections" className={css`
                                width: 100%;
                                padding: 0.5rem 1rem;
                                border: none;
                                outline: none;
                                font-size: 0.75rem;
                                font-weight: 300;
                                background-color: transparent;
                                // text color inside input
                                color: #fff;

                                @media (max-width: 768px) {
                                    width: 100%;
                                    background-color: #222;
                                }
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
                                <span className={css`
                                position: absolute;
                                top: 0;
                                left: 0;
                                transform: translateY(85%);
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                height: 100%;
                                // red color
                                color: #ff4444;

                                @media (max-width: 768px) {
                                    transform: translateY(-85%);
                                }
                                `}>
                                    {errorMessage}
                                </span>
                            </div>
                            <div className={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            gap: 1rem;
                            grid-gap: 1rem;

                            @media (max-width: 768px) {
                                width: 100%;
                            }
                            `}>
                                {!editMode ? (
                                    <button className={css`
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                    gap: 0.5rem;
                                    background-color: #333;
                                    padding: 0.5rem 1rem;
                                    outline: none;
                                    border: none;
                                    font-size: 0.75rem;

                                    &:hover {
                                        background-color: #222;
                                    }

                                    @media (max-width: 768px) {
                                        width: 100%;
                                    }
                                    `}
                                    onClick={() => setEditMode(true)}
                                    >
                                    {/* long arrow to left */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className={css`
                                    width: 1rem;
                                    height: 1rem;
                                    `} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                    <span>CREATE</span>
                                    </button>
                                ) : (
                                    <div className={css`
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                    width: 100%;
                                    `}>
                                    <button className={css`
                                    padding: ${!editMode ? '0 1rem' : '0.5rem 1rem'};
                                    box-shadow: -2px 0px 0px 0px #333;
                                    border: none;
                                    outline: none;
                                    color: #fff;
                                    margin-left: auto;
                                    cursor: pointer;
                                    // box-shadow: -2px 0px 0px 0px #999;
                                    background-color: #333;
                                    &:hover {
                                        background-color: #222;
                                    }
                                    &:disabled {
                                        cursor: auto;
                                        background-color: #222;
                                        color: #999;
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
                                                media: []
                                            }})
                                            setNewCollectionName('');
                                            localStorage.setItem('collections', JSON.stringify([...collections, {
                                                id: id,
                                                title: newCollectionName,
                                                media: []
                                            }]));
                                            dispatch({ type: 'SET_MODAL', modal: false })
                                            setEditMode(false);
                                            setError(false);
                                            setNewCollectionName('');
                                            setErrorMessage('');
                                            toast.dismiss();
                                            toast.success('Collection created successfully!')
                                        }}
                                        disabled={!editMode || error || newCollectionName?.length === 0}
                                    >
                                        Create
                                    </button>
                                    <button className={css`
                                    padding: ${!editMode ? '0 1rem' : '0.5rem 1rem'};
                                    box-shadow: -2px 0px 0px 0px #333;
                                    border: none;
                                    outline: none;
                                    color: #fff;
                                    cursor: pointer;
                                    height: 100%;
                                    // box-shadow: -2px 0px 0px 0px #999;
                                    background-color: #333;
                                    &:hover {
                                        background-color: #222;
                                    }
                                    &:disabled {
                                        cursor: auto;
                                        background-color: #333;
                                        color: #999;
                                    }
                                    display: ${collections.length === 0 ? 'none' : 'flex'};
                                    `}
                                        onClick={() => {
                                            setEditMode(false);
                                            setNewCollectionName('');
                                            setError(false);
                                            setErrorMessage('');
                                        }}
                                        disabled={!editMode}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                )}
                            </div>
                    </div>
                </div>
            </div>
    )
}

export default InputCollection;