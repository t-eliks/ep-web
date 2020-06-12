import {
  ProjectState,
  SET_PROJECT_DETAILS,
  SET_FETCHING_DETAILS,
  SET_DASHBOARD_INFO,
  SET_FETCHING_PROJECTS,
} from "./types";
import { IProjectDetails } from "models/IProjectDetails";
import { IDashboardInfo } from "models/IDashboardInfo";

const initialState: ProjectState = {
  projectDetails: undefined,
  isFetchingDetails: false,
  projects: undefined,
  isFetchingProjects: false,
};

export const project = (state = initialState, action: any): ProjectState => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROJECT_DETAILS:
      return {
        ...state,
        projectDetails: payload as IProjectDetails,
      };
    case SET_FETCHING_DETAILS:
      return {
        ...state,
        isFetchingDetails: payload as boolean,
      };
    case SET_DASHBOARD_INFO:
      return {
        ...state,
        projects: (payload as IDashboardInfo).projectDtos,
      };
    case SET_FETCHING_PROJECTS:
      return {
        ...state,
        isFetchingProjects: payload as boolean,
      };
    default:
      return state;
  }
};
