import { useState } from "react";

export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((state) => !state);

  return { isOpen, handleOpen, handleClose, handleToggle };
};
