import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./backlogAssignee.scss";
import { RESOURCES } from "localization/resources";

interface Props {
  firstName?: string;
  lastName?: string;
}

const renderName = (firstName: string, lastName: string) => {
  return (
    <>
      <FontAwesomeIcon className="backlog-assignee__icon" icon="user" />
      <span>{`${firstName} ${lastName}`}</span>
    </>
  );
};

const renderUnassigned = () => {
  return (
    <span className="backlog-assignee--unassigned">
      {RESOURCES.ASSIGNMENT.UNASSIGNED}
    </span>
  );
};

const BacklogAssignee: React.FunctionComponent<Props> = (props: Props) => {
  const { firstName, lastName } = props;

  return (
    <div className="backlog-assignee">
      {firstName && lastName
        ? renderName(firstName, lastName)
        : renderUnassigned()}
    </div>
  );
};

export default BacklogAssignee;
