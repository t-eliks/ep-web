import React from "react";
import "./dashboard.scss";
import ProjectCard from "components/dashboard/projectCard/projectCard";
import Button from "components/buttons/button";
import { IDashboardProjectInfo } from "models/IDashboardInfo";
import HeaderBar from "components/layout/headerBar/headerBar";
import Loader from "components/loader/loader";
import { Link } from "react-router-dom";
import { WEB_ROUTES } from "core/web";

interface Props {
  onCreateClick: () => void;
  projects?: IDashboardProjectInfo[];
  onLogoutClick: () => any;
  isFetchingProjects: boolean;
}

const Dashboard: React.FunctionComponent<Props> = (props: Props) => {
  const { onCreateClick, projects, onLogoutClick, isFetchingProjects } = props;

  return (
    <>
      <HeaderBar>
        <h1 className="dashboard__title">Dashboard</h1>
        <div className="dashboard-buttons">
          <Link to={WEB_ROUTES.PROFILE}>
            <Button appendClass="dashboard-buttons__profile" icon="user">
              Profile
            </Button>
          </Link>
          <Button variant="alt" icon="sign-out-alt" onClick={onLogoutClick}>
            Logout
          </Button>
        </div>
      </HeaderBar>
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="card card--flow-column dashboard__card">
            <div className="dashboard__header">
              <h1>Your projects:</h1>
              <Button onClick={onCreateClick} icon="plus">
                Create new project
              </Button>
            </div>
            <div className="dashboard__projects">
              {isFetchingProjects && <Loader showSpinner />}
              {!isFetchingProjects && projects && (
                <>
                  {projects.length === 0 && (
                    <span className="dashboard__empty-text">
                      You are not collaborating in any project as of this time.
                      Join an existing one by invitation, or create your own!
                    </span>
                  )}
                  {projects.length > 0 &&
                    projects.map((x) => (
                      <ProjectCard key={x.id} projectInfo={x} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
