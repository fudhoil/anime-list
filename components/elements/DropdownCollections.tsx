import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import {toast} from 'react-toastify'

const DropdownCollections = ({
    media,
    isLeft,
}: any) => {
    const {collections, dropdownContent, dropdownType, dropdown} = useCollections()
    const dispatch = useCollectionsDispatch()
    console.log('media', media)

    return (        
        <>
            {/* adding new media to collection */}
            <div className={css`
            position: absolute;
            bottom: 100%;
            right: 0;
            width: 100%;
            transition: all 0.2s ease-in-out;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            padding: 1rem;
            min-height: 400%;
            max-height: 900%;
            background-color: #111;
            display: ${dropdown && dropdownContent?.id === media?.id && dropdownType === 'add_to_collection' ? 'flex' : 'none'};
            `}>
                {/* title */}

                <div className={css`
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                `}>
                    <span className={css`
                    font-size: 0.8rem;
                    font-weight: 600;
                    margin-right: auto;
                    `}>Collections</span>

                    {/* svg info */}
                    <svg className={css`
                    width: 1rem;
                    height: 1rem;
                    cursor: pointer;
                    fill: #222;
                    transition: all 0.25s ease-in-out;
                    &:hover {
                        fill: #111;
                    }
                    `} onClick={() => {
                        toast.info('Click any available collection to add or remove this item from it')
                    }} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </div>

                {/* line */}
                <div className={css`
                width: 100%;
                height: 1px;
                background-color: #333;
                margin: 0.5rem 0;
                `}/>
                <div className={css`
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: start;
                align-items: center;
                overflow-y: auto;
                height: 100%;
                `}>
                
                {collections?.length === 0 && (
                    <>
                    {/* button add New Collection */}
                    <button className={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: none;
                    background-color: transparent;
                    border-radius: 5px;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.25s ease-in-out;
                    background-color: #333;
                    color: #fff;

                    &:hover {
                        background-color: #222;
                        color: #fff;
                    }
                    `}
                        onClick={() => {
                            dispatch({type: 'SET_MODAL', modal: true})
                            dispatch({type: 'SET_MODAL_TYPE', modalType: 'new_collection'})
                            dispatch({type: 'SET_MODAL_CONTENT', modalContent: media})
                        }}
                    >
                        <span className={css`
                        font-size: 0.75rem;
                        font-weight: 300;
                        `}>New Collection</span>
                        <span className={css`
                        font-size: 0.75rem;
                        font-weight: 300;
                        `}>+</span>
                    </button>
                    </>
                )}

                {collections?.map((collection: any) => (
                    <button className={css`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border: none;
                    background-color: transparent;
                    border-radius: 5px;
                    cursor: pointer;
                    outline: none;
                    transition: all 0.25s ease-in-out;

                    &:hover {
                        background-color: #333;
                        color: #fff;
                    }
                    `} key={collection.id} 
                        onClick={() => {
                            if (collections?.find((c: any) => c.title === collection?.title)?.media?.find((m: any) => m?.id === dropdownContent?.id)) {
                                dispatch({type: 'REMOVE_MEDIA_FROM_COLLECTION_BY_TITLE', mediaToRemove: dropdownContent, collectionTitle: collection.title})
                                localStorage.setItem('collections', JSON.stringify([...collections?.filter((c: any) => c.title !== collection.title), {title: collection.title, media: [...collections?.find((c: any) => c.title === collection.title)?.media?.filter((m: any) => m?.id !== dropdownContent?.id)]}]))

                                // if there are toasts, remove them
                                toast.dismiss()
                                toast.success(`Removed ${dropdownContent?.title?.romaji} from ${collection.title}`)
                            } else {
                                dispatch({type: 'ADD_MEDIA_TO_COLLECTION_BY_TITLE', mediaToAdd: dropdownContent, collectionTitle: collection.title})
                                localStorage.setItem('collections', JSON.stringify([...collections?.filter((c: any) => c.title !== collection.title), {title: collection.title, media: [...collections?.find((c: any) => c.title === collection.title)?.media, dropdownContent]}]))

                                // if there are toasts, remove them
                                toast.dismiss()
                                toast.success(`Added ${dropdownContent?.title?.romaji} to ${collection.title}`)
                            }
                        }}>
                        <p className={css`
                        font-size: 0.75rem;
                        font-weight: 600;
                        margin-right: auto;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        `}
                        >{collection.title}</p>
                        {/* if media is in collection, show checkmark */}
                        {collections?.find((c: any) => c.title === collection.title)?.media?.find((m: any) => m?.id === dropdownContent?.id) ? (
                            <svg className={css`
                            width: 1rem;
                            height: 1rem;
                            fill: #fff;
                            `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M18.707 4.293a1 1 0 010 1.414l-10 10a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L8 13.586l9.293-9.293a1 1 0 011.414 0z" />
                            </svg>
                        ) : (
                            <>
                            </>
                        )}
                    </button>
                ))}
                </div>
            </div>
        </>
    )
}

export default DropdownCollections