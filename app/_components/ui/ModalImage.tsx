"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function ModalImage({
  image,
  className,
  modalId,
  isInTable = false,
}: {
  image: React.ReactElement;
  className: string;
  modalId: string;
  isInTable?: boolean;
}) {
  const [open, setOpen] = useState("");

  return (
    <>
      {isInTable ? (
        <motion.th
          className={`cursor-zoom-in w-[95%] h-[100px]  relative`}
          role="button"
          onClick={() => setOpen(modalId)}
          layoutId={modalId}
        >
          {image}
        </motion.th>
      ) : (
        <motion.div
          className={`cursor-zoom-in ${className}`}
          role="button"
          onClick={() => setOpen(modalId)}
          layoutId={modalId}
        >
          {image}
        </motion.div>
      )}
      <AnimatePresence>
        {open && (
          <motion.dialog
            className="fixed w-full h-screen left-0 top-0 cursor-zoom-out flex-center bg-black/35 backdrop-blur-md z-[50] "
            role="button"
            layoutId={open}
            onClick={() => setOpen("")}
          >
            <div className="h-[60%] w-[60%] relative">{image}</div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </>
  );
}

export default ModalImage;
