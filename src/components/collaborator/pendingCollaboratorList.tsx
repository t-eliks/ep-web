import React from "react";
import { IPendingInvitation } from "models/IPendingInvitation";
import BacklogAssignee from "components/assignment/backlogAssignee/backlogAssignee";
import { format } from "date-fns/esm";
import Button from "components/buttons/button";

interface Props {
  invitations: IPendingInvitation[];
  onClick?: () => void;
  onCancel: (invitationId: number) => void;
}

const renderPendingCollaborator = (
  info: IPendingInvitation,
  onCancel: (
    id: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onClick?: () => void
) => {
  const { id, email, createdOn, invitedByFirstName, invitedByLastName } = info;

  return (
    <tr key={id} onClick={onClick}>
      <th className="th-wide">{email}</th>
      <th className="th-small">
        <BacklogAssignee
          firstName={invitedByFirstName}
          lastName={invitedByLastName}
        />
      </th>
      <th className="th-small">{format(new Date(createdOn), "yyyy-MM-dd")}</th>
      <th className="th-small">
        <Button variant="delete" onClick={onCancel(id)}>
          Cancel
        </Button>
      </th>
    </tr>
  );
};

const PendingCollaboratorList: React.FunctionComponent<Props> = (
  props: Props
) => {
  const { invitations, onClick, onCancel } = props;

  const handleButtonClick = (id: number) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onCancel(id);
  };

  return (
    <table className="table-reg">
      <tbody>
        <tr>
          <th className="th-wide">Email</th>
          <th className="th-small">Invited By</th>
          <th className="th-small">Invited On</th>
          <th className="th-small" />
        </tr>
        {invitations.map((x) =>
          renderPendingCollaborator(x, handleButtonClick, onClick)
        )}
      </tbody>
    </table>
  );
};

export default PendingCollaboratorList;
