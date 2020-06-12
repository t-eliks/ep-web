import React from "react";
import "./headerBar.scss";

interface Props {
  children?: React.ReactNode[] | React.ReactNode;
}

const HeaderBar: React.FunctionComponent<Props> = (props: Props) => {
  const { children } = props;

  return <div className="header-bar">{children}</div>;
};

export default HeaderBar;
