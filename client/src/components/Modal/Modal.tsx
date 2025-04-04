import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useModal } from "../Contexts/ModalContext";
import Style from "./Modal.module.css";
interface ModalProps {
  children?: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const { isOpen, closeModal, modalRef, targetModal, isScrollable } =
    useModal(); // Récupération du state du context
  const clickedOnOverlay = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!event?.target) return;
    if (event.currentTarget) {
      if (event.target === event.currentTarget) closeModal();
    }
  };

  return (
    <>
      {isOpen &&
        createPortal(
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            className={`${isScrollable ? Style.OverLayWithScroll : Style.modalOverlay}`}
            onClick={clickedOnOverlay}
          >
            <div
              ref={modalRef}
              className={`${isScrollable ? Style.scrollageItem : Style.showItem}`}
            >
              <div
                ref={modalRef}
                className={`${Style.showItem} ${isScrollable ? Style.scrollable : ""}`}
              >
                {targetModal || children}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Modal;
