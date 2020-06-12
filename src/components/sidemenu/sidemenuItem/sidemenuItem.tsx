import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sidemenuItem.scss";
import { NavLink } from "react-router-dom";

interface Props {
  header: string;
  icon?: IconProp;
  link: string;
  bold?: boolean;
}

const SidemenuItem: React.FunctionComponent<Props> = (props: Props) => {
  const { header, icon, link, bold } = props;
  return (
    <NavLink
      to={link}
      className="sidemenu-item"
      activeClassName="sidemenu-item--active"
    >
      {icon && <FontAwesomeIcon className="sidemenu-item__icon" icon={icon} />}
      {bold && <b>{header}</b>}
      {!bold && <span>{header}</span>}
    </NavLink>
  );
};

export default SidemenuItem;
