export const WEB_ROUTES = {
  INDEX: "",
  MAIN_SCREEN_PATTERN: "app/:id",
  MAIN_SCREEN: "app",
  DASHBOARD: "dashboard",
  PROJECT_DETAILS: "details",
  BACKLOG: "backlog",
  BOARD: "board",
  ASSIGNMENT: "assignment",
  ASSIGNMENT_PATTERN: "assignment/:assignmentId",
  COLLABORATOR_MANAGEMENT: "collaborator-management",
  INVITATION_PATTERN: "invitation/:token",
  INVITATION: "invitation",
  DISCUSSION: "discussion",
  PROFILE: "profile",
  NOTIFICATIONS: "notifications",
};

export function GetRoute(route: string, absolute = false) {
  const url = process.env.REACT_APP_WEB_URL;
  return (absolute && url ? url : "") + "/" + route;
}

export function CombineRoutes(
  prependForwardSlash: boolean,
  ...routes: string[]
) {
  return routes.reduce((prev: string, current: string) => {
    return (prependForwardSlash ? "/" : "") + `${prev}/${current}`;
  });
}

export function GetMainScreenRoute(projectId: number, ...routes: string[]) {
  var regex = /:id/;
  return CombineRoutes(true, ...routes).replace(regex, String(projectId));
}
