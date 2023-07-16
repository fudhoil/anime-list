import { useCollections, useCollectionsDispatch } from '@/contexts/CollectionsContext'
import {css} from '@emotion/css'
import parse from 'html-react-parser'
import CardElement from './CardElement'
import BackMainCollections from './BackMainCollections'
import EditElement from './EditElement'
import Image from 'next/image'

const Case3 = ({
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
    const {
        collections,
        collection,
    } = useCollections()
    const dispatch = useCollectionsDispatch()
    return (
        <div className={css`
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
        padding: 1rem 0.25rem;
        border: none;
        gap: 1rem;
        height: 100%;
        `}>
                {/* button arrow back */}
                <BackMainCollections />
                <div className={css`
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: start;
                gap: 1rem;
                `}>
                    <div className={css`
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    `}>
                    <EditElement
                        modalContent={modalContent}
                        newModalContent={newModalContent}
                        newCollectionName={newCollectionName}
                        setNewCollectionName={setNewCollectionName}
                        editCollectionName={editCollectionName}
                        editCollectionId={editCollectionId}
                        handleChange={handleChange}
                        handleEdit={handleEdit}
                        setEditCollectionId={setEditCollectionId}
                        setEditCollectionName={setEditCollectionName}
                        error={error}
                        errorEdit={errorEdit}
                        handleSelect={handleSelect}
                        selectedCollections={selectedCollections}
                        selectChange={selectChange}
                        collection={collection}
                    />
                    </div>
                    
                    {/* line */}
                    <div className={css`
                    width: 100%;
                    height: 1px;
                    background-color: #e5e5e5;
                    `}></div>
                    
                    <div className={css`
                    display: flex;
                    width: 100%;
                    gap: 1rem;
                    justify-content: center;
                    `}>
                        <div className={css`
                        display: flex;
                        width: 100%;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 1rem;

                        @media (max-width: 768px) {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
                        }
                        `}>
                            {collection?.media?.map((media: any) => (
                                <CardElement media={media} key={media?.id} />
                            ))}
                            {/* if the is no media */}
                            {collection?.media?.length === 0 && (
                                    <div className={css`
                                    display: flex;
                                    width: 100%;
                                    height: 100%;
                                    flex-direction: column;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 1rem;
                                    `}>
                                        <Image
                                            src="/icons/empty.svg"
                                            alt="empty"
                                            width={100}
                                            height={100}
                                        />
                                        <p className={css`
                                        font-size: 1rem;
                                        font-weight: 400;
                                        line-height: 1.5;
                                        `}>There is no item in this collection</p>
                                    </div>
                            )}
                        </div>
            </div>
        </div>
    </div>
    )
}

export default Case3