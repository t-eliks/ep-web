import React from "react";
import { connect } from "react-redux";
import ProfilePage, { ProfileForm } from "./profilePage";
import { bindActionCreators } from "redux";
import {
  getUserInfo,
  saveUserInfo,
  logout,
  deleteProfile,
} from "redux/modules/user/actions";
import { openModalWithParams } from "redux/modules/modal/actions";
import { FormikHelpers } from "formik";
import { AppState } from "index";
import { IApplicationUser } from "models/IApplicationUser";
import { ApplicationModals, ModalParams } from "redux/modules/modal/types";

interface Props {
  saveUserInfo: (values: ProfileForm) => any;
  getUserInfo: () => any;
  logout: () => any;
  isFetchingProfile: boolean;
  profileInfo?: IApplicationUser;
  openModalWithParams: (modal: ApplicationModals, params: ModalParams) => any;
  deleteProfile: () => any;
}

class ProfileContainer extends React.Component<Props> {
  componentDidMount() {
    const { getUserInfo } = this.props;

    getUserInfo();
  }

  handleSubmit = async (
    values: ProfileForm,
    formikHelpers: FormikHelpers<ProfileForm>
  ) => {
    const { saveUserInfo } = this.props;

    await saveUserInfo(values).then(() => {
      formikHelpers.setSubmitting(false);
    });
  };

  handleLogout = () => {
    const { logout } = this.props;

    logout();
  };

  handleDelete = () => {
    const { deleteProfile } = this.props;

    deleteProfile();
  };

  handleDeleteClick = () => {
    const { openModalWithParams } = this.props;

    openModalWithParams("delete", {
      elementName: " your profile",
      onConfirm: this.handleDelete,
    });
  };

  render() {
    const { isFetchingProfile, profileInfo } = this.props;

    return (
      <ProfilePage
        isFetchingProfile={isFetchingProfile}
        onSubmit={this.handleSubmit}
        onLogout={this.handleLogout}
        profileInfo={profileInfo}
        onDeleteClick={this.handleDeleteClick}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    isFetchingProfile: state.user.isFetchingProfile,
    profileInfo: state.user.user,
  }),
  (dispatch) =>
    bindActionCreators(
      { getUserInfo, saveUserInfo, logout, openModalWithParams, deleteProfile },
      dispatch
    )
)(ProfileContainer);
