import React from "react";
import { connect } from "react-redux";
import CollaboratorManagementPage from "./collaboratorManagementPage";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import { getInvitationLink } from "redux/modules/invitation/actions";
import { IPendingInvitation } from "models/IPendingInvitation";
import {
  getPendingInvitations,
  cancelInvitation,
} from "redux/modules/invitation/actions";

interface Props {
  projectId?: number;
  invitationLink?: string;
  pendingInvitations?: IPendingInvitation[];
  isFetchingPendingInvitations: boolean;
  isFetchingInvitationInfo: boolean;
  getPendingInvitations: (projectId: number) => any;
  getInvitationLink: (projectId: number, email: string) => any;
  cancelInvitation: (invitationId: number) => any;
}

class CollaboratorManagementContainer extends React.Component<Props> {
  componentDidMount() {
    const { projectId, getPendingInvitations } = this.props;

    if (projectId) {
      getPendingInvitations(projectId);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { projectId: newProjectId } = this.props;
    const { projectId: prevProjectId } = prevProps;

    if (newProjectId !== prevProjectId) {
      const { getPendingInvitations } = this.props;

      if (newProjectId) {
        getPendingInvitations(newProjectId);
      }
    }
  }

  handleSubmit = async (email: string) => {
    const { projectId, getInvitationLink, getPendingInvitations } = this.props;

    if (projectId) {
      await getInvitationLink(projectId, email);
      getPendingInvitations(projectId);
    }
  };

  handleCancel = async (invitationId: number) => {
    const { cancelInvitation, getPendingInvitations, projectId } = this.props;

    if (projectId) {
      await cancelInvitation(invitationId);
      getPendingInvitations(projectId);
    }
  };

  render() {
    const {
      invitationLink,
      pendingInvitations,
      isFetchingPendingInvitations,
      isFetchingInvitationInfo,
    } = this.props;
    return (
      <CollaboratorManagementPage
        isFetchingInvitationInfo={isFetchingInvitationInfo}
        isFetchingPendingInvitations={isFetchingPendingInvitations}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        pendingInvitations={pendingInvitations}
        invitationLink={invitationLink}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    projectId: state.project.projectDetails?.id,
    invitationLink: state.invitation.invitationLink,
    pendingInvitations: state.invitation.pendingInvitations,
    isFetchingPendingInvitations: state.invitation.isFetchingPendingInvitations,
    isFetchingInvitationInfo: state.invitation.isFetchingInvitationInfo,
  }),
  (dispatch) =>
    bindActionCreators(
      { getInvitationLink, getPendingInvitations, cancelInvitation },
      dispatch
    )
)(CollaboratorManagementContainer);
