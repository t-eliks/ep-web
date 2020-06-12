import React from "react";
import SidemenuItem from "./sidemenuItem/sidemenuItem";
import { WEB_ROUTES, CombineRoutes } from "core/web";
import "./sidemenu.scss";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "index";

interface Props {
  routerProps: RouteComponentProps;
  hasUnreadNotifications?: boolean;
}

class Sidemenu extends React.Component<Props> {
  render() {
    const { routerProps, hasUnreadNotifications } = this.props;
    const { match } = routerProps;
    const { url } = match;

    return (
      <div className="sidemenu">
        <SidemenuItem
          link={CombineRoutes(false, url, WEB_ROUTES.PROJECT_DETAILS)}
          icon="info-circle"
          header="Project Details"
        />
        <SidemenuItem
          link={CombineRoutes(false, url, WEB_ROUTES.BOARD)}
          icon="chalkboard-teacher"
          header="Board"
        />
        <SidemenuItem
          link={CombineRoutes(false, url, WEB_ROUTES.BACKLOG)}
          icon="tasks"
          header="Backlog"
        />
        <SidemenuItem
          link={CombineRoutes(false, url, WEB_ROUTES.NOTIFICATIONS)}
          icon="bell"
          header={`Notifications${hasUnreadNotifications ? "*" : ""}`}
          bold={hasUnreadNotifications}
        />
        <SidemenuItem
          link={CombineRoutes(false, url, WEB_ROUTES.COLLABORATOR_MANAGEMENT)}
          icon="user-edit"
          header="Collaborators"
        />
        <SidemenuItem
          link={CombineRoutes(false, url, WEB_ROUTES.DISCUSSION)}
          icon="comments"
          header="Discussion"
        />
      </div>
    );
  }
}

export default connect((state: AppState) => ({
  hasUnreadNotifications: state.project.projectDetails?.hasUnreadNotifications,
}))(Sidemenu);
