import React from "react";
import "./invitationPage.scss";
import Button from "components/buttons/button";
import { IPendingInvitation } from "models/IPendingInvitation";

interface Props {
  invitationInfo: IPendingInvitation;
  isAuthenticated: boolean;
  onAuthenticatedAccept: () => void;
  onCreateAccount: () => void;
  onLogin: () => void;
}

const InvitationPage: React.FunctionComponent<Props> = (props: Props) => {
  const {
    invitationInfo,
    isAuthenticated,
    onAuthenticatedAccept,
    onCreateAccount,
    onLogin,
  } = props;
  const {
    projectName,
    invitedByFirstName,
    invitedByLastName,
    email,
    accountExists,
  } = invitationInfo;

  return (
    <div className="invitation-container">
      <div className="card card--flow-column">
        <h1>You have been invited to join a project:</h1>
        <p>{email}</p>
        <h2>{projectName}</h2>
        <p>
          <b>
            {invitedByFirstName} {invitedByLastName}
          </b>{" "}
          has invited you to join them on their project!
        </p>
        <div className="accept-button-container">
          {isAuthenticated && (
            <Button appendClass="accept-button" onClick={onAuthenticatedAccept}>
              Accept
            </Button>
          )}
          {!isAuthenticated && (
            <>
              {!accountExists && (
                <Button appendClass="accept-button" onClick={onCreateAccount}>
                  Create account
                </Button>
              )}
              {accountExists && (
                <Button appendClass="accept-button" onClick={onLogin}>
                  Login
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;
