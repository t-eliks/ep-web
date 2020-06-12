import React from "react";
import { closeModal } from "redux/modules/modal/actions";
import { connect } from "react-redux";
import Modal from "components/modals/modal";
import Input from "components/inputs/input";
import Button from "components/buttons/button";
import "./newEpic.scss";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { RESOURCES } from "localization/resources";
import { handleInputChange } from "core/formikTools";
import { ApplicationModals } from "redux/modules/modal/types";
import { IBacklogEpicInfo } from "models/IBacklogEpicInfo";

interface Props {
  epic?: IBacklogEpicInfo;
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  onSubmit: (
    values: NewEditEpicForm,
    formikActions: FormikHelpers<NewEditEpicForm>
  ) => void;
}

export interface NewEditEpicForm {
  id?: string;
  name: string;
  description: string;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required(RESOURCES.VALIDATION.NAME_REQUIRED),
  description: Yup.string(),
});

const NAME = "name";
const DESCRIPTION = "description";

const NewEpicModal: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, closeModal, onSubmit, epic } = props;

  const handleClose = () => {
    closeModal("newEpic");
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
          id: (epic && epic.id) || undefined,
          name: (epic && epic.name) || "",
          description: (epic && epic.description) || "",
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
                {epic
                  ? RESOURCES.UPDATE_EPIC.HEADER
                  : RESOURCES.NEW_EPIC.HEADER}
              </h1>
              <br />
              <br />
              <Input
                header={`${RESOURCES.FIELDS.NEW_EPIC.NAME}`}
                value={values[NAME]}
                error={touched.name ? errors.name : undefined}
                onChange={handleInputChange(
                  NAME,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <Input
                header={`${RESOURCES.FIELDS.NEW_EPIC.DESCRIPTION}`}
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
                  {epic
                    ? RESOURCES.UPDATE_EPIC.UPDATE_EPIC
                    : RESOURCES.NEW_EPIC.CREATE_EPIC}
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

export default connect(null, { closeModal })(NewEpicModal);
