import React from "react";
import InvitationPage from "./invitationPage";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AppState } from "index";
import { IPendingInvitation } from "models/IPendingInvitation";
import { bindActionCreators } from "redux";
import {
  getPendingInvitationInfo,
  acceptInvitation,
  setInviteeEmail,
} from "redux/modules/invitation/actions";
import { openModal } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";
import history from "core/history";
import { GetRoute, WEB_ROUTES } from "core/web";

interface MatchProps {
  token: string;
}

interface Props extends RouteComponentProps<MatchProps> {
  isAuthenticated: boolean;
  invitationInfo?: IPendingInvitation;
  getPendingInvitationInfo: (token: string) => void;
  acceptInvitation: (token: string) => void;
  setInviteeEmail: (email: string) => void;
  openModal: (modal: ApplicationModals) => void;
}

class InvitationPageContainer extends React.Component<Props> {
  componentDidMount() {
    const { getPendingInvitationInfo, match } = this.props;
    const { token } = match.params;

    if (token) {
      getPendingInvitationInfo(token);
    }
  }

  handleAuthenticatedAccept = async () => {
    const { acceptInvitation, match } = this.props;
    const { token } = match.params;

    if (token) {
      await acceptInvitation(token);
      history.push(GetRoute(WEB_ROUTES.DASHBOARD));
    }
  };

  handleCreateAccount = () => {
    const { setInviteeEmail, openModal, invitationInfo } = this.props;

    if (invitationInfo) {
      const { email } = invitationInfo;

      if (email) {
        setInviteeEmail(email);
        history.push(GetRoute(WEB_ROUTES.INDEX));
        openModal("register");
      }
    }
  };

  handleLogin = () => {
    const { setInviteeEmail, openModal, invitationInfo } = this.props;

    if (invitationInfo) {
      const { email } = invitationInfo;

      if (email) {
        setInviteeEmail(email);
        openModal("login");
      }
    }
  };

  render() {
    const { invitationInfo, isAuthenticated } = this.props;
    return invitationInfo ? (
      <InvitationPage
        invitationInfo={invitationInfo}
        isAuthenticated={isAuthenticated}
        onAuthenticatedAccept={this.handleAuthenticatedAccept}
        onCreateAccount={this.handleCreateAccount}
        onLogin={this.handleLogin}
      />
    ) : null;
  }
}

export default connect(
  (state: AppState) => ({
    invitationInfo: state.invitation.invitationInfo,
    isAuthenticated: state.user.isAuthenticated,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getPendingInvitationInfo,
        acceptInvitation,
        setInviteeEmail,
        openModal,
      },
      dispatch
    )
)(InvitationPageContainer);
