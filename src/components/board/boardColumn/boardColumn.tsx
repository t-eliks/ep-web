import React from "react";
import "./boardColumn.scss";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";
import BoardAssignment from "../boardAssignment/boardAssignment";
import { ItemTypes } from "core/constants";
import { useDrop } from "react-dnd";
import { IAssignmentStatus } from "models/IAssignmentStatus";

type IOnDrop = (
  assignmentId: string,
  assignmentStatus: IAssignmentStatus,
  assignmentBeforeId?: string
) => void;

interface Props {
  assignments: IBoardAssignmentInfo[];
  header: string;
  assignmentStatus: IAssignmentStatus;
  onDrop: IOnDrop;
}

const renderAssignments = (
  assignments: IBoardAssignmentInfo[],
  onDrop: IOnDrop
) => {
  return assignments.map(x => (
    <BoardAssignment onDrop={onDrop} key={x.id} info={x} />
  ));
};

const BoardColumn: React.FunctionComponent<Props> = (props: Props) => {
  const { assignments, header, onDrop, assignmentStatus } = props;

  const [, drop] = useDrop({
    accept: ItemTypes.ASSIGNMENT,
    drop: (item: any) => onDrop(item.id, assignmentStatus)
  });

  return (
    <div ref={drop} className="board-column">
      <h1>{header}</h1>
      {renderAssignments(assignments, onDrop)}
    </div>
  );
};

export default BoardColumn;
