import React from "react";
import { ICollaboratorOverview } from "models/ICollaboratorOverview";
import { connect } from "react-redux";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import { getCollaboratorOverviewInfo } from "redux/modules/assignment/actions";
import AssigneeDropdown from "./assigneeDropdown";

interface Props {
  collaborators?: ICollaboratorOverview[];
  isFetching: boolean;
  selectedId: string;
  onChange: (option: any) => void;
  projectId?: number;
  getCollaboratorOverviewInfo: (projectId: string) => void;
}

class AssigneeDropdownContainer extends React.Component<Props> {
  componentDidMount() {
    const { getCollaboratorOverviewInfo, projectId } = this.props;

    if (projectId) {
      getCollaboratorOverviewInfo(String(projectId));
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { projectId: newProjectId } = this.props;
    const { projectId: prevProjectId } = prevProps;

    if (newProjectId !== prevProjectId) {
      const { getCollaboratorOverviewInfo } = this.props;

      if (getCollaboratorOverviewInfo) {
        getCollaboratorOverviewInfo(String(newProjectId));
      }
    }
  }

  render() {
    const { collaborators, isFetching, selectedId, onChange } = this.props;
    if (collaborators) {
      return (
        <AssigneeDropdown
          collaborators={collaborators}
          isFetching={isFetching}
          selectedId={selectedId}
          onChange={onChange}
        />
      );
    } else {
      return null;
    }
  }
}

export default connect(
  (state: AppState) => ({
    collaborators: state.assignment.collaborators,
    isFetching: state.assignment.isFetchingAssignees,
    projectId: state.project.projectDetails?.id,
  }),
  (dispatch) => bindActionCreators({ getCollaboratorOverviewInfo }, dispatch)
)(AssigneeDropdownContainer);
