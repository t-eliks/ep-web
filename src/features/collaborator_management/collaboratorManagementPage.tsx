import React from "react";
import Button from "components/buttons/button";
import "./collaboratorManagementPage.scss";
import Input from "components/inputs/input";
import { RESOURCES } from "localization/resources";
import { IPendingInvitation } from "models/IPendingInvitation";
import PendingCollaboratorList from "components/collaborator/pendingCollaboratorList";
import Loader from "components/loader/loader";
import { EMAIL_PATTERN } from "core/constants";

interface Props {
  invitationLink?: string;
  pendingInvitations?: IPendingInvitation[];
  isFetchingPendingInvitations: boolean;
  isFetchingInvitationInfo: boolean;
  onSubmit: (email: string) => void;
  onCancel: (invitationId: number) => void;
}

const CollaboratorManagementPage: React.FunctionComponent<Props> = (
  props: Props
) => {
  const {
    invitationLink,
    isFetchingInvitationInfo,
    pendingInvitations,
    onSubmit,
    isFetchingPendingInvitations,
    onCancel,
  } = props;
  const [email, changeEmail] = React.useState("");
  const [error, changeError] = React.useState("");
  const [invitationCreated, changeInvitationCreated] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeEmail(event.target.value);
    changeError("");
  };

  const handleButtonClick = () => {
    if (!email) {
      changeError(RESOURCES.VALIDATION.EMAIL_REQUIRED);

      return;
    }

    if (!new RegExp(EMAIL_PATTERN).test(email)) {
      changeError(RESOURCES.VALIDATION.EMAIL_PATTERN_INVALID);

      return;
    }

    changeInvitationCreated(true);

    onSubmit(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="card card--flow-column">
        <h1>Invite a collaborator</h1>
        <span>
          Invite a new collaborator to join your project! Enter their email to
          generate an invitation link:
        </span>
        <div className="invitation">
          <form onSubmit={handleSubmit}>
            <Input
              error={error}
              value={email}
              header="Email"
              onChange={handleChange}
            ></Input>
            <Button
              type="submit"
              loading={isFetchingInvitationInfo}
              appendClass="invitation-button"
              onClick={handleButtonClick}
            >
              Invite
            </Button>
          </form>
          {invitationCreated && isFetchingInvitationInfo && (
            <Loader showSpinner />
          )}
          {invitationCreated && !isFetchingInvitationInfo && invitationLink && (
            <div className="invitation-link">
              <Input header="Invitation link" value={invitationLink} />
            </div>
          )}
        </div>
      </div>
      <div className="card card--flow-column">
        <h1>Pending invitations</h1>
        {isFetchingPendingInvitations && <Loader showSpinner />}
        {!isFetchingPendingInvitations && (
          <>
            {pendingInvitations && pendingInvitations.length > 0 && (
              <PendingCollaboratorList
                onCancel={onCancel}
                invitations={pendingInvitations}
              />
            )}
            {(!pendingInvitations || pendingInvitations.length <= 0) && (
              <span>No invitations currently pending.</span>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CollaboratorManagementPage;
