import { NewEditEpicForm } from "features/backlog/newEpic/newEpicModal";
import { AppState } from "index";
import api, { API_ENDPOINTS, ApiResponse } from "core/api";
import { GetRoute, CombineRoutes } from "core/web";
import { AxiosResponse } from "axios";
import { openSnackbar, openSnackbarGenericError } from "../snackbar/actions";
import { closeModal } from "../modal/actions";
import { SET_FETCHING_BACKLOG, SET_BACKLOG_INFO } from "./types";
import { IBacklogInfo } from "models/IBacklogInfo";

export function createEpic(values: NewEditEpicForm, projectId: string): any {
  return async (dispatch: any, getState: () => AppState) => {
    await api()
      .post(GetRoute(API_ENDPOINTS.NEW_EPIC), {
        name: values.name,
        description: values.description,
        projectId: projectId,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          const projectId = getState().project.projectDetails?.id;

          if (projectId) {
            dispatch(getBacklogInfo(String(projectId)));
          }

          dispatch(closeModal("newEpic"));
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

export function updateEpic(values: NewEditEpicForm): any {
  return async (dispatch: any, getState: () => AppState) => {
    await api()
      .put(CombineRoutes(true, API_ENDPOINTS.UPDATE_EPIC, values.id || "0"), {
        name: values.name,
        description: values.description,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          const projectId = getState().project.projectDetails?.id;

          if (projectId) {
            dispatch(getBacklogInfo(String(projectId)));
          }

          dispatch(closeModal("newEpic"));
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

export function deleteEpic(epicId: string): any {
  return async (dispatch: any, getState: () => AppState) => {
    await api()
      .delete(CombineRoutes(true, API_ENDPOINTS.DELETE_EPIC, epicId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          const projectId = getState().project.projectDetails?.id;

          if (projectId) {
            dispatch(getBacklogInfo(String(projectId)));
          }

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

export function getBacklogInfo(projectId: string): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_BACKLOG,
      payload: true,
    });

    await api()
      .get(CombineRoutes(false, API_ENDPOINTS.BACKLOG, projectId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data, message } = response.data;

        if (success) {
          dispatch({ type: SET_BACKLOG_INFO, payload: data as IBacklogInfo });
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_BACKLOG,
      payload: false,
    });

    return false;
  };
}
