import {css} from '@emotion/css'
import parse from 'html-react-parser'
import Image from 'next/image';
import { useCollections, useCollectionsDispatch } from '@/contexts/CollectionsContext';

const Case2 = ({
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
} : any) => {
    const {collections, modalType} = useCollections()
    const dispatch = useCollectionsDispatch()
    
    return (
        <>
        {(collections?.length >= 1) && (
            <div className={css`
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 100%;
            height: 100%;
            `}>
           

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
                border-radius: 2px;
                border: none;
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
                            media: [] } 
                        });
                        setNewCollectionName('');
                        localStorage.setItem('collections', JSON.stringify([...collections, { 
                            id: id,
                            title: newCollectionName, 
                            media: [] 
                        }]));
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
                <h2>
                    My Collections
                </h2>
                <div className={css`
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 1rem;
                width: 100%;
                `}>
                    {collections?.map((collection: any) => (
                        <>
                           {/* card for every collections with thumbnail */}
                            <button className={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            width: 100%;
                            padding: 0.5rem 1rem;
                            border-radius: 2px;
                            border: none;
                            background-color: #333;
                            color: #fff;
                            cursor: pointer;
                            gap: 1rem;

                            &:hover {
                                background-color: #222;
                                color: #fff;
                            }
                            `} 
                            onClick={() => {
                                dispatch({ type: 'SET_MODAL_TYPE', modalType: 'edit' });
                                dispatch({ type: 'SET_COLLECTION', collection });
                            }}
                            >
                                <Image src={collection?.media[0]?.coverImage?.medium} alt={collection?.media[0]?.title?.romaji} width={50} height={50} />
                                <div className={css`
                                display: flex;
                                flex-direction: column;
                                align-items: start;

                                `}>
                                    <span className={css`
                                    font-size: 1rem;
                                    font-weight: 500;
                                    line-height: 1.5;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    `}>{collection?.title}</span>
                                    <span className={css`
                                    font-size: 0.75rem;
                                    font-weight: 300;
                                    line-height: 1.5;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 1;
                                    -webkit-box-orient: vertical;
                                    overflow: hidden;
                                    `}>
                                    {collection?.media?.length} items</span>
                                </div>
                                <div className={css`
                                display: flex;
                                flex-direction: row;
                                `}>
                                </div>
                            </button>
                        </>
                    ))}
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default Case2;