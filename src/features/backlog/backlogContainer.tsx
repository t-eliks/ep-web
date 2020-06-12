import React from "react";
import Backlog from "./backlog";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openModalWithParams } from "redux/modules/modal/actions";
import { ApplicationModals, ModalParams } from "redux/modules/modal/types";
import { getBacklogInfo, deleteEpic } from "redux/modules/epic/actions";
import { RouteComponentProps } from "react-router-dom";
import { IBacklogInfo } from "models/IBacklogInfo";
import { AppState } from "index";
import { IBacklogEpicInfo } from "models/IBacklogEpicInfo";

interface MatchProps {
  id?: string | undefined;
}

interface Props extends RouteComponentProps<MatchProps> {
  openModalWithParams: (modal: ApplicationModals, params: ModalParams) => any;
  getBacklogInfo: (projectNumber: string) => any;
  backlogInfo?: IBacklogInfo;
  isFetchingBacklog: boolean;
  getCollaboratorOverviewInfo: (projectNumber: string) => any;
  deleteEpic: (epicId: string) => any;
}

class BacklogContainer extends React.Component<Props> {
  componentDidMount() {
    const { getBacklogInfo, match } = this.props;
    const { id } = match.params;

    if (id) {
      getBacklogInfo(id);
    }
  }

  handleCreateEpicClick = () => {
    const { openModalWithParams, match } = this.props;
    const { id } = match.params;

    if (id) {
      openModalWithParams("newEpic", { projectId: id });
    }
  };

  handleCreateAssignmentClick = (epicId: string) => () => {
    const { openModalWithParams } = this.props;

    openModalWithParams("newAssignment", { epicId: epicId });
  };

  deleteEpic = (epicId: string) => () => {
    const { deleteEpic } = this.props;

    deleteEpic(epicId);
  };

  handleDeleteEpicClick = (epicId: string, epicName?: string) => () => {
    const { openModalWithParams } = this.props;

    openModalWithParams("delete", {
      onConfirm: this.deleteEpic(epicId),
      elementName: epicName,
    });
  };

  handleEditEpicClick = (epic: IBacklogEpicInfo) => () => {
    const { openModalWithParams, match } = this.props;
    const { id } = match.params;

    if (id) {
      openModalWithParams("newEpic", { epic: epic });
    }
  };

  render() {
    const { backlogInfo, isFetchingBacklog } = this.props;

    return (
      <Backlog
        backlogInfo={backlogInfo}
        isFetchingBacklog={isFetchingBacklog}
        onCreateEpicClick={this.handleCreateEpicClick}
        onCreateAssignmentClick={this.handleCreateAssignmentClick}
        onEditClick={this.handleEditEpicClick}
        onDeleteClick={this.handleDeleteEpicClick}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    backlogInfo: state.epic.backlogInfo,
    isFetchingBacklog: state.epic.isFetchingBacklog,
  }),
  (dispatch) =>
    bindActionCreators(
      { openModalWithParams, getBacklogInfo, deleteEpic },
      dispatch
    )
)(BacklogContainer);
