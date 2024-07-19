"use client";
import useClickOutside from "@/app/_hooks/useClickOutside";
import { useTranslate } from "@/app/_hooks/useTranslate";
import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal, useFormStatus } from "react-dom";

interface ModalContextType {
  openId: string;
  close: () => void;
  open: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [openId, setOpenId] = useState<string>("");
  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <ModalContext.Provider value={{ openId, close, open }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

interface OpenModalProps {
  id: string;
  isFull?: boolean;
  children: React.ReactNode;
}

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal context must be used within a Modal provider");
  }
  return context;
}

function OpenModal({ id, children, isFull }: OpenModalProps) {
  const { t } = useTranslate();
  const { open } = useModalContext();
  const { pending } = useFormStatus();
  function handleClick() {
    open(id);
  }

  return (
    <button
      disabled={pending}
      onClick={handleClick}
      type="button"
      className={`${
        isFull ? "w-full duration-300 hover:bg-accent rounded-lg" : ""
      }`}
    >
      {pending ? t("Loading") : children}
    </button>
  );
}

interface ContentProps {
  id: string;
  children: (props: { close: () => void }) => React.ReactNode;
}

function Content({ id, children }: ContentProps) {
  const { openId, close } = useModalContext();
  const elementRef = useRef<HTMLDivElement>(null);

  useClickOutside([elementRef], () => {
    close();
  });
  // await new Promise((res) => setTimeout(res, 500));

  if (openId !== id) return null;

  return createPortal(
    <div
      className="fixed z-[150] w-full h-screen flex-center bg-black/30 top-0 left-0  overflow-auto "
      onClick={(e) => e.stopPropagation()}
    >
      <div ref={elementRef} className={` w-[90%] md:w-[70%] max-w-[650px] `}>
        {children({ close })}
      </div>
    </div>,
    document.body
  );
}

Modal.OpenModal = OpenModal;
Modal.Content = Content;

export default Modal;
