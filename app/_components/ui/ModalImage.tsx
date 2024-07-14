"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function ModalImage({
  image,
  className,
}: {
  image: React.ReactElement;
  className: string;
}) {
  const [open, setOpen] = useState("");

  return (
    <>
      <motion.div
        className={`cursor-zoom-in ${className}`}
        role="button"
        layoutId="test"
        onClick={() => setOpen("test")}
      >
        {image}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.dialog
            className="fixed w-full h-screen left-0 top-0 cursor-zoom-out flex-center bg-black/35 backdrop-blur-md z-50 "
            role="button"
            layoutId={open}
            onClick={() => setOpen("")}
          >
            <div className="h-[80%] w-[80%] relative">{image}</div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </>
  );
}

export default ModalImage;
