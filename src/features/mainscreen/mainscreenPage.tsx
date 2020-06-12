import React from "react";
import "./mainscreenPage.scss";
import Sidebar from "components/sidebar/sidebar";
import MainscreenRoutes from "components/routes/mainscreenRoutes";
import { RouteComponentProps } from "react-router-dom";

interface Props {
  routerProps: RouteComponentProps;
}

const MainscreenPage: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className="main-screen">
      <div className="main-screen__sidebar">
        <Sidebar routerProps={props.routerProps} />
      </div>
      <div className="main-screen__container">
        <MainscreenRoutes />
      </div>
    </div>
  );
};

export default MainscreenPage;
