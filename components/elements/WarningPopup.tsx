import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import { toast } from "react-toastify";

const WarningPopup = ({
    collection,
    showDeletePopup,
    setShowDeletePopup,
}: any) => {
    const {collections} = useCollections()
    const dispatch = useCollectionsDispatch()
    return (
        <>
        {showDeletePopup && (
        <div className={css`
        display: fixed;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        `}>
            {/*  popup dialog */}   
            <div className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 300px;
            height: 200px;
            border-radius: 10px;
            margin: 0 auto;
            background-color: #fff;
            color: #333;
            padding: 1rem;
            gap: 1rem;
            `}>
                <h1 className={css`
                font-size: 1.5rem;
                font-weight: 500;
                `}>Warning</h1>
                <p className={css`
                font-size: 1rem;
                font-weight: 300;
                `}>Are you sure you want to delete this collection?</p>
                <div className={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                `}>
                    <button className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 40px;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.25s ease-in-out;
                    background-color: transparent;
                    color: #333;
                    margin: auto;
                    border: 1px solid #999;

                    &:hover {
                        background-color: #555;
                        color: #fff;
                    }
                    `}
                    onClick={() => {
                        dispatch({ type: 'DELETE_COLLECTION', deleteCollection: collection });
                        localStorage.setItem('collections', JSON.stringify([...collections.filter((c: any) => c.id !== collection.id)]));
                        dispatch({ type: 'SET_MODAL', modal: false });
                        setShowDeletePopup(false);
                        toast.success('Collection deleted successfully!');
                    }}
                    >Yes</button>
                    <button className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100px;
                    height: 40px;
                    border: none;
                    border-radius: 5px;
                    color: #fafafa;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.25s ease-in-out;
                    background-color: #888;
                    margin: auto;

                    &:hover {
                        background-color: #555;
                    }
                    `}
                    onClick={() => {
                        setShowDeletePopup(false);
                    }}
                    >No</button>
                </div>
            </div>
        </div>  
        )}
        </>
    )
}

export default WarningPopup;