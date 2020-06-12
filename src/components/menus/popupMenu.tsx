import React from "react";
import "./popupMenu.scss";

interface Props {
  children: React.ReactNode;
}

const PopupMenu: React.FunctionComponent<Props> = (props: Props) => {
  return <div className="popup-menu">{props.children}</div>;
};

export default PopupMenu;
