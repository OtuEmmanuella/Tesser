import clsx from "clsx";
import * as React from "react";

import style from "./style.module.scss";

import { Spinner } from "@/components/Elements/Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "inverse";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      type = "button",
      className,
      ...props
    },
    ref
  ) => {
    const styleClassName = clsx({
      [style["button"]]: true,
      [style[`button__variant-${variant}`]]: true,
      [style[`button__size-${size}`]]: true,
    });

    return (
      <button ref={ref} type={type} className={styleClassName} {...props}>
        {isLoading ? (
          <Spinner size="sm" className={style["button__spinner"]} />
        ) : (
          <span>{props.children}</span>
        )}
      </button>
    );
  }
);
