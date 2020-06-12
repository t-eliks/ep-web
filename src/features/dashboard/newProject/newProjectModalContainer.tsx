import React from "react";
import { connect } from "react-redux";
import { createProject, updateProject } from "redux/modules/project/actions";
import { AppState } from "index";
import { FormikHelpers } from "formik";
import { bindActionCreators } from "redux";
import { closeModal, openModal } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";
import NewProjectModal, { NewEditProjectForm } from "./newProjectModal";
import { IProjectDetails } from "models/IProjectDetails";

export interface NewProjectModalParams {
  project?: IProjectDetails;
}

interface Props {
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  openModal: (modal: ApplicationModals) => any;
  createProject: (values: NewEditProjectForm) => any;
  params: NewProjectModalParams;
  updateProject: (values: NewEditProjectForm) => any;
}

const NewProjectModalContainer: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { isOpen, params } = props;

  const handleSubmit = async (
    values: NewEditProjectForm,
    formikHelpers: FormikHelpers<NewEditProjectForm>
  ) => {
    const { createProject, updateProject, params } = props;

    if (params) {
      await updateProject(values).then(() => {
        formikHelpers.setSubmitting(false);
      });
    } else {
      await createProject(values).then(() => {
        formikHelpers.setSubmitting(false);
      });
    }
  };

  return (
    <NewProjectModal
      project={params && params.project}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
};

export default connect(
  (state: AppState) => ({
    isOpen: state.modal.newProjectModalIsOpen,
    params: state.modal.params,
  }),
  (dispatch) =>
    bindActionCreators(
      { createProject, closeModal, openModal, updateProject },
      dispatch
    )
)(NewProjectModalContainer);
