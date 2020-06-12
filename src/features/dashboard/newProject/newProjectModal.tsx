import React from "react";
import { closeModal } from "redux/modules/modal/actions";
import { connect } from "react-redux";
import Modal from "components/modals/modal";
import Input from "components/inputs/input";
import Button from "components/buttons/button";
import "./newProject.scss";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RESOURCES } from "localization/resources";
import { handleInputChange } from "core/formikTools";
import { ApplicationModals } from "redux/modules/modal/types";
import { IProjectDetails } from "models/IProjectDetails";

interface Props {
  isOpen: boolean;
  project?: IProjectDetails;
  closeModal: (modal: ApplicationModals) => any;
  onSubmit: (
    values: NewEditProjectForm,
    formikActions: FormikHelpers<NewEditProjectForm>
  ) => void;
}

export interface NewEditProjectForm {
  id?: number;
  name: string;
  description: string;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required(RESOURCES.VALIDATION.NAME_REQUIRED),
  description: Yup.string().required(RESOURCES.VALIDATION.DESCRIPTION_REQUIRED),
});

const NAME = "name";
const DESCRIPTION = "description";

const NewProjectModal: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, closeModal, onSubmit, project } = props;

  const handleClose = () => {
    closeModal("newProject");
  };

  return (
    <Modal
      minWidthPx={600}
      maxWidthPx={900}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      <Formik
        initialValues={{
          id: (project && project.id) || undefined,
          name: (project && project.name) || "",
          description: (project && project.description) || "",
        }}
        validationSchema={VALIDATION_SCHEMA}
        // @ts-ignore
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
              <h1 className="h1">
                {project
                  ? RESOURCES.UPDATE_PROJECT.HEADER
                  : RESOURCES.NEW_PROJECT.HEADER}
              </h1>
              <br />
              <br />
              <Input
                header={`${RESOURCES.FIELDS.NEW_PROJECT.NAME}`}
                value={values[NAME]}
                error={touched.name ? errors.name : undefined}
                onChange={handleInputChange(
                  NAME,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <Input
                header={`${RESOURCES.FIELDS.NEW_PROJECT.DESCRIPTION}`}
                value={values[DESCRIPTION]}
                error={touched.description ? errors.description : undefined}
                onChange={handleInputChange(
                  DESCRIPTION,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <div className="button-container">
                <Button loading={isSubmitting} type="submit" icon="plus">
                  {project
                    ? RESOURCES.UPDATE_EPIC.UPDATE_EPIC
                    : RESOURCES.NEW_PROJECT.CREATE_PROJECT}
                </Button>
                <Button onClick={handleClose} variant="alt">
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

export default connect(null, { closeModal })(NewProjectModal);
