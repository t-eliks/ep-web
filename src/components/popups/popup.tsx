import React from "react";
import { useToggleLayer } from "react-laag";
import { AnchorEnum } from "react-laag/dist/ToggleLayer/types";
import "./popup.scss";

interface Props {
  children: React.ReactNode;
  renderOwner: () => React.ReactNode;
  anchor?: AnchorEnum;
}

const Popup: React.FunctionComponent<Props> = (props: Props) => {
  const { children, renderOwner, anchor } = props;

  const [element, toggleLayerProps] = useToggleLayer(
    ({ isOpen, layerProps }) =>
      isOpen && (
        <div {...layerProps} className="inner-popup">
          {children}
        </div>
      ),
    {
      placement: {
        anchor: anchor || "BOTTOM_RIGHT",
      },
      closeOnOutsideClick: true,
    }
  );

  return (
    <>
      {element}
      <div onClick={toggleLayerProps.openFromMouseEvent}>{renderOwner()}</div>
    </>
  );
};

export default Popup;
