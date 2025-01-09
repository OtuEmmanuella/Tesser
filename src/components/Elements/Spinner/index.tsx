import clsx from "clsx";

import style from "./style.module.scss";

interface SpinnerProps {
  variant?: "light" | "primary";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Spinner = ({
  variant = "light",
  size = "md",
  className,
}: SpinnerProps) => {
  const styleClassName = clsx({
    [style["spinner"]]: true,
    [style[`spinner__size-${size}`]]: true,
  });

  return (
    <svg viewBox="25 25 50 50" className={styleClassName}>
      <circle
        cx="50"
        cy="50"
        r="20"
        strokeDasharray="1, 200"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        stroke={`${variant === "primary" ? "#000" : "#fff"}`}
      ></circle>
    </svg>
  );
};
