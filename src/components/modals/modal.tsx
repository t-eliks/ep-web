import React from "react";
import ReactModal from "react-modal";
import "./modal.scss";

interface Props {
  style?: ReactModal.Styles;
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  minWidthPx?: number;
  maxWidthPx?: number;
}

const accentColor = "#05386b";

const Modal: React.FunctionComponent<Props> = (props: Props) => {
  const {
    style,
    children,
    isOpen,
    onRequestClose,
    minWidthPx,
    maxWidthPx,
  } = props;

  const defaultStyle = {
    content: {
      background: accentColor,
      padding: "0",
      paddingLeft: "10px",
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(calc(-50% - 0.5px), calc(-50% - 0.5px))",
      border: `1.2px solid ${accentColor}`,
      overflow: "visible",
      minWidth: minWidthPx || "400px",
      maxWidth: maxWidthPx || "800px",
    },
    overlay: {
      background: "rgba(45,45,45,0.6)",
      zIndex: 1,
    },
  };

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      style={style || defaultStyle}
      onRequestClose={onRequestClose}
    >
      <div className="modal-content">{children}</div>
    </ReactModal>
  );
};

export default Modal;
