import {css} from '@emotion/css'
import parse from 'html-react-parser'
import Image from 'next/image';
import Button from './Button';
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
    const {collections} = useCollections()
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
                        localStorage.setItem('collections', JSON.stringify([...collections, { title: newCollectionName, media: [] }]));
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
                height: 12rem;
                overflow-y: auto;
                font-size: 0.75rem;
                font-weight: 300;
                `}>
                    {collections?.map((collection: any) => (
                        <>
                            <div className={css`
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            padding: 0.5rem 1rem;
                            width: 100%;
                            border: none;
                            gap: 1rem;
                            position: relative;
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
                                { collection.title === editCollectionId ? (
                                    <div className={css`
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                    width: 100%;
                                    gap: 1rem;
                                    `}>
                                    <input type="text" className={css`
                                    width: 100%;
                                    padding: 0.5rem 1rem;
                                    border-radius: 5px;
                                    border: 1px solid #333;
                                    background-color: #fafafa;
                                    color: #333;
                                    `} value={editCollectionName} onChange={(e) => handleEdit(e)} 
                                    // if not focused, then set editCollectionId to null

                                    />

                                    {/* error message */}
                                    {errorEdit?.length > 0 && (
                                        <span className={css`
                                        font-size: 0.75rem;
                                        font-weight: 300;
                                        line-height: 1.5;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 3;
                                        -webkit-box-orient: vertical;
                                        overflow: hidden;
                                        color: red;
                                        width: 100%;
                                        `}>{errorEdit}</span>
                                    )}
                                    </div>
                                ) : (
                                    <span>{collection.title}</span>
                                )}

                                {/* button to edit and delete collection */}
                                <div className={css`
                                display: flex;
                                flex-direction: row;
                                width: 100%;
                                gap: 1rem;
                                `}>
                                {editCollectionId !== collection.title && editCollectionId === null && (
                                <div className={css`
                                display: flex;
                                flex-direction: row;
                                gap: 1rem;
                                margin-left: auto;
                                `}>
                                        <Button 
                                        text="Edit"
                                        onClick={() => {
                                            setEditCollectionId(collection.title);
                                            setEditCollectionName(collection.title);
                                            }} 
                                            disabled={editCollectionId}
                                        />
                                        
                                        <Button
                                        text="Delete"
                                        onClick={() => {
                                            dispatch({ type: 'DELETE_COLLECTION', deleteCollection: collection });
                                            localStorage.setItem('collections', JSON.stringify([...collections.filter((c: any) => c.title !== collection.title)]));
                                            setEditCollectionId(null);
                                            setEditCollectionName(null);
                                        }}
                                        disabled={editCollectionId}
                                        />
                                </div>
                                )}
                                    {editCollectionId === collection.title && (
                                        <div className={css`
                                        display: flex;
                                        flex-direction: row;
                                        gap: 1rem;
        
                                        // to the right
                                        margin-left: auto;
                                        `}>
                                    <Button
                                    text="Save"
                                    onClick={() => {
                                        if (errorEdit) {
                                            return;
                                        }
                                        dispatch({ type: 'EDIT_COLLECTION', editCollection: { title: editCollectionName, media: collection.media }, oldCollection: collection });
                                        console.log('edit collection', { title: editCollectionName, media: collection.media });
                                        console.log('old collection', collection);
                                        localStorage.setItem('collections', JSON.stringify([...collections.filter((c: any) => c.title !== collection.title), { title: editCollectionName, media: collection.media }]));
                                        setEditCollectionId(null);
                                        setEditCollectionName(null);
                                    }}
                                    disabled={errorEdit?.length > 0 || editCollectionName?.length < 1}
                                    />

                                    {/* cancel */}
                                    <Button
                                    text="Cancel"
                                    onClick={() => {
                                        setEditCollectionId(null);
                                        setEditCollectionName(null);
                                    }}
                                    />
                                    </div>
                                    )}
                                </div>
                            </div>
                            {/* line */}
                            <div className={css`
                            display: absolute;
                            flex-direction: row;
                            width: 100%;
                            border: none;
                            border-bottom: 1px solid #333;
                            bottom: 0;
                            `}/>
                        </>
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

                display: ${selectChange ? 'flex' : 'none'};
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
                            Array.from(collections).forEach((collection: any) => {
                                if (selectedCollections?.includes(collection.title)) {
                                    if (!collection?.media?.find((media: any) => media.id === modalContent.id)) {
                                        collection.media = [...collection?.media, modalContent];
                                        localStorage.setItem('collections', JSON.stringify([...collections, { title: newCollectionName, media: [] }]));
                                    }
                                } else {
                                    collection.media = collection?.media.filter((media: any) => media.id !== modalContent.id);
                                }
                            });
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
        </>
    )
}

export default Case2;