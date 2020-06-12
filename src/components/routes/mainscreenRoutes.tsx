import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CombineRoutes, WEB_ROUTES } from "core/web";
import ProjectDetails from "features/project_details/projectDetails";
import BacklogContainer from "features/backlog/backlogContainer";
import BoardContainer from "features/board/boardContainer";
import AssignmentContainer from "features/assignment/assignmentContainer";
import CollaboratorManagementContainer from "features/collaborator_management/collaboratorManagementContainer";
import DiscussionContainer from "features/discussion/discussionContainer";
import NotificationsContainer from "features/notifications/notificationsContainer";

const MainscreenRoutes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.PROJECT_DETAILS
        )}
        component={ProjectDetails}
      />
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.BACKLOG
        )}
        component={BacklogContainer}
      />
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.BOARD
        )}
        component={BoardContainer}
      />
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.ASSIGNMENT_PATTERN
        )}
        component={AssignmentContainer}
      />
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.COLLABORATOR_MANAGEMENT
        )}
        component={CollaboratorManagementContainer}
      />
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.DISCUSSION
        )}
        component={DiscussionContainer}
      />
      <Route
        path={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.NOTIFICATIONS
        )}
        component={NotificationsContainer}
      />
      <Redirect
        to={CombineRoutes(
          true,
          WEB_ROUTES.MAIN_SCREEN_PATTERN,
          WEB_ROUTES.PROJECT_DETAILS
        )}
      />
    </Switch>
  );
};

export default MainscreenRoutes;
