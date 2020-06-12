import React from "react";
import { IAssignmentStatus } from "models/IAssignmentStatus";
import { RESOURCES } from "localization/resources";
import "./assignmentStatus.scss";

interface Props {
  status: IAssignmentStatus;
  isHovering?: boolean;
}

const resolveClassName = (status: IAssignmentStatus): string => {
  switch (status) {
    case 2:
      return "--complete";
    case 1:
      return "--in-progress";
    case 0:
      return "--todo";
  }
};

const resolveResource = (status: IAssignmentStatus): string => {
  switch (status) {
    case 2:
      return RESOURCES.ASSIGNMENT.STATUS_COMPLETE;
    case 1:
      return RESOURCES.ASSIGNMENT.STATUS_IN_PROGRESS;
    case 0:
      return RESOURCES.ASSIGNMENT.STATUS_TODO;
  }
};

const AssignmentStatus: React.FunctionComponent<Props> = (props: Props) => {
  const { status, isHovering } = props;

  return (
    <span
      className={`assignment-status assignment-status${resolveClassName(
        status
      )}${isHovering ? "--hover" : ""}`}
    >
      {resolveResource(status)}
    </span>
  );
};

export default AssignmentStatus;
