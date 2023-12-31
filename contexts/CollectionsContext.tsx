import { createContext, useContext, useReducer } from "react";

export const collectionsInitialState = {
  collections: [],
  collection: {},
  collection_id: 0,

  modal: false,
  modalContent: null,
  modalType: null,

  dropdown: false,
  dropdownContent: null,
  dropdownType: null,
};

export const CollectionsContext = createContext<any>(null);

export const CollectionsDispatchContext = createContext<any>(null);
export const CollectionsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(
    collectionsReducer,
    collectionsInitialState,
  );

  return (
    <CollectionsContext.Provider value={state}>
      <CollectionsDispatchContext.Provider value={dispatch}>
        {children}
      </CollectionsDispatchContext.Provider>
    </CollectionsContext.Provider>
  );
};

export const collectionsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_ALL_COLLECTIONS":
      const allCollections = action.allCollections;
      return {
        ...state,
        collections: allCollections,
      };
    case "SET_COLLECTIONS":
      const newCollections = action.newCollections;
      if (newCollections !== null) {
        return {
          ...state,
          collections: [...state.collections, newCollections],
        };
      } else {
        return {
          ...state,
        };
      }
    case "ADD_MEDIA_TO_COLLECTION_BY_TITLE":
      const media = action.mediaToAdd;
      const collectionTitle = action.collectionTitle;
      const newCollectionsAfterAddMedia = state.collections.map(
        (collection: any) => {
          if (collection?.title === collectionTitle) {
            return {
              ...collection,
              media: [...collection.media, media],
            };
          } else {
            return collection;
          }
        },
      );
      return {
        ...state,
        collections: newCollectionsAfterAddMedia,
      };
    case "REMOVE_MEDIA_FROM_COLLECTION_BY_TITLE":
      const mediaToRemove = action.mediaToRemove;
      const title = action.collectionTitle;
      const newCollectionsAfterRemoveMedia = state.collections.map(
        (collection: any) => {
          if (collection?.title === title) {
            collection.media = collection.media.filter((m: any) => {
              m?.id !== mediaToRemove?.id;
            });
            return collection;
          } else {
            return collection;
          }
        },
      );
      return {
        ...state,
        collections: newCollectionsAfterRemoveMedia,
      };
    case "REMOVE_ALL_COLLECTIONS":
      return {
        ...state,
        collections: [],
      };
    case "DELETE_COLLECTION":
      const deleteCollection = action.deleteCollection;
      const newCollectionsAfterDelete = state.collections.filter(
        (collection: any) => collection.id !== deleteCollection.id,
      );
      return {
        ...state,
        collections: newCollectionsAfterDelete,
      };
    case "EDIT_COLLECTION":
      const editCollection = action.editCollection;
      const oldCollection = action.oldCollection;
      const newCollectionsAfterEdit = state.collections.filter(
        (collection: any) => collection.id !== oldCollection.id,
      );
      newCollectionsAfterEdit.push(editCollection);
      return {
        ...state,
        collections: newCollectionsAfterEdit,
      };
    case "SET_COLLECTION":
      return {
        ...state,
        collection: action.collection,
      };
    case "SET_COLLECTION_ID":
      return {
        ...state,
        collection_id: action.collection_id,
      };
    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal,
      };
    case "SET_MODAL_CONTENT":
      return {
        ...state,
        modalContent: action.modalContent,
      };
    case "SET_MODAL_TYPE":
      return {
        ...state,
        modalType: action.modalType,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
        modalContent: null,
        modalType: null,
      };
    case "SET_DROPDOWN":
      return {
        ...state,
        dropdown: action.dropdown,
      };
    case "SET_DROPDOWN_CONTENT":
      return {
        ...state,
        dropdownContent: action.dropdownContent,
      };
    case "SET_DROPDOWN_TYPE":
      return {
        ...state,
        dropdownType: action.dropdownType,
      };
    default:
      return state;
  }
};

export const useCollections = () => useContext(CollectionsContext);

export const useCollectionsDispatch = () =>
  useContext(CollectionsDispatchContext);

export default CollectionsContext;
