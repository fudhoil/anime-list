import { useCollections, useCollectionsDispatch } from '@/contexts/CollectionsContext'
import {css} from '@emotion/css'
import parse from 'html-react-parser'
import CardElement from './CardElement'
import BackMainCollections from './BackMainCollections'
import EditElement from './EditElement'

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
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
                    gap: 1rem;
                    width: 100%;
                    justify-content: center;
                    `}>
                        {collection?.media?.map((media: any) => (
                            <CardElement media={media} key={media.id} />
                        ))}
            </div>
        </div>
    </div>
    )
}

export default Case3