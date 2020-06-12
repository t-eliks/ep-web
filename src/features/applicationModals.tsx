import React from "react";
import RegisterModalContainer from "./register/registerModalContainer";
import LoginModalContainer from "./login/loginModalContainer";
import NewProjectModalContainer from "./dashboard/newProject/newProjectModalContainer";
import NewEpicModalContainer from "./backlog/newEpic/newEpicModalContainer";
import NewAssignmentModalContainer from "./backlog/newAssignment/newAssignmentModalContainer";
import DeleteModalContainer from "./modals/deleteModalContainer";

const ApplicationModals: React.FunctionComponent = () => {
  return (
    <div>
      <RegisterModalContainer />
      <LoginModalContainer />
      <NewProjectModalContainer />
      <NewEpicModalContainer />
      <NewAssignmentModalContainer />
      <DeleteModalContainer />
    </div>
  );
};

export default ApplicationModals;
