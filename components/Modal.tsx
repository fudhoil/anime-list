import { useCollections, useCollectionsDispatch } from "@/contexts/CollectionsContext";
import { css } from "@emotion/css";
import ModalBase from "./elements/ModalBase";
import Image from "next/image";
import parse from "html-react-parser";
import { useEffect, useState } from "react";

const Modal = ({ children, open, setOpen }: { children: any, open: boolean, setOpen: any }) => {
    const [isMobile, setIsMobile] = useState(false);
    const collections = useCollections();
    const dispatch = useCollectionsDispatch();
    const modalType = collections?.state?.modalType;
    const modalContent = collections?.state?.modalContent;

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    return (
        <ModalBase open={open} setOpen={setOpen}>
            <div className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: 1rem 0.25rem;
                overflow-y: scroll;
                `}>
                {modalType === 'show_details' && (
                    <div className={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                margin: 0 auto;
                padding: 1rem 0.25rem;
                `}>
                        <h1 className={css`
                        font-size: 2rem;
                        margin: 2rem 0;
                        `}>
                            {modalContent?.title?.romaji}
                        </h1>
                        <div className={css`
                            display: flex;
                            flex-direction: ${isMobile ? 'column' : 'row'};
                            width: 100%;
                            margin: 0 auto;
                            gap: 2rem;

                            `}>
                            {/* image container */}
                            <div className={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-width: 50vh;
                        max-width: 50vh;
                        margin: 0 auto;
                        `}>
                                <Image src={modalContent?.coverImage?.large} alt={modalContent?.title?.romaji} layout="responsive" width={300} height={300} />
                            </div>
                            <p className={css`
                            font-size: 1.2rem;
                            font-weight: 400;
                            text-align: ${isMobile ? 'justify' : 'left'};
                            `}>
                                {parse(modalContent?.description)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ModalBase>
    )
}

export default Modal;