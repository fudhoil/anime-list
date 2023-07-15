import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import ModalBase from "./elements/ModalBase";
import Image from "next/image";
import parse from "html-react-parser";
import { SetStateAction, use, useEffect, useState } from "react";
import Case2 from "./elements/Case2";

const Modal = () => {
    const [isMobile, setIsMobile] = useState(false);
    const state = useCollections();
    const modal: boolean = state?.modal;
    const modalType: string = state?.modalType;
    const modalContent: any = state?.modalContent;
    const collections: any[] = state?.collections;
    const dispatch = useCollectionsDispatch();
    const [newCollectionName, setNewCollectionName] = useState('');
    const [error, setError] = useState('');
    const [selectedCollections, setSelectedCollections] = useState([] as any);
    const [editCollectionName, setEditCollectionName] = useState(null);
    const [editCollectionId, setEditCollectionId] = useState(null as any);
    const [errorEdit, setErrorEdit] = useState('');
    const [selectChange, setSelectChange] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        if (modal) {
            setSelectChange(false);
        }
    }, [modal]);

    const handleChange = (e: any) => {
        const value = e.target.value;
        if (value.length > 0) {
            if (value.length > 50) {
                setError('Collection title is too long.');
            } else {
                setError('');
            }
            // if value is exist in collections, show error
            if (collections?.find((collection: any) => collection.title === value)) {
                setError('Collection title is already exist.');
            } else {
                setError('');
            }
        } else {
            setError('');
        }
            setNewCollectionName(value);
    }

    const handleEdit = (e: any) => {
        const value = e.target.value;
        if (value.length > 0) {
            if (value.length > 50) {
                setErrorEdit('Collection title is too long.');
            } else {
                setErrorEdit('');
            }
            // if value is exist in collections, show error
            if (collections?.find((collection: any) => collection.title === value)) {
                setErrorEdit('Collection title is already exist.');
            } else {
                setErrorEdit('');
            }
        } else {
            setErrorEdit('title is required.');
        }

        setEditCollectionName(value);
    }

    const handleSelect = (e: any, title: any) => {
        const value = e.target.checked;
        if (value) {
            setSelectedCollections([...selectedCollections, title]);
        } else {
            setSelectedCollections(selectedCollections.filter((collection:any) => collection !== title));
        }

        setSelectChange(true);
    }

    useEffect(() => {
        // if modalContent id is exist in multiple collections, check the checkbox
        if (modalContent?.id) {
            const collections = state?.collections?.filter((collection: any) => collection?.media?.find((m: any) => m?.id === modalContent?.id));
            console.log('on modal open, collections: ', collections);
            if (collections?.length > 0) {
                setSelectedCollections(collections.map((collection: any) => collection?.title));
            } else {
                setSelectedCollections([]);
            }
        }
    }, [modal, modalContent?.id, state?.collections]);

    return (
        <ModalBase open={modal}>
            <div className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: 1rem 0.25rem;
                overflow-y: auto;
                `}>

                {modalType === 'add_to_collection' && (
                    <div className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    width: 100%;
                    padding: 1rem 0.25rem;
                    border: none;
                    gap: 1rem;
                    height: 100%;

                    @media (min-width: 768px) {
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 2rem;
                    }
                    `}>
                        {/* case 1 */}
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
                                    <div className={css`
                                    display: flex;
                                    width: 200px;
                                    `}>
                                        <Image src={modalContent?.coverImage?.large} alt={modalContent?.title?.romaji} layout="responsive" width={300} height={300} />
                                    </div>
                                    <h2>{modalContent?.title?.romaji}</h2>
                                    <p className={css`
                                    font-size: 0.75rem;
                                    font-weight: 300;
                                    line-height: 1.5;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 3;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    `}>
                                        {parse(modalContent?.description)}</p>

                                    <div className={css`
                                    display: flex;
                                    flex-direction: row;
                                    width: 100%;
                                    `}>
                                        <button className={css`
                                        padding: 0.5rem 1rem;
                                        border-radius: 5px;
                                        background-color: #333;
                                        color: #fff;
                                        border: none;
                                        outline: none;
                                        margin-left: auto;
                                        width: 100%;
                                        cursor: pointer;

                                        &:disabled {
                                            display: none;
                                        }
                                        `} disabled>Add</button>
                                    </div>

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
                                            dispatch({ type: 'SET_COLLECTIONS', newCollections: { title: newCollectionName, media: [] } });
                                            setNewCollectionName('');
                                            localStorage.setItem('collections', JSON.stringify([...collections, { title: newCollectionName, media: [] }]));
                                        }}
                                        disabled={error?.length > 0 || newCollectionName?.length < 1}
                                    > Create</button>
                                </div>
                            </>
                        )}

                        {/* case 2 */}
                        <Case2
                            collections={collections}
                            dispatch={dispatch}
                            modalContent={modalContent}
                            selectedCollections={selectedCollections}
                            error={error}
                            errorEdit={errorEdit}
                            newCollectionName={newCollectionName}
                            editCollectionId={editCollectionId}
                            editCollectionName={editCollectionName}
                            handleSelect={handleSelect}
                            handleChange={handleChange}
                            handleEdit={handleEdit}
                            setNewCollectionName={setNewCollectionName}
                            setSelectedCollections={setSelectedCollections}
                            setEditCollectionId={setEditCollectionId}
                            setEditCollectionName={setEditCollectionName}
                            selectChange={selectChange}
                        />
                    </div>
                )}
            </div>
        </ModalBase >
    )
}

export default Modal;