import {
  useCollections,
  useCollectionsDispatch,
} from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import ModalBase from "@/components/modals/ModalBase";
import Image from "next/image";
import parse from "html-react-parser";
import { SetStateAction, use, useEffect, useState } from "react";
import Case2 from "@/components/cases/Case2";
import { toast } from "react-toastify";
import Case1 from "@/components/cases/Case1";
import Case3 from "@/components/cases/Case3";

const Modal = () => {
  const [isMobile, setIsMobile] = useState(false);
  const state = useCollections();
  const modal: boolean = state?.modal;
  const modalType: string = state?.modalType;
  const modalContent: any = state?.modalContent;
  const collections: any[] = state?.collections;
  const dispatch = useCollectionsDispatch();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [error, setError] = useState("");
  const [selectedCollections, setSelectedCollections] = useState([] as any);
  const [editCollectionName, setEditCollectionName] = useState(null);
  const [editCollectionId, setEditCollectionId] = useState(null as any);
  const [errorEdit, setErrorEdit] = useState("");
  const [selectChange, setSelectChange] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (modal) {
      setSelectChange(false);
    }
  }, [modal]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    setNewCollectionName(value);
    const regex = /^[a-zA-Z0-9_ ]*$/;
    if (!regex.test(value)) {
      setError("Please enter a valid name");
      return;
    }
    if (collections?.find((collection: any) => collection?.title === value)) {
      setError("This name is already exist");
      return;
    }
    setError("");
  };

  const handleEdit = (e: any) => {
    const value = e.target.value;
    //    not allow using special characters
    //  not allow to use the same name
    setEditCollectionName(value);
    const regex = /^[a-zA-Z0-9_ ]*$/;
    if (!regex.test(value)) {
      setErrorEdit("Please enter a valid name");
      return;
    } else {
      setErrorEdit("");
    }

    if (collections?.find((collection: any) => collection?.title === value)) {
      setErrorEdit("This name is already exist");
      return;
    } else {
      setErrorEdit("");
    }
  };

  const handleSelect = (e: any, title: any) => {
    const value = e.target.checked;
    if (value) {
      setSelectedCollections([...selectedCollections, title]);
    } else {
      setSelectedCollections(
        selectedCollections.filter((collection: any) => collection !== title)
      );
    }

    setSelectChange(true);
  };

  useEffect(() => {
    // if modalContent id is exist in multiple collections, check the checkbox
    if (modalContent?.id) {
      const collections = state?.collections?.filter(
        (collection: any) =>
          collection?.media?.find((m: any) => m?.id === modalContent?.id)
      );
      console.log("on modal open, collections: ", collections);
      if (collections?.length > 0) {
        setSelectedCollections(
          collections.map((collection: any) => collection?.title)
        );
      } else {
        setSelectedCollections([]);
      }
    }
  }, [modal, modalContent?.id, state?.collections]);

  return (
    <ModalBase open={modal}>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 1rem 0.25rem;
          overflow-y: auto;
        `}>
        {collections?.length === 0 ? (
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: start;
              width: 100%;
              padding: 1rem 0.25rem;
              border: none;
              gap: 1rem;
              height: 100%;

              @media (min-width: 768px) {
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 2rem;
              }
            `}>
            {/* case 1 */}
            <Case1
              collections={collections}
              dispatch={dispatch}
              modalContent={modalContent}
              selectedCollections={selectedCollections}
              error={error}
              errorEdit={errorEdit}
              newCollectionName={newCollectionName}
              editCollectionId={editCollectionId}
              editCollectionName={editCollectionName}
              handleSelect={handleSelect}
              handleChange={handleChange}
              handleEdit={handleEdit}
              setNewCollectionName={setNewCollectionName}
              setSelectedCollections={setSelectedCollections}
              setEditCollectionId={setEditCollectionId}
              setEditCollectionName={setEditCollectionName}
              selectChange={selectChange}
            />
          </div>
        ) : (
          <>
            {modalType === "show_collections" && (
              <div
                className={css`
                  display: flex;
                  flex-direction: column;
                  align-items: start;
                  width: 100%;
                  padding: 1rem 0.25rem;
                  border: none;
                  gap: 1rem;
                  height: 100%;

                  @media (min-width: 768px) {
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 2rem;
                  }
                `}>
                <Case2
                  collections={collections}
                  dispatch={dispatch}
                  modalContent={modalContent}
                  selectedCollections={selectedCollections}
                  error={error}
                  errorEdit={errorEdit}
                  newCollectionName={newCollectionName}
                  editCollectionId={editCollectionId}
                  editCollectionName={editCollectionName}
                  handleSelect={handleSelect}
                  handleChange={handleChange}
                  handleEdit={handleEdit}
                  setNewCollectionName={setNewCollectionName}
                  setSelectedCollections={setSelectedCollections}
                  setEditCollectionId={setEditCollectionId}
                  setEditCollectionName={setEditCollectionName}
                  selectChange={selectChange}
                />
              </div>
            )}

            {modalType === "edit" && <Case3 />}
          </>
        )}
      </div>
    </ModalBase>
  );
};

export default Modal;
