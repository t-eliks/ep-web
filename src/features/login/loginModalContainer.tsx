import React from "react";
import { connect } from "react-redux";
import { login } from "redux/modules/user/actions";
import { AppState } from "index";
import { FormikHelpers } from "formik";
import { bindActionCreators } from "redux";
import LoginModal, { LoginForm } from "./loginModal";
import { closeModal, openModal } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";

interface Props {
  isOpen: boolean;
  login: (values: LoginForm, redirect: boolean) => any;
  closeModal: (modal: ApplicationModals) => any;
  openModal: (modal: ApplicationModals) => any;
  inviteeEmail?: string;
}

const LoginModalContainer: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, inviteeEmail } = props;

  const handleRegisterClick = () => {
    const { closeModal, openModal } = props;

    closeModal("login");
    openModal("register");
  };

  const handleSubmit = async (
    values: LoginForm,
    formikHelpers: FormikHelpers<LoginForm>
  ) => {
    const { login } = props;

    await login(values, !inviteeEmail).then(() => {
      formikHelpers.setSubmitting(false);
    });
  };

  return (
    <LoginModal
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onRegisterClick={handleRegisterClick}
      inviteeEmail={inviteeEmail}
    />
  );
};

export default connect(
  (state: AppState) => ({
    isOpen: state.modal.loginModalIsOpen,
    inviteeEmail: state.invitation.inviteeEmail,
  }),
  (dispatch) => bindActionCreators({ login, closeModal, openModal }, dispatch)
)(LoginModalContainer);
