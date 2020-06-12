import React from "react";
import "./projectDetails.scss";
import { connect } from "react-redux";
import { AppState } from "index";
import { IProjectDetails } from "models/IProjectDetails";
import { bindActionCreators } from "redux";
import {
  getProjectDetails,
  deleteProject,
} from "redux/modules/project/actions";
import { openModalWithParams } from "redux/modules/modal/actions";
import { RouteComponentProps } from "react-router-dom";
import BacklogAssignmentList from "components/assignment/backlogAssignment/backlogAssignmentList";
import { IProjectDetailsMember } from "models/IProjectDetailsMember";
import Loader from "components/loader/loader";
import Popup from "components/popups/popup";
import Button from "components/buttons/button";
import PopupMenu from "components/menus/popupMenu";
import PopupMenuItem from "components/menus/popupMenuItem";
import { ApplicationModals, ModalParams } from "redux/modules/modal/types";
import history from "core/history";
import { WEB_ROUTES } from "core/web";

interface MatchProps {
  id?: string;
}

interface Props extends RouteComponentProps<MatchProps> {
  projectDetails?: IProjectDetails;
  getProjectDetails: (projectId: string) => any;
  deleteProject: (projectId: string) => any;
  isFetchingDetails: boolean;
  openModalWithParams: (modal: ApplicationModals, params: ModalParams) => any;
}

class ProjectDetails extends React.Component<Props> {
  componentDidMount() {
    const { getProjectDetails, match } = this.props;
    const { id } = match.params;

    if (id) {
      getProjectDetails(id);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { id: oldId } = prevProps.match.params;
    const { id: newId } = this.props.match.params;

    if (oldId !== newId && newId) {
      const { getProjectDetails } = this.props;

      getProjectDetails(newId);
    }
  }

  handleEditClick = () => {
    const { openModalWithParams, projectDetails } = this.props;

    if (projectDetails) {
      openModalWithParams("newProject", {
        project: projectDetails,
      });
    }
  };

  handleDelete = (id: number) => async () => {
    const { deleteProject } = this.props;

    await deleteProject(String(id)).then(() => {
      history.push(WEB_ROUTES.INDEX);
    });
  };

  handleDeleteClick = () => {
    const { openModalWithParams, projectDetails } = this.props;

    if (projectDetails) {
      openModalWithParams("delete", {
        elementName: projectDetails.name,
        onConfirm: this.handleDelete(projectDetails.id),
      });
    }
  };

  renderMemberInfo = (memberInfo: IProjectDetailsMember) => {
    const {
      index,
      firstName,
      lastName,
      assignments,
      completedAssignments,
      isCreator,
    } = memberInfo;
    return (
      <div className="card card--flow-column" key={index}>
        <h1>{`${firstName} ${lastName} ${
          isCreator ? "| PROJECT LEAD" : ""
        }`}</h1>
        <span className="completed-assignments">
          Completed assignments: {completedAssignments}
        </span>
        {assignments && assignments.length > 0 && (
          <>
            <span className="current-assignments">
              Current ongoing assignments:
            </span>
            {assignments && <BacklogAssignmentList assignments={assignments} />}
          </>
        )}
        {(!assignments || assignments.length <= 0) && (
          <span>Not currently assigned to any ongoing tasks.</span>
        )}
      </div>
    );
  };

  render() {
    const { projectDetails, isFetchingDetails } = this.props;

    if (isFetchingDetails) {
      return <Loader showSpinner />;
    }

    if (!projectDetails) {
      return null;
    }

    const {
      name,
      isCreator,
      description,
      completedAssignments,
      latestAssignments,
      memberAssignmentInfo,
      leftToDo,
    } = projectDetails;

    return (
      <div className="project-details-container">
        <div className="card project-details-header">
          <h1>{name}</h1>
          {isCreator && (
            <Popup
              renderOwner={() => <Button icon="ellipsis-v" variant="icon" />}
            >
              <PopupMenu>
                <PopupMenuItem
                  icon="pen"
                  header="Edit"
                  onClick={this.handleEditClick}
                />
                <PopupMenuItem
                  icon="trash"
                  header="Delete"
                  onClick={this.handleDeleteClick}
                />
              </PopupMenu>
            </Popup>
          )}
        </div>
        <div className="card card--flow-column">
          <h1>Description</h1>
          <span>{description}</span>
        </div>
        <div className="statistics-container">
          <div className="card card--flow-column statistics-container__card">
            <h1>Assignments</h1>
            <div className="statistics-container__card--completed">
              <span className="completed-number">{completedAssignments}</span>
              <span className="completed-text">Completed work</span>
            </div>
            <div className="statistics-container__card--left">
              <span className="left-number">{leftToDo}</span>
              <span className="left-text">Left to do</span>
            </div>
          </div>
          <div className="card card--flow-column statistics-container__assignments">
            <h1>Most recent</h1>
            {latestAssignments && (
              <BacklogAssignmentList assignments={latestAssignments} />
            )}
            {(!latestAssignments || latestAssignments.length <= 0) && (
              <span>No assignments have been created yet.</span>
            )}
          </div>
        </div>
        <h1 className="members">Collaborator statistics</h1>
        {memberAssignmentInfo &&
          memberAssignmentInfo.length > 0 &&
          memberAssignmentInfo.map((x) => this.renderMemberInfo(x))}
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    projectDetails: state.project.projectDetails,
    isFetchingDetails: state.project.isFetchingDetails,
  }),
  (dispatch) =>
    bindActionCreators(
      { getProjectDetails, openModalWithParams, deleteProject },
      dispatch
    )
)(ProjectDetails);
