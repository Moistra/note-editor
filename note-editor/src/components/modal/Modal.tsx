import { ReactNode, useEffect } from "react";
import { Button, Portal } from "@components/";

import style from "@styles/layout/modal.module.scss";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ children, isOpen, closeModal }: ModalProps) => {

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => { 
      e.code === "Escape" ? closeModal() : null;
    }
    document.addEventListener("keydown", closeOnEscape);
   
    return () => document.removeEventListener("keydown", closeOnEscape);
  
  }, [isOpen]);

  return (
    <Portal>
      <div className={style.wrapper} onClick={closeModal}>
        <Button className={style.close_button} >
        &times;
        </Button>
        <div className={style.content} >
          {children}
        </div>
      </div>
    </Portal>
  );
};
// onClick={(e)=> e.stopPropagation()}