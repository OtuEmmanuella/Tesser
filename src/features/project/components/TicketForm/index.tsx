import * as React from "react";
// import SVG from "react-inlinesvg";

import style from "./style.module.scss";

// import cancel from "@/assets/x.svg";
// import check from "@/assets/check.svg";

interface TicketFormProps {
  value: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
}

export const TicketForm = ({
  value,
  handleSubmit,
  handleChange,
  handleCancel,
}: TicketFormProps) => {
  return (
    <form className={style["form"]} onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        autoFocus={true}
        onBlur={() => setTimeout(handleCancel, 120)}
      />
      <div className={style["form__controls"]}>
        <button type="submit">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button type="button" onClick={handleCancel}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
