import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import ModalBase from "./elements/ModalBase";
import Image from "next/image";
import parse from "html-react-parser";
import { SetStateAction, use, useEffect, useState } from "react";

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

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

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

    const handleSelect = (e: any, title: any) => {
        const value = e.target.checked;
        if (value) {
            setSelectedCollections([...selectedCollections, title]);
        } else {
            setSelectedCollections(selectedCollections.filter((collection:any) => collection !== title));
        }
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
    }, [modalContent?.id, state?.collections]);

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
                                            localStorage.setItem('collections', JSON.stringify([...collections]));
                                        }}
                                        disabled={error?.length > 0 || newCollectionName?.length < 1}
                                    > Create</button>
                                </div>
                            </>
                        )}

                        {/* case 2 */}
                        {collections?.length >= 1 && (
                            <div className={css`
                            display: flex;
                            flex-direction: column;
                            align-items: start;
                            width: 100%;
                            height: 100%;
                            `}>
                            {/* modalContent detail as a small card at top */}
                            <div className={css`
                            display: flex;
                            flex-direction: column;
                            align-items: start;
                            width: 100%;
                            border: none;
                            gap: 1rem;
                            `}>
                                <div className={css`
                                display: flex;
                                width: 100%;
                                flex-direction: row;
                                overflow-y: auto;
                                gap: 1rem;
                                `}>
                                    <div className={css`
                                    display: flex;
                                    width: 50rem;

                                    @media (max-width: 1024px) {
                                        display: none;
                                    }
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
                                </div>
                            {/* line */}
                            <div className={css`
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            border: none;
                            border-bottom: 1px solid #333;
                            `}/>
                            </div>

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
                                        localStorage.setItem('collections', JSON.stringify([...collections]));
                                    }}
                                    disabled={error?.length > 0 || newCollectionName?.length < 1}
                                > Create</button>
                                </div>

                            {/* pick which collections */}
                            <div className={css`
                            display: flex;
                            flex-direction: column;
                            align-items: start;
                            width: 100%;
                            padding: 1rem 0.25rem;
                            border: none;
                            gap: 1rem;
                            `}>
                                <h2>Or Pick a collection</h2>
                                <div className={css`
                                display: flex;
                                flex-direction: column;
                                align-items: start;
                                width: 100%;
                                padding: 1rem 0.25rem;
                                border: none;
                                height: 10rem;
                                overflow-y: auto;
                                font-size: 0.75rem;
                                font-weight: 300;
                                `}>
                                    {collections?.map((collection: any) => (
                                        <div className={css`
                                        display: flex;
                                        flex-direction: row;
                                        align-items: center;
                                        padding: 0.5rem 1rem;
                                        width: 100%;
                                        border: none;
                                        gap: 1rem;
                                        `}
                                            key={collection.title}
                                        >
                                            <input type="checkbox" className={css`
                                            width: 1rem;
                                            height: 1rem;
                                            `} 
                                            checked={selectedCollections.includes(collection.title)}
                                            onChange={(e) => handleSelect(e, collection.title)}
                                            />
                                            <span>{collection.title}</span>
                                        </div>
                                    ))}
                                </div>

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
                            {/* save and cancel buttons */}
                            <div className={css`
                                display: flex;
                                flex-direction: row;
                                width: 100%;
                                gap: 1rem;
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
                                    `}
                                        onClick={() => {
                                            Array.from(collections).forEach((collection) => {
                                                if (selectedCollections?.includes(collection.title)) {
                                                    if (!collection?.media?.find((media: any) => media.id === modalContent.id)) {
                                                        collection.media = [...collection?.media, modalContent];
                                                    }
                                                } else {
                                                    collection.media = collection?.media.filter((media: any) => media.id !== modalContent.id);
                                                }
                                            });
                                            localStorage.setItem('collections', JSON.stringify([...collections]));
                                            dispatch({ type: 'CLOSE_MODAL' });
                                        }}
                                    >Save</button>
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
                                    `} onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>Cancel</button>
                                    </div>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </ModalBase >
    )
}

export default Modal;