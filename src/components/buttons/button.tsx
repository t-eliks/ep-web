import React from "react";
import "./button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Loader from "components/loader/loader";

type ButtonVariant = "main" | "alt" | "link" | "icon" | "delete";

export interface Props {
  children?: string | React.ReactNode;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  icon?: IconProp;
  overrideClass?: string;
  appendClass?: string;
  applyVariant?: boolean;
}

const resolveClassName = (variant?: ButtonVariant) => {
  switch (variant) {
    case "alt":
      return "button--alt";
    case "main":
      return "button--main";
    case "link":
      return "button--link";
    case "icon":
      return "button--icon";
    case "delete":
      return "button--delete";
    default:
      return "button--main";
  }
};

const Button: React.FunctionComponent<Props> = (props: Props) => {
  const {
    type,
    children,
    variant,
    onClick,
    loading,
    disabled,
    icon,
    overrideClass,
    appendClass,
    applyVariant,
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type || "button"}
      className={
        overrideClass
          ? `${overrideClass} ${applyVariant ? resolveClassName(variant) : ""}`
          : `button ${
              disabled || loading
                ? "button--disabled"
                : resolveClassName(variant)
            } ${appendClass || ""}`
      }
    >
      {loading && <Loader showSpinner type="min" small hideText />}
      {!loading && (
        <>
          {icon && (
            <FontAwesomeIcon
              className={`${variant !== "icon" ? "icon" : ""}`}
              icon={icon}
            />
          )}

          {children}
        </>
      )}
    </button>
  );
};

export default Button;
