import React from "react";
import { IAssignmentInfo } from "models/IAssignmentInfo";
import BacklogAssignee from "../backlogAssignee/backlogAssignee";
import AssignmentStatus from "../assignmentStatus/assignmentStatus";
import history from "core/history";
import { CombineRoutes, WEB_ROUTES } from "core/web";

interface Props {
  assignments: IAssignmentInfo[];
}

const handleAssignmentClick = (assignmentId: number) => () => {
  history.push(
    CombineRoutes(false, WEB_ROUTES.ASSIGNMENT, String(assignmentId))
  );
};

const renderAssignment = (info: IAssignmentInfo) => {
  const { id, name, assigneeFirstName, assigneeLastName, status } = info;

  return (
    <tr key={id} onClick={handleAssignmentClick(id)}>
      <th className="th-wide">{name}</th>
      <th className="th-small">
        <BacklogAssignee
          firstName={assigneeFirstName}
          lastName={assigneeLastName}
        />
      </th>
      <th className="th-small">
        <AssignmentStatus status={status} />
      </th>
    </tr>
  );
};

const BacklogAssignmentList: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { assignments } = props;

  return (
    <table className="table-reg">
      <tbody>{assignments.map((x) => renderAssignment(x))}</tbody>
    </table>
  );
};

export default BacklogAssignmentList;
