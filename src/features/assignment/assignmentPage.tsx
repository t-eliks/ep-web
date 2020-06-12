import React from "react";
import "./assignmentPage.scss";
import { IAssignmentViewModel } from "models/IAssignmentViewModel";
import AssigneeDropdownContainer from "components/assignment/assigneeDropdown/assigneeDropdownContainer";
import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import { RESOURCES } from "localization/resources";
import Input from "components/inputs/input";
import AssignmentStatus from "components/assignment/assignmentStatus/assignmentStatus";
import "react-day-picker/lib/style.css";
import DayPicker from "components/daypicker/dayPicker";
import {
  handleInputChange,
  handleOptionChange,
  handleInputChangeValue,
} from "core/formikTools";
import Button from "components/buttons/button";
import CommentSectionContainer from "components/comment/commentSectionContainer";
import Loader from "components/loader/loader";
import { format, formatDistanceToNow } from "date-fns";
import BacklogAssignee from "components/assignment/backlogAssignee/backlogAssignee";

interface Props {
  info: IAssignmentViewModel;
  isFetchingAssignment: boolean;
  onSubmit: (
    values: UpdateAssignmentForm,
    formikActions: FormikHelpers<UpdateAssignmentForm>
  ) => void;
  onDeleteClick: (assignmentId: string, assignmentName?: string) => any;
}

export interface UpdateAssignmentForm {
  name: string;
  description: string;
  assigneeId: any;
  deadline?: Date;
  assignmentId: string;
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required(RESOURCES.VALIDATION.NAME_REQUIRED),
  description: Yup.string(),
  assigneeId: Yup.string(),
  deadline: Yup.date(),
});

const NAME = "name";
const DESCRIPTION = "description";
const ASSIGNEE_ID = "assigneeId";
const DEADLINE = "deadline";

const AssignmentPage: React.FunctionComponent<Props> = (props: Props) => {
  const { info, onSubmit, isFetchingAssignment, onDeleteClick } = props;

  const {
    id,
    name,
    description,
    assigneeId,
    status,
    deadline,
    authorFirstName,
    authorLastName,
    lastModifiedFirstName,
    lastModifiedLastName,
    modifiedOn,
  } = info;

  const INITIAL_VALUES = {
    name: name || "",
    assigneeId: assigneeId || "-1",
    description: description || "",
    deadline: deadline ? new Date(deadline) : undefined,
    assignmentId: id,
  };

  return (
    <>
      <div className="card card--flow-column">
        <h1>Assignment details</h1>

        {isFetchingAssignment && <Loader showSpinner />}
        {!isFetchingAssignment && (
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
              return (
                <Form id="form">
                  <Input
                    header="Name"
                    value={values.name}
                    error={touched.name ? errors.name : undefined}
                    onChange={handleInputChange(
                      NAME,
                      setFieldValue,
                      setFieldTouched
                    )}
                  />
                  <div className="col2">
                    <DayPicker
                      value={values.deadline}
                      onChange={(day, _, __) => {
                        handleInputChangeValue(
                          DEADLINE,
                          format(day, "yyyy-MM-dd"),
                          setFieldValue,
                          setFieldTouched
                        );
                      }}
                      header="Deadline"
                    />
                    <AssigneeDropdownContainer
                      selectedId={values[ASSIGNEE_ID]}
                      onChange={handleOptionChange(
                        ASSIGNEE_ID,
                        setFieldValue,
                        setFieldTouched
                      )}
                    />
                  </div>
                  <Input
                    header="Description"
                    value={values.description}
                    error={touched.description ? errors.description : undefined}
                    onChange={handleInputChange(
                      DESCRIPTION,
                      setFieldValue,
                      setFieldTouched
                    )}
                    large
                  />
                  <Button
                    disabled={values === INITIAL_VALUES}
                    loading={isSubmitting}
                    type="submit"
                    icon="pen"
                  >
                    Save
                  </Button>
                  <div className="assignment-page__info">
                    <div className="assignment-page__status">
                      <span className="status-label">Status:</span>
                      <div className="status-box">
                        <AssignmentStatus status={status} />
                      </div>
                    </div>
                    <div className="col2">
                      <div>
                        <div className="assignment-page__info-label-wrapper">
                          <span className="assignment-page__info-label">
                            Created by:
                          </span>
                        </div>
                        <div className="assignment-page__info-assignee-wrapper">
                          <BacklogAssignee
                            firstName={authorFirstName}
                            lastName={authorLastName}
                          />
                        </div>
                      </div>
                      <div>
                        {modifiedOn && (
                          <>
                            <div className="assignment-page__info-label-wrapper">
                              <span className="assignment-page__info-label">
                                Last modified{" "}
                                {formatDistanceToNow(
                                  Date.parse(`${modifiedOn}Z`)
                                )}{" "}
                                ago by:
                              </span>
                            </div>
                            <div className="assignment-page__info-assignee-wrapper">
                              <BacklogAssignee
                                firstName={lastModifiedFirstName}
                                lastName={lastModifiedLastName}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
        <div>
          <Button variant="delete" onClick={onDeleteClick(id, name)}>
            Delete
          </Button>
        </div>
      </div>

      <div className="card card--flow-column">
        <h1>Comments</h1>
        <CommentSectionContainer assignmentId={+id} />
      </div>
    </>
  );
};

export default AssignmentPage;
