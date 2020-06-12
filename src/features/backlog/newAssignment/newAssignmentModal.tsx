import React from "react";
import { closeModal } from "redux/modules/modal/actions";
import { connect } from "react-redux";
import Modal from "components/modals/modal";
import Input from "components/inputs/input";
import Button from "components/buttons/button";
import "./newAssignment.scss";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RESOURCES } from "localization/resources";
import { handleInputChange, handleOptionChange } from "core/formikTools";
import { ApplicationModals } from "redux/modules/modal/types";
import { bindActionCreators } from "redux";
import AssigneeDropdownContainer from "components/assignment/assigneeDropdown/assigneeDropdownContainer";

interface Props {
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  onSubmit: (
    values: NewAssignmentForm,
    formikActions: FormikHelpers<NewAssignmentForm>
  ) => void;
}

export interface NewAssignmentForm {
  name: string;
  description: string;
  assigneeId: string;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required(RESOURCES.VALIDATION.NAME_REQUIRED),
  description: Yup.string(),
  assigneeId: Yup.string(),
});

const NAME = "name";
const DESCRIPTION = "description";
const ASSIGNEE_ID = "assigneeId";

const handleClose = (closeModal: (modal: ApplicationModals) => any) => () => {
  closeModal("newAssignment");
};

const NewAssignmentModal: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, closeModal, onSubmit } = props;
  return (
    <Modal
      minWidthPx={600}
      maxWidthPx={900}
      isOpen={isOpen}
      onRequestClose={handleClose(closeModal)}
    >
      <Formik
        initialValues={{
          name: "",
          description: "",
          assigneeId: "-1",
        }}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={onSubmit}
      >
        {({
          values,
          setFieldTouched,
          setFieldValue,
          isSubmitting,
          errors,
          touched,
        }) => {
          return (
            <Form id="form">
              <h1 className="h1">{RESOURCES.NEW_ASSIGNMENT.HEADER}</h1>
              <br />
              <br />
              <Input
                header={`${RESOURCES.FIELDS.NEW_ASSIGNMENT.NAME}`}
                value={values[NAME]}
                error={touched.name ? errors.name : undefined}
                onChange={handleInputChange(
                  NAME,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <Input
                header={`${RESOURCES.FIELDS.NEW_ASSIGNMENT.DESCRIPTION}`}
                value={values[DESCRIPTION]}
                error={touched.description ? errors.description : undefined}
                onChange={handleInputChange(
                  DESCRIPTION,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <AssigneeDropdownContainer
                selectedId={values[ASSIGNEE_ID]}
                onChange={handleOptionChange(
                  ASSIGNEE_ID,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <div className="button-container">
                <Button loading={isSubmitting} type="submit" icon="plus">
                  {RESOURCES.NEW_ASSIGNMENT.CREATE_EPIC}
                </Button>
                <Button onClick={handleClose(closeModal)} variant="alt">
                  {RESOURCES.GLOBAL.CANCEL}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default connect(null, (dispatch) =>
  bindActionCreators({ closeModal }, dispatch)
)(NewAssignmentModal);
