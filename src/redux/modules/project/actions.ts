import { NewEditProjectForm } from "features/dashboard/newProject/newProjectModal";
import api, { API_ENDPOINTS, ApiResponse } from "core/api";
import {
  openSnackbar,
  openSnackbarGenericError,
} from "redux/modules/snackbar/actions";
import { closeModal } from "redux/modules/modal/actions";
import { CombineRoutes, GetRoute } from "core/web";
import { AxiosResponse } from "axios";
import {
  SET_PROJECT_DETAILS,
  SET_FETCHING_DETAILS,
  SET_FETCHING_PROJECTS,
  SET_DASHBOARD_INFO,
} from "./types";
import { IProjectDetails } from "models/IProjectDetails";
import { AppState } from "index";
import { IDashboardInfo } from "models/IDashboardInfo";

export function createProject(values: NewEditProjectForm): any {
  return async (dispatch: any) => {
    await api()
      .post(GetRoute(API_ENDPOINTS.NEW_PROJECT), {
        name: values.name,
        description: values.description,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          dispatch(getDashboardInfo());

          dispatch(closeModal("newProject"));
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    return false;
  };
}

export function getProjectDetails(projectId: string): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_DETAILS,
      payload: true,
    });

    await api()
      .get(CombineRoutes(false, API_ENDPOINTS.PROJECT_DETAILS, projectId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data, message } = response.data;

        if (success) {
          dispatch({
            type: SET_PROJECT_DETAILS,
            payload: data as IProjectDetails,
          });
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_DETAILS,
      payload: false,
    });

    return false;
  };
}

export function updateProject(values: NewEditProjectForm): any {
  return async (dispatch: any, getState: () => AppState) => {
    await api()
      .put(
        CombineRoutes(
          true,
          API_ENDPOINTS.UPDATE_PROJECT,
          String(values.id) || "-1"
        ),
        {
          name: values.name,
          description: values.description,
        }
      )
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          const projectId = getState().project.projectDetails?.id;

          if (projectId) {
            dispatch(getProjectDetails(String(projectId)));
          }

          dispatch(closeModal("newProject"));
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    return false;
  };
}

export function deleteProject(projectId: string): any {
  return async (dispatch: any) => {
    await api()
      .delete(CombineRoutes(true, API_ENDPOINTS.DELETE_PROJECT, projectId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          dispatch(closeModal("delete"));
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    return false;
  };
}

export function getDashboardInfo(): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_PROJECTS,
      payload: true,
    });

    await api()
      .get(GetRoute(API_ENDPOINTS.DASHBOARD))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data } = response.data;
        if (success) {
          dispatch({
            type: SET_DASHBOARD_INFO,
            payload: data as IDashboardInfo,
          });
        } else {
          dispatch(openSnackbarGenericError());
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_PROJECTS,
      payload: false,
    });

    return false;
  };
}
