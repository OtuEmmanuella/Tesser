import clsx from "clsx";
import { FieldWrapper, FieldWrapperPassThroughProps } from "../FieldWrapper";

import styles from "./style.module.scss";

type ExtendedTypes = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps;

interface InputFieldProps extends ExtendedTypes {
  id: string;
}

export const InputField = ({
  type = "text",
  className,
  id,
  error,
  label,
  ...props
}: InputFieldProps) => {
  const styleClassName = clsx({ [styles["input"]]: true, className });

  return (
    <FieldWrapper label={label} error={error} htmlFor={id}>
      <input
        type={type}
        {...props}
        className={styleClassName}
        value={props.value}
      />
    </FieldWrapper>
  );
};
