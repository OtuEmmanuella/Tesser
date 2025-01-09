import * as React from "react";

import style from "./style.module.scss";

import { useDisclosure } from "@/hooks/useDisclosure";

import { Dialog } from "@/components/Elements";
import { Button } from "@/components/Elements";

interface ConfirmationDialogProps {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  // icon?: "danger" | "info";
  isDone?: boolean;
}

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = "",
  cancelButtonText = "Cancel",
  // icon = "danger",
  isDone = false,
}: ConfirmationDialogProps) => {
  const { handleOpen, handleClose, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) handleClose();
  }, [isDone, handleClose]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: handleOpen,
  });

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} fillPage={false} handleClose={handleClose}>
        <div className={style["confirmation-dialog__body"]}>
          <div className={style["confirmation-dialog__text"]}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>

          <div className={style["confirmation-dialog__controls"]}>
            <Button type="button" onClick={handleClose} variant="inverse">
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </div>
      </Dialog>
    </>
  );
};
