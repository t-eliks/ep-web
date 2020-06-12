import React from "react";
import HeaderBar from "components/layout/headerBar/headerBar";
import { Link } from "react-router-dom";
import { WEB_ROUTES } from "core/web";
import Button from "components/buttons/button";
import Input from "components/inputs/input";
import * as Yup from "yup";
import { RESOURCES } from "localization/resources";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "core/constants";
import { Formik, Form, FormikHelpers } from "formik";
import { handleInputChange } from "core/formikTools";
import { IApplicationUser } from "models/IApplicationUser";
import Loader from "components/loader/loader";

interface Props {
  onSubmit: (
    values: ProfileForm,
    formikActions: FormikHelpers<ProfileForm>
  ) => void;
  onLogout: () => void;
  isFetchingProfile: boolean;
  profileInfo?: IApplicationUser;
  onDeleteClick: () => void;
}

export interface ProfileForm {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  confirmPassword?: string;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_PATTERN, RESOURCES.VALIDATION.EMAIL_PATTERN_INVALID)
    .required(RESOURCES.VALIDATION.EMAIL_REQUIRED),
  firstName: Yup.string().required(RESOURCES.VALIDATION.FIRST_NAME_REQUIRED),
  lastName: Yup.string().required(RESOURCES.VALIDATION.LAST_NAME_REQUIRED),
  password: Yup.string().matches(
    PASSWORD_PATTERN,
    RESOURCES.VALIDATION.PASSWORD_PATTERN_INVALID
  ),
  confirmPassword: Yup.string().when("password", {
    is: (x) => x,
    then: Yup.string()
      .oneOf(
        [Yup.ref("password"), ""],
        RESOURCES.VALIDATION.CONFIRM_PASSWORD_MATCH
      )
      .required(RESOURCES.VALIDATION.CONFIRM_PASSWORD_REQUIRED),
    otherwise: Yup.string(),
  }),
});

const EMAIL = "email";
const FIRSTNAME = "firstName";
const LASTNAME = "lastName";
const PASSWORD = "password";
const CONFIRM_PASSWORD = "confirmPassword";

const ProfilePage: React.FunctionComponent<Props> = (props: Props) => {
  const {
    onSubmit,
    profileInfo,
    onLogout,
    isFetchingProfile,
    onDeleteClick,
  } = props;

  const INITIAL_VALUES = {
    email: (profileInfo && profileInfo.email) || "",
    firstName: (profileInfo && profileInfo.firstName) || "",
    lastName: (profileInfo && profileInfo.lastName) || "",
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <HeaderBar>
        <h1 className="dashboard__title">Profile</h1>
        <div className="dashboard-buttons">
          <Link to={WEB_ROUTES.DASHBOARD}>
            <Button appendClass="dashboard-buttons__profile" icon="file-code">
              My Projects
            </Button>
          </Link>
          <Button variant="alt" icon="sign-out-alt" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </HeaderBar>
      <div className="profile">
        <div className="profile-page-container">
          <div className="card card--flow-column">
            <Formik
              initialValues={INITIAL_VALUES}
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
                if (isFetchingProfile) {
                  return <Loader showSpinner />;
                }

                return (
                  <Form id="form">
                    <h1>Profile</h1>
                    <Input
                      header={`${RESOURCES.FIELDS.EMAIL}*`}
                      value={values[EMAIL]}
                      error={touched.email ? errors.email : undefined}
                      onChange={handleInputChange(
                        EMAIL,
                        setFieldValue,
                        setFieldTouched
                      )}
                    />
                    <div className="col2">
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
                    </div>
                    <div className="col2">
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
                      <Input
                        header={`${RESOURCES.FIELDS.CONFIRM_PASSWORD}`}
                        value={values[CONFIRM_PASSWORD]}
                        type="password"
                        error={
                          touched.confirmPassword
                            ? errors.confirmPassword
                            : undefined
                        }
                        onChange={handleInputChange(
                          CONFIRM_PASSWORD,
                          setFieldValue,
                          setFieldTouched
                        )}
                      />
                    </div>
                    <Button
                      disabled={
                        JSON.stringify(values) ===
                        JSON.stringify(INITIAL_VALUES)
                      }
                      loading={isSubmitting}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <div className="card card--flow-column">
            <h1>Delete profile</h1>
            <div>
              <Button variant="delete" onClick={onDeleteClick}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
