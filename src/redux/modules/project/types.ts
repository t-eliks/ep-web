import { IProjectDetails } from "models/IProjectDetails";
import { IDashboardProjectInfo } from "models/IDashboardInfo";

export interface ProjectState {
  projectDetails?: IProjectDetails;
  isFetchingDetails: boolean;
  projects?: IDashboardProjectInfo[];
  isFetchingProjects: boolean;
}

export const SET_FETCHING_DETAILS = "@@project/SET_FETCHING_DETAILS";
export const SET_PROJECT_DETAILS = "@@project/SET_PROJECT_DETAILS";

export const SET_DASHBOARD_INFO = "@@dashboard/SET_DASHBOARD_INFO";
export const SET_FETCHING_PROJECTS = "@@dashboard/SET_FETCHING_PROJECTS";
