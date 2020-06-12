import React from "react";
import DefaultLoader from "resources/img/tail-spin.svg";
import MinLoader from "resources/img/tail-spin-min.svg";
import { RESOURCES } from "localization/resources";
import "./loader.scss";

export type LoaderType = "default" | "min";

interface Props {
  type?: LoaderType;
  showSpinner?: boolean;
  small?: boolean;
  hideText?: boolean;
}

function resolveLoader(type?: LoaderType): string {
  switch (type) {
    case "min": {
      return MinLoader;
    }
    default:
      return DefaultLoader;
  }
}

const Loader: React.FunctionComponent<Props> = (props: Props) => {
  const { type, showSpinner, small, hideText } = props;

  return (
    <div className={`loader-wrapper ${small ? "loader-wrapper--min" : ""}`}>
      <div className="loader">
        {showSpinner && (
          <img src={resolveLoader(type)} alt={RESOURCES.LOADER.LOADING_ALT} />
        )}
        {!hideText && (
          <div className="loader-text-wrapper">
            <span>{RESOURCES.LOADER.LOADING_TEXT}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
