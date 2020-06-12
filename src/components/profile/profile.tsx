import React from "react";
import "./profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IApplicationUser } from "models/IApplicationUser";
import { connect } from "react-redux";
import { AppState } from "index";
import Button from "components/buttons/button";
import { RESOURCES } from "localization/resources";
import { bindActionCreators } from "redux";
import { logout } from "redux/modules/user/actions";
import { NavLink } from "react-router-dom";
import { WEB_ROUTES, GetRoute } from "core/web";

interface Props {
  applicationUser?: IApplicationUser;
  logout: () => any;
}

const Profile: React.FunctionComponent<Props> = (props: Props) => {
  const { applicationUser, logout } = props;
  const email = (applicationUser && applicationUser.email) || undefined;

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__account">
          <FontAwesomeIcon className="account-icon" icon="user" />
          <NavLink className="email" to={GetRoute(WEB_ROUTES.DASHBOARD)}>
            {email}
          </NavLink>
        </div>
      </div>
      <Button
        variant="link"
        onClick={logout}
        icon="sign-out-alt"
        appendClass="profile__signout"
      >
        {RESOURCES.PROFILE.SIGN_OUT}
      </Button>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    applicationUser: state.user.user
  }),
  dispatch => bindActionCreators({ logout }, dispatch)
)(Profile);
