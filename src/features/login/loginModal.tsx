import React from "react";
import { closeModal } from "redux/modules/modal/actions";
import { connect } from "react-redux";
import Modal from "components/modals/modal";
import Input from "components/inputs/input";
import Button from "components/buttons/button";
import "./login.scss";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { EMAIL_PATTERN } from "core/constants";
import { RESOURCES } from "localization/resources";
import { handleInputChange } from "core/formikTools";
import { ApplicationModals } from "redux/modules/modal/types";

interface Props {
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  onSubmit: (
    values: LoginForm,
    formikActions: FormikHelpers<LoginForm>
  ) => void;
  onRegisterClick: () => any;
  inviteeEmail?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_PATTERN, RESOURCES.VALIDATION.EMAIL_PATTERN_INVALID)
    .required(RESOURCES.VALIDATION.EMAIL_REQUIRED),
  password: Yup.string().required(RESOURCES.VALIDATION.PASSWORD_REQUIRED)
});

const EMAIL = "email";
const PASSWORD = "password";

const LoginModal: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, closeModal, onSubmit, onRegisterClick, inviteeEmail } = props;

  const handleClose = () => {
    closeModal("login");
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
          email: inviteeEmail || "",
          password: ""
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
              <h1 className="title">Login</h1>
              <br />
              <br />
              <Input
                header={`${RESOURCES.FIELDS.EMAIL}`}
                value={values[EMAIL]}
                error={touched.email ? errors.email : undefined}
                onChange={
                  inviteeEmail
                    ? undefined
                    : handleInputChange(EMAIL, setFieldValue, setFieldTouched)
                }
              />
              <Input
                header={`${RESOURCES.FIELDS.PASSWORD}`}
                value={values[PASSWORD]}
                type="password"
                error={touched.password ? errors.password : undefined}
                onChange={handleInputChange(
                  PASSWORD,
                  setFieldValue,
                  setFieldTouched
                )}
              />
              <div className="button-container">
                <Button loading={isSubmitting} type="submit" icon="plus">
                  {RESOURCES.LOGIN.SUBMIT}
                </Button>
                {!inviteeEmail && (
                  <Button onClick={onRegisterClick} variant="alt">
                    {RESOURCES.LOGIN.REGISTER}
                  </Button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default connect(null, { closeModal })(LoginModal);
