import React from "react";
import "./popupMenuItem.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  header: string;
  icon?: IconProp;
  onClick?: () => void;
}

const PopupMenuItem: React.FunctionComponent<Props> = (props: Props) => {
  const { header, onClick, icon } = props;

  return (
    <div onClick={onClick} className="popup-menu-item__wrapper">
      {icon && <FontAwesomeIcon className="icon-margin" icon={icon} />}
      <span className="popup-menu-item__header">{header}</span>
    </div>
  );
};

export default PopupMenuItem;
