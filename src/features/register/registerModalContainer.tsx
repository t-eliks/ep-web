import React from "react";
import { connect } from "react-redux";
import { register } from "redux/modules/user/actions";
import { closeModal } from "redux/modules/modal/actions";
import { RegistrationForm } from "./registerModal";
import RegisterModal from "./registerModal";
import { AppState } from "index";
import { FormikHelpers } from "formik";
import { bindActionCreators } from "redux";
import { ApplicationModals } from "redux/modules/modal/types";

interface Props {
  isOpen: boolean;
  register: (values: RegistrationForm) => any;
  closeModal: (modal: ApplicationModals) => any;
  inviteeEmail?: string;
}

const RegisterModalContainer: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { isOpen, inviteeEmail } = props;

  const handleCancelClick = () => {
    const { closeModal } = props;

    closeModal("register");
  };

  const handleSubmit = async (
    values: RegistrationForm,
    formikHelpers: FormikHelpers<RegistrationForm>
  ) => {
    const { register } = props;

    await register(values).then(() => {
      formikHelpers.setSubmitting(false);
    });
  };

  return (
    <RegisterModal
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onCancelClick={handleCancelClick}
      inviteeEmail={inviteeEmail}
    />
  );
};

export default connect(
  (state: AppState) => ({
    isOpen: state.modal.registerModalIsOpen,
    inviteeEmail: state.invitation.inviteeEmail,
  }),
  (dispatch) => bindActionCreators({ register, closeModal }, dispatch)
)(RegisterModalContainer);
