import React from "react";
import "./projectCard.scss";
import Truncate from "react-truncate";
import { IDashboardProjectInfo } from "models/IDashboardInfo";
import { Link as RouterLink } from "react-router-dom";
import { WEB_ROUTES, CombineRoutes } from "core/web";
import { format } from "date-fns/esm";

interface Props {
  projectInfo: IDashboardProjectInfo;
}

const ProjectCard: React.FunctionComponent<Props> = (props: Props) => {
  const { projectInfo } = props;
  const {
    id,
    name,
    description,
    collaboratorCount,
    assignmentCount,
    isCreator,
    createdOn,
    completedCount,
  } = projectInfo;

  return (
    <RouterLink
      to={CombineRoutes(
        false,
        WEB_ROUTES.MAIN_SCREEN,
        String(id),
        WEB_ROUTES.PROJECT_DETAILS
      )}
      className="project-card"
    >
      <div className="project-card__title">
        <span className="role">
          {isCreator ? "Project lead" : "Collaborator"}{" "}
        </span>
        <span>| {name}</span>
      </div>
      <Truncate
        className="project-card__description"
        lines={3}
        ellipsis={<span>...</span>}
      >
        {description}
      </Truncate>
      <div className="project-card__stats">
        <div className="stat">
          <span className="stat__title">Collaborators</span>
          <span className="stat__label">{collaboratorCount}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Assignments</span>
          <span className="stat__label">{assignmentCount}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Completed</span>
          <span className="stat__label">{completedCount}</span>
        </div>
        <div className="stat">
          <span className="stat__title">Started on</span>
          <span className="stat__label">
            {format(new Date(createdOn), "yyyy-MM-dd")}
          </span>
        </div>
      </div>
    </RouterLink>
  );
};

export default ProjectCard;
