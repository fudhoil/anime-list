import { css } from "@emotion/css";
import Button from "./Button";
import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { toast } from 'react-toastify';
import { useState } from "react";
import WarningPopup from "./WarningPopup";

const EditElement = () => {
    const {collections, collection} = useCollections()
    const dispatch = useCollectionsDispatch()
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [editCollectionId, setEditCollectionId] = useState(null)
    const [editCollectionName, setEditCollectionName] = useState("")
    const [errorEdit, setErrorEdit] = useState("")

    const handleEdit = (e: any) => {
        setEditCollectionName(e.target.value)
        setErrorEdit("")

        // no special characters
        if (e.target.value.match(/^[a-zA-Z0-9 ]*$/)) {
            setErrorEdit("")
        } else {
            setErrorEdit("No special characters allowed")
        }

        // cannot be the same as another collection
        if (collections?.find((c: any) => c.title === e.target.value)) {
            setErrorEdit("Collection name already exists")
        }
    }
    return (
        <>
             { collection.id === editCollectionId ? (
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
                 border-radius: 2px;
                 border: none;
                 outline: none;
                 font-size: 0.75rem;
                 font-weight: 300;
                 line-height: 1.5;
                 background-color: #333;
                 // text color inside input
                 color: #fff;
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
                <>
                {/* collection title */}
                <h2 className={css`
                    font-size: 1.5rem;
                    font-weight: 500;
                    line-height: 1.2;
                    width: 100%;
                    `}>
                        {collection?.title}
                        <span className={css`
                        font-size: 0.75rem;
                        font-weight: 300;
                        line-height: 1.5;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        `}>{collection?.media?.length} items</span>
                    </h2>
                    {/* button edit collection */}
                </>
            )}

            {/* button to edit and delete collection */}
            <div className={css`
            display: flex;
            flex-direction: row;
            width: 100%;
            gap: 1rem;
            `}>
            {editCollectionId !== collection.id && (
            <div className={css`
            display: flex;
            flex-direction: row;
            gap: 1rem;
            margin-left: auto;
            `}>
                    <Button 
                    text="Edit"
                    onClick={() => {
                        setEditCollectionId(collection.id);
                        setEditCollectionName(collection.title);
                        }} 
                        disabled={editCollectionId === collection.id}
                    />
                    
                    <Button
                    text="Delete"
                    onClick={() => {
                        setShowDeletePopup(true)
                    }}
                    disabled={editCollectionId === collection.id}
                    />
            </div>
            )}
                {editCollectionId === collection.id && (
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
                    dispatch({ type: 'EDIT_COLLECTION', editCollection: { 
                        id : collection.id,
                        title: editCollectionName, 
                        media: collection.media }, 
                        oldCollection: collection });
                    
                    dispatch({ type: 'SET_COLLECTION', collection: {
                        id : collection.id,
                        title: editCollectionName,
                        media: collection.media
                    }});

                        localStorage.setItem('collections', JSON.stringify([...collections.filter((c: any) => c.id !== collection.id), { 
                        id : collection.id,
                        title: editCollectionName, 
                        media: collection.media }]));
                    setEditCollectionId(null);
                    setEditCollectionName("");
                    toast.success('Collection edited successfully');
                }}
                disabled={errorEdit?.length > 0 || editCollectionName?.length < 1}
                />

                {/* cancel */}
                <Button
                text="Cancel"
                onClick={() => {
                    setEditCollectionId(null);
                    setEditCollectionName("");
                }}
                />
                </div>
                )}

                <WarningPopup 
                    collection={collection} 
                    showDeletePopup={showDeletePopup}
                    setShowDeletePopup={setShowDeletePopup}
                />
            </div>
        </>
    )
}

export default EditElement