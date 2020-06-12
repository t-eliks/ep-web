import React from "react";
import { connect } from "react-redux";
import { createEpic, updateEpic } from "redux/modules/epic/actions";
import { AppState } from "index";
import { FormikHelpers } from "formik";
import { bindActionCreators } from "redux";
import { closeModal, openModal } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";
import NewEpicModal, { NewEditEpicForm } from "./newEpicModal";
import { IBacklogEpicInfo } from "models/IBacklogEpicInfo";

export interface NewEpicModalParams {
  projectId?: string;
  epic?: IBacklogEpicInfo;
}

interface Props {
  params: NewEpicModalParams;
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  openModal: (modal: ApplicationModals) => any;
  createEpic: (values: NewEditEpicForm, projectId: string) => any;
  updateEpic: (values: NewEditEpicForm) => any;
}

const NewEpicModalContainer: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { isOpen, params } = props;

  const handleSubmit = async (
    values: NewEditEpicForm,
    formikHelpers: FormikHelpers<NewEditEpicForm>
  ) => {
    const { createEpic, updateEpic } = props;
    const { projectId, epic } = params;

    if (epic) {
      await updateEpic(values).then(() => {
        formikHelpers.setSubmitting(false);
      });
    } else if (projectId) {
      await createEpic(values, projectId).then(() => {
        formikHelpers.setSubmitting(false);
      });
    }
  };

  return (
    <NewEpicModal
      epic={params && params.epic}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
};

export default connect(
  (state: AppState) => ({
    isOpen: state.modal.newEpicModalIsOpen,
    params: state.modal.params,
  }),
  (dispatch) =>
    bindActionCreators(
      { createEpic, updateEpic, closeModal, openModal },
      dispatch
    )
)(NewEpicModalContainer);
