import clsx from "clsx";

import style from "./style.module.scss";

interface FieldWrapperProps {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: string;
  htmlFor: string;
}

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children" | "htmlFor"
>;

export const FieldWrapper = ({
  label,
  children,
  error,
  className,
  htmlFor,
}: FieldWrapperProps) => {
  const styleClassName = clsx({ [style["fieldwrapper"]]: true, className });

  return (
    <div className={styleClassName}>
      <label className={style["fieldwrapper_label"]} htmlFor={htmlFor}>
        {label}
        <div className={style["fieldwrapper_container"]}>{children}</div>
      </label>

      {error && (
        <div
          className={style["fieldwrapper_error"]}
          role="alert"
          aria-label={error}
        >
          {error}
        </div>
      )}
    </div>
  );
};
