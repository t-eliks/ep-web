import React from "react";
import Sidemenu from "components/sidemenu/sidemenu";
import "./sidebar.scss";
import Profile from "components/profile/profile";
import { RouteComponentProps } from "react-router-dom";

interface Props {
  routerProps: RouteComponentProps;
}

const Sidebar: React.FunctionComponent<Props> = (props: Props) => {
  const { routerProps } = props;

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1>Easy Project</h1>
      </div>
      <div className="sidebar__sidemenu">
        <Sidemenu routerProps={routerProps} />
      </div>
      <div className="sidebar__profile">
        <Profile />
      </div>
    </div>
  );
};

export default Sidebar;
