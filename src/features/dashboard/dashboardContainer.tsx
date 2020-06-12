import React from "react";
import Dashboard from "./dashboard";
import { ApplicationModals } from "redux/modules/modal/types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openModal } from "redux/modules/modal/actions";
import { logout } from "redux/modules/user/actions";
import { getDashboardInfo } from "redux/modules/project/actions";
import { IDashboardProjectInfo } from "models/IDashboardInfo";
import { AppState } from "index";

interface Props {
  openModal: (modal: ApplicationModals) => any;
  projects?: IDashboardProjectInfo[];
  isFetchingProjects: boolean;
  getDashboardInfo: () => any;
  logout: () => any;
}

class DashboardContainer extends React.Component<Props> {
  componentDidMount() {
    const { getDashboardInfo } = this.props;

    getDashboardInfo();
  }

  handleLogoutClick = () => {
    const { logout } = this.props;

    logout();
  };

  handleCreateClick = () => {
    const { openModal } = this.props;

    openModal("newProject");
  };

  render() {
    const { projects, isFetchingProjects } = this.props;

    return (
      <Dashboard
        isFetchingProjects={isFetchingProjects}
        onLogoutClick={this.handleLogoutClick}
        onCreateClick={this.handleCreateClick}
        projects={projects}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    projects: state.project.projects,
    isFetchingProjects: state.project.isFetchingProjects,
  }),
  (dispatch) =>
    bindActionCreators({ openModal, logout, getDashboardInfo }, dispatch)
)(DashboardContainer);
