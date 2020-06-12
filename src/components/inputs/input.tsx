import React, { useState } from "react";
import "./input.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTooltip } from "react-laag";
import TextAreaAutosize from "react-autosize-textarea";

interface Props {
  header?: string;
  placeholder?: string;
  type?: string;
  value?: string | Date;
  onChange?(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLDivElement>
  ): void;
  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  error?: string;
  autocomplete?: "off" | "on";
  large?: boolean;
}

const Input: React.FunctionComponent<Props> = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [element, triggerProps] = useTooltip(
    ({ isOpen, layerProps }) =>
      isOpen &&
      props.error && (
        <div {...layerProps} className="input-error">
          {props.error}
        </div>
      ),
    {
      delayEnter: 100,
      delayLeave: 100,
    }
  );

  const {
    header,
    placeholder,
    type,
    value,
    onChange,
    error,
    autocomplete,
    large,
  } = props;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onFocus } = props;

    setIsFocused(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const formatValue = (
    value: string | Date | undefined
  ): string | undefined => {
    return value?.toString();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = props;

    setIsFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div className="input">
      <span className="input-header">{header}</span>
      <div
        className={`input-container ${
          isFocused ? "input-container--focused" : ""
        } ${!onChange ? "input-container--readonly" : ""}`}
      >
        {!large && (
          <input
            readOnly={!onChange}
            className={`input-container__input ${
              !onChange ? "input-container__input--readonly" : ""
            } ${large ? "input-container__input--large" : ""}`}
            placeholder={placeholder || undefined}
            type={type || undefined}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={formatValue(value)}
            autoComplete={autocomplete}
          />
        )}
        {large && (
          <TextAreaAutosize
            readOnly={!onChange}
            className={`input-container__input ${
              !onChange ? "input-container__input--readonly" : ""
            } ${large ? "input-container__input--large" : ""}`}
            placeholder={placeholder || undefined}
            type={type || undefined}
            // @ts-ignore
            onChange={onChange}
            // @ts-ignore
            onFocus={handleFocus}
            // @ts-ignore
            onBlur={handleBlur}
            value={formatValue(value)}
            autoComplete={autocomplete}
          />
        )}
        {element}
        <div {...triggerProps}>
          <FontAwesomeIcon
            className={`input-container__icon ${
              error ? "input-container__icon--visible" : ""
            }`}
            icon="exclamation-circle"
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
