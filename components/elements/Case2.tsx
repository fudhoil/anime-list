import {css} from '@emotion/css'
import parse from 'html-react-parser'
import Image from 'next/image';
import { useCollections, useCollectionsDispatch } from '@/contexts/CollectionsContext';
import InputCollection from './InputCollection';
import TitleModal from './TitleModal';

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
            font-size: 0.75rem;
            font-weight: 300;
            `}>
           

            {/* or create new collection */}
            <InputCollection />

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
                <TitleModal>
                    My Collections
                </TitleModal>

                <div className={css`
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                align-items: center;
                gap: 1rem;
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
                            background-color: transparent;
                            border: none;
                            box-shadow: -2px 0px 0px 0px #333;
                            color: #fff;
                            cursor: pointer;
                            gap: 1rem;

                            &:hover {
                                background-color: #222;
                                color: #fff;
                            }

                            @media screen and (max-width: 768px) {
                                padding: 0.5rem;
                                flex-direction: column;
                                align-items: start;
                                gap: 0.5rem;
                            }
                            `} 
                            onClick={() => {
                                dispatch({ type: 'SET_MODAL_TYPE', modalType: 'edit' });
                                dispatch({ type: 'SET_COLLECTION', collection });
                            }}
                            key={collection?.id}
                            >
                                <div className={css`
                                width: 100px;
                                height: 150px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                `}>
                                    <Image src={collection?.media[0]?.coverImage?.medium} alt={collection?.media[0]?.title?.romaji} 
                                    layout='responsive' width={100} height={150}
                                    onError={(e: any) => {
                                        e.target.onerror = null;
                                        e.target.src = '/icons/empty.svg';
                                    }} />
                                </div>
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