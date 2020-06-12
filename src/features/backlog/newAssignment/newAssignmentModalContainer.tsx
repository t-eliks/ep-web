import React from "react";
import { connect } from "react-redux";
import { createAssignment } from "redux/modules/assignment/actions";
import { AppState } from "index";
import { FormikHelpers } from "formik";
import { bindActionCreators } from "redux";
import { closeModal, openModal } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";
import NewAssigmentModal, { NewAssignmentForm } from "./newAssignmentModal";

export interface NewAssignmentModalParams {
  epicId?: string;
}

interface Props {
  params: NewAssignmentModalParams;
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  openModal: (modal: ApplicationModals) => any;
  createAssignment: (values: NewAssignmentForm, epicId: string) => any;
}

class NewAssignmentModalContainer extends React.Component<Props> {
  handleSubmit = async (
    values: NewAssignmentForm,
    formikHelpers: FormikHelpers<NewAssignmentForm>
  ) => {
    const { createAssignment, params } = this.props;
    const { epicId } = params;

    if (epicId) {
      await createAssignment(values, epicId).then(() => {
        formikHelpers.setSubmitting(false);
      });
    }
  };

  render() {
    const { isOpen } = this.props;

    return <NewAssigmentModal isOpen={isOpen} onSubmit={this.handleSubmit} />;
  }
}

export default connect(
  (state: AppState) => ({
    isOpen: state.modal.newAssignmentModalIsOpen,
    params: state.modal.params
  }),
  dispatch =>
    bindActionCreators({ createAssignment, closeModal, openModal }, dispatch)
)(NewAssignmentModalContainer);
