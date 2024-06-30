import React, { useState } from "react";
import Button from "./button.tsx";
import { createPortal } from "react-dom";
import styles from "../../style/modal.module.css";

type ModalProps = {
    content: (props: { onClose: () => void }) => React.ReactNode;
    title: string;
};

const Modal: React.FC<ModalProps> = ({ content: Content, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            {isModalOpen ? createPortal(<div className={styles.overlay}></div>, document.body) : null}
            {isModalOpen
                ? createPortal(
                      <Content
                          onClose={() => {
                              setIsModalOpen(false);
                          }}
                      />,
                      document.body
                  )
                : null}
            <Button
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                {title}
            </Button>
        </div>
    );
};

export default Modal;
