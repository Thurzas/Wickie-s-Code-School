import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  type ReactNode,
  type RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

// Interface du contexte
interface ModalContextProps {
  isOpen: boolean;
  openModal: (type?: string, component?: ReactNode) => void;
  closeModal: () => void;
  targetModal: ReactNode | null;
  modalType: string | null;
  modalRef: RefObject<HTMLDivElement | null>;
  isScrollable: boolean;
  setIsScrollable: React.Dispatch<React.SetStateAction<boolean>>;
}

// Création du contexte
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Provider du contexte
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetModal, setTargetModal] = useState<ReactNode | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const openModal = (type?: string, component?: ReactNode) => {
    setModalType(type ?? "default");
    setTargetModal(component);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
    console.info(isOpen);
  };

  useGSAP(() => {
    if (modalRef.current) {
      if (isOpen) {
        gsap.fromTo(
          modalRef.current,
          { x: "-600%", scale: 0.5, opacity: 0 }, // Starting position and opacity
          { x: 0, scale: 1, opacity: 1, duration: 0.5 }, // Ending position and full opacity
        );
      } else {
        gsap.fromTo(
          modalRef.current,
          { x: 0, scale: 1, opacity: 1 }, // Ending position and full opacity
          { x: "600%", scale: 0.5, opacity: 0, duration: 0.5 }, // Starting position and opacity
        );
        console.info("going out ?");
      }
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        targetModal,
        modalType,
        modalRef,
        isScrollable,
        setIsScrollable,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
