import React from "react";
import "./board.scss";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";
import {
  IAssignmentStatus,
  GetAssignmentStatus,
} from "models/IAssignmentStatus";
import BoardColumn from "components/board/boardColumn/boardColumn";
import { RESOURCES } from "localization/resources";
import Loader from "components/loader/loader";

interface Props {
  assignments?: IBoardAssignmentInfo[];
  isFetchingBoard: boolean;
  onDrop: (assignmentId: string, assignmentStatus: IAssignmentStatus) => void;
}

const filterAssignments = (
  assignments: IBoardAssignmentInfo[],
  status: IAssignmentStatus
): IBoardAssignmentInfo[] => {
  return assignments.filter((x) => x.status === status);
};

const BoardPage: React.FunctionComponent<Props> = (props: Props) => {
  const { assignments, onDrop, isFetchingBoard } = props;

  if (isFetchingBoard) {
    return <Loader showSpinner />;
  }

  if (!assignments) {
    return null;
  }

  return (
    <div className="board-container">
      <BoardColumn
        assignments={filterAssignments(
          assignments,
          GetAssignmentStatus("todo")
        )}
        assignmentStatus={GetAssignmentStatus("todo")}
        header={RESOURCES.ASSIGNMENT.STATUS_TODO}
        onDrop={onDrop}
      />
      <BoardColumn
        assignments={filterAssignments(
          assignments,
          GetAssignmentStatus("inProgress")
        )}
        assignmentStatus={GetAssignmentStatus("inProgress")}
        header={RESOURCES.ASSIGNMENT.STATUS_IN_PROGRESS}
        onDrop={onDrop}
      />
      <BoardColumn
        assignments={filterAssignments(
          assignments,
          GetAssignmentStatus("complete")
        )}
        assignmentStatus={GetAssignmentStatus("complete")}
        header={RESOURCES.ASSIGNMENT.STATUS_COMPLETE}
        onDrop={onDrop}
      />
    </div>
  );
};

export default BoardPage;
