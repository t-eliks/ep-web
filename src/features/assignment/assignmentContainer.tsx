import React from "react";
import { connect } from "react-redux";
import AssignmentPage, { UpdateAssignmentForm } from "./assignmentPage";
import { IAssignmentViewModel } from "models/IAssignmentViewModel";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import {
  getAssignment,
  updateAssignment,
  deleteAssignment,
} from "redux/modules/assignment/actions";
import { openModalWithParams } from "redux/modules/modal/actions";

import { RouteComponentProps } from "react-router-dom";
import { ApplicationModals, ModalParams } from "redux/modules/modal/types";
import history from "core/history";
import { WEB_ROUTES, GetMainScreenRoute } from "core/web";

interface Match {
  assignmentId?: string | undefined;
}

interface Props extends RouteComponentProps<Match> {
  info?: IAssignmentViewModel;
  projectId?: number;
  getAssignment: (assignmentId: string) => void;
  updateAssignment: (values: UpdateAssignmentForm) => any;
  deleteAssignment: (assignmentId: string) => any;
  openModalWithParams: (modal: ApplicationModals, param: ModalParams) => any;
  isFetchingAssignment: boolean;
}

class AssignmentContainer extends React.Component<Props> {
  componentDidMount() {
    this.fetchAssignment();
  }

  fetchAssignment = () => {
    const { getAssignment, match } = this.props;
    const { assignmentId } = match.params;

    if (getAssignment && assignmentId) {
      getAssignment(assignmentId);
    }
  };

  handleSubmit = async (values: UpdateAssignmentForm) => {
    const { updateAssignment } = this.props;

    await updateAssignment(values).then(() => {
      this.fetchAssignment();
    });
  };

  deleteAssignment = (assignmentId: string) => () => {
    const { deleteAssignment, projectId } = this.props;

    deleteAssignment(assignmentId);

    if (projectId) {
      history.push(
        GetMainScreenRoute(
          projectId,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.PROJECT_DETAILS
        )
      );
    }
  };

  handleDeleteAssignmentClick = (
    assignmentId: string,
    assignmentName?: string
  ) => () => {
    const { openModalWithParams } = this.props;

    openModalWithParams("delete", {
      onConfirm: this.deleteAssignment(assignmentId),
      elementName: assignmentName,
    });
  };

  render() {
    const { info, isFetchingAssignment } = this.props;

    if (info) {
      return (
        <AssignmentPage
          isFetchingAssignment={isFetchingAssignment}
          onDeleteClick={this.handleDeleteAssignmentClick}
          onSubmit={this.handleSubmit}
          info={info}
        />
      );
    } else {
      return null;
    }
  }
}

export default connect(
  (state: AppState) => ({
    projectId: state.project.projectDetails?.id,
    info: state.assignment.assignmentInfo,
    isFetchingAssignment: state.assignment.isFetchingAssignment,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getAssignment,
        updateAssignment,
        deleteAssignment,
        openModalWithParams,
      },
      dispatch
    )
)(AssignmentContainer);
