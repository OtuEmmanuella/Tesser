import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import style from "./style.module.scss";

import { useClickOutside } from "@/hooks/useClickOutside";
import clsx from "clsx";

interface DialogProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  fillPage: boolean;
}

export const Dialog = ({
  isOpen,
  handleClose,
  children,
  fillPage = true,
}: DialogProps) => {
  const containerRef = React.useRef(null);
  useClickOutside(containerRef, handleClose);

  const styleClassName = clsx({
    [style["dialog"]]: true,
    [style["dialog__fillpage"]]: fillPage,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          className={styleClassName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={style["dialog__body"]}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
