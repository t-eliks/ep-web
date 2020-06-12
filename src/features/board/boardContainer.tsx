import React from "react";
import BoardPage from "./boardPage";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import { getBoardInfo } from "redux/modules/assignment/actions";
import { updateAssignmentStatus } from "redux/modules/assignment/actions";
import { IAssignmentStatus } from "models/IAssignmentStatus";

interface MatchProps {
  id?: string;
}

interface Props extends RouteComponentProps<MatchProps> {
  assignments?: IBoardAssignmentInfo[];
  isFetchingBoard: boolean;
  getBoardInfo: (projectId: string) => any;
  updateAssignmentStatus: (
    assignmentId: string,
    assignmentStatus: IAssignmentStatus,
    assignmentBeforeId?: string
  ) => void;
}

class BoardContainer extends React.Component<Props> {
  componentDidMount() {
    const { getBoardInfo, match } = this.props;
    const { params } = match;
    const { id } = params;

    if (id) {
      getBoardInfo(id);
    }
  }

  handleAssignmentDrop = (
    assignmentId: string,
    assignmentStatus: IAssignmentStatus,
    assignmentBeforeId?: string
  ) => {
    const { updateAssignmentStatus } = this.props;

    updateAssignmentStatus(assignmentId, assignmentStatus, assignmentBeforeId);
  };

  render() {
    const { assignments, isFetchingBoard } = this.props;

    return (
      <BoardPage
        onDrop={this.handleAssignmentDrop}
        isFetchingBoard={isFetchingBoard}
        assignments={assignments}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    assignments: state.assignment.boardAssignments,
    isFetchingBoard: state.assignment.isFetchingBoard,
  }),
  (dispatch) =>
    bindActionCreators({ getBoardInfo, updateAssignmentStatus }, dispatch)
)(BoardContainer);
