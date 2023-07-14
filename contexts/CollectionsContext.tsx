import { createContext, useContext, useReducer } from 'react';

export const collectionsInitialState = {
    collections: [],
    collection: {},
    collection_id: 0,

    modal: false,
    modalContent: null,
    modalType: null,
};

export const CollectionsContext = createContext<{
    state: any;
    dispatch: any;
}>({
    state: collectionsInitialState,
    dispatch: () => null
});

export const CollectionsDispatchContext = createContext<any>(null);
export const CollectionsProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(collectionsReducer, collectionsInitialState);

    return (
        <CollectionsContext.Provider value={state}>
            <CollectionsDispatchContext.Provider value={dispatch}>
                {children}
            </CollectionsDispatchContext.Provider>
        </CollectionsContext.Provider>
    );
}

export const collectionsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_COLLECTIONS':
            return {
                ...state,
                collections: action.collections
            };
        case 'SET_COLLECTION':
            return {
                ...state,
                collection: action.collection
            };
        case 'SET_COLLECTION_ID':
            return {
                ...state,
                collection_id: action.collection_id
            };
        case 'SET_MODAL':
            return {
                ...state,
                modal: action.modal
            };
        case 'SET_MODAL_CONTENT':
            return {
                ...state,
                modalContent: action.modalContent
            };
        case 'SET_MODAL_TYPE':
            return {
                ...state,
                modalType: action.modalType
            };
        default:
            return state;
    }
};

export const useCollections = () => useContext(CollectionsContext);

export const useCollectionsDispatch = () => useContext(CollectionsDispatchContext);

export default CollectionsContext;