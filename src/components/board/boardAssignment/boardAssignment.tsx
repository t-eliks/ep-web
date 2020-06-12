import React, { useState } from "react";
import "./boardAssignment.scss";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RESOURCES } from "localization/resources";
import AssignmentStatusLabel from "components/assignment/assignmentStatus/assignmentStatus";
import { format } from "date-fns";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "core/constants";
import { IAssignmentStatus } from "models/IAssignmentStatus";
import history from "core/history";
import { CombineRoutes, WEB_ROUTES } from "core/web";

type IOnDrop = (
  assignmentId: string,
  assignmentStatus: IAssignmentStatus,
  assignmentBeforeId?: string
) => void;

interface Props {
  info: IBoardAssignmentInfo;
  onDrop: IOnDrop;
}

const renderAssignee = (firstName: string, lastName: string) => {
  return <span>{`${firstName} ${lastName}`}</span>;
};

const renderUnassigned = () => {
  return <span>{RESOURCES.ASSIGNMENT.UNASSIGNED}</span>;
};

const renderDate = (date: string) => {
  return (
    <div className="board-assignment__footer--date">
      <FontAwesomeIcon className="icon-margin" icon="calendar-plus" />
      {format(new Date(date), "yyyy-MM-dd")}
    </div>
  );
};

const handleClick = (id: string) => () => {
  history.push(CombineRoutes(false, WEB_ROUTES.ASSIGNMENT, id));
};

const BoardAssignment: React.FunctionComponent<Props> = (props: Props) => {
  const { info, onDrop } = props;
  const [isHovering, changeIsHovering] = useState(false);

  const {
    id,
    name,
    assigneeFirstName,
    assigneeLastName,
    commentCount,
    status,
    deadline,
  } = info;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ASSIGNMENT, id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ASSIGNMENT,
    drop: (item: any) => onDrop(item.id, status, String(id)),
  });

  const handleMouseHover = (isHovering: boolean) => () => {
    changeIsHovering(isHovering);
  };

  return (
    <div
      ref={drag}
      className={`board-assignment ${
        isDragging ? "board-assignment--drag" : ""
      }`}
      onClick={handleClick(String(id))}
      onMouseEnter={handleMouseHover(true)}
      onMouseLeave={handleMouseHover(false)}
    >
      <div ref={drop}>
        <span className="board-assignment__name">{name}</span>
        <div className="board-assignment__assignee">
          <FontAwesomeIcon className="icon-margin" icon="user" />
          {assigneeFirstName && assigneeLastName
            ? renderAssignee(assigneeFirstName, assigneeLastName)
            : renderUnassigned()}
        </div>
      </div>
      <div>
        <div className="board-assignment__footer">
          <AssignmentStatusLabel isHovering={isHovering} status={status} />
          {deadline && renderDate(deadline)}
        </div>
        <div className="board-assignment__assignee">
          <FontAwesomeIcon className="icon-margin" icon="comment" />
          {commentCount}
        </div>
      </div>
    </div>
  );
};

export default BoardAssignment;
