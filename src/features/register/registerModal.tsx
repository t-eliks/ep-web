import React from "react";
import { closeModal } from "redux/modules/modal/actions";
import { connect } from "react-redux";
import Modal from "components/modals/modal";
import Input from "components/inputs/input";
import Button from "components/buttons/button";
import "./register.scss";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "core/constants";
import { RESOURCES } from "localization/resources";
import { handleInputChange } from "core/formikTools";
import { ApplicationModals } from "redux/modules/modal/types";

interface Props {
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  onSubmit: (
    values: RegistrationForm,
    formikActions: FormikHelpers<RegistrationForm>
  ) => void;
  onCancelClick: () => any;
  inviteeEmail?: string;
}

export interface RegistrationForm {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  isInvitation: boolean;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_PATTERN, RESOURCES.VALIDATION.EMAIL_PATTERN_INVALID)
    .required(RESOURCES.VALIDATION.EMAIL_REQUIRED),
  firstName: Yup.string().required(RESOURCES.VALIDATION.FIRST_NAME_REQUIRED),
  lastName: Yup.string().required(RESOURCES.VALIDATION.LAST_NAME_REQUIRED),
  password: Yup.string()
    .matches(PASSWORD_PATTERN, RESOURCES.VALIDATION.PASSWORD_PATTERN_INVALID)
    .required(RESOURCES.VALIDATION.PASSWORD_REQUIRED),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), ""],
      RESOURCES.VALIDATION.CONFIRM_PASSWORD_MATCH
    )
    .required(RESOURCES.VALIDATION.CONFIRM_PASSWORD_REQUIRED)
});

const EMAIL = "email";
const FIRSTNAME = "firstName";
const LASTNAME = "lastName";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";

const RegisterModal: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, closeModal, onSubmit, onCancelClick, inviteeEmail } = props;

  const handleClose = () => {
    closeModal("register");
  };

  return (
    <Modal
      minWidthPx={400}
      maxWidthPx={900}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      <Formik
        initialValues={{
          email: inviteeEmail || "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          isInvitation: !!inviteeEmail
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
          touched
        }) => {
          return (
            <Form id="form">
              <h1 className="title">Register</h1>
              <span className="description">
                {RESOURCES.REGISTRATION.SUBHEADER}
              </span>
              <br />
              <br />
              <Input
                header={`${RESOURCES.FIELDS.FIRST_NAME}*`}
                value={values[FIRSTNAME]}
                error={touched.firstName ? errors.firstName : undefined}
                onChange={handleInputChange(
                  FIRSTNAME,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <Input
                header={`${RESOURCES.FIELDS.LAST_NAME}*`}
                value={values[LASTNAME]}
                error={touched.lastName ? errors.lastName : undefined}
                onChange={handleInputChange(
                  LASTNAME,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <Input
                header={`${RESOURCES.FIELDS.EMAIL}*`}
                value={values[EMAIL]}
                error={touched.email ? errors.email : undefined}
                onChange={
                  inviteeEmail
                    ? undefined
                    : handleInputChange(EMAIL, setFieldValue, setFieldTouched)
                }
              />
              <Input
                header={`${RESOURCES.FIELDS.PASSWORD}*`}
                value={values[PASSWORD]}
                type="password"
                autocomplete="off"
                error={touched.password ? errors.password : undefined}
                onChange={handleInputChange(
                  PASSWORD,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <Input
                header={`${RESOURCES.FIELDS.CONFIRM_PASSWORD}*`}
                value={values[CONFIRM_PASSWORD]}
                type="password"
                error={
                  touched.confirmPassword ? errors.confirmPassword : undefined
                }
                onChange={handleInputChange(
                  CONFIRM_PASSWORD,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <div className="button-container">
                <Button loading={isSubmitting} type="submit" icon="plus">
                  {RESOURCES.REGISTRATION.SUBMIT}
                </Button>
                <Button onClick={onCancelClick} variant="alt">
                  {RESOURCES.REGISTRATION.CANCEL}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default connect(null, { closeModal })(RegisterModal);
