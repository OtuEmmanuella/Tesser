import SVG from "react-inlinesvg";
import * as React from "react";

import style from "./style.module.scss";

import closeIcon from "@/assets/close.svg";
import warningIcon from "@/assets/warning.svg";
import infoIcon from "@/assets/info.svg";
import successIcon from "@/assets/success.svg";
import errorIcon from "@/assets/error.svg";

import { Notification as NotificationType } from "@/types";

const icons = {
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon,
  success: successIcon,
};

export interface NotificationProps extends NotificationType {
  handleClose: () => void;
}

export const Notification = ({
  variant = "warning",
  title,
  message,
  handleClose,
}: NotificationProps) => {
  React.useEffect(() => {
    let timeout = setTimeout(handleClose, 4000); //Close the notification after 2 seconds

    return () => {
      clearTimeout(timeout);
    };
  }, [handleClose]);

  return (
    <div className={style["notification"]} role="alert">
      <div className={style[`notification__icon-${variant}`]}>
        <SVG src={icons[variant]} width="24" height="24" />
      </div>
      <div className={style["notification__content"]}>
        <p>{title}</p>
        <p>{message}</p>
      </div>
      <div className={style["notification__control"]}>
        <button
          type="button"
          aria-label="close notification"
          onClick={handleClose}
        >
          <SVG src={closeIcon} width="20" height="20" />
        </button>
      </div>
    </div>
  );
};
