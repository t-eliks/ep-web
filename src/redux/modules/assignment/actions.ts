import api, { API_ENDPOINTS, ApiResponse } from "core/api";
import { AxiosResponse } from "axios";
import {
  SET_COLLABORATORS,
  SET_IS_FETCHING_COLLABORATORS,
  UPDATE_ASSIGNMENT_STATUS,
  SET_ASSIGNMENT,
  SET_FETCHING_ASSIGNMENT,
  SET_FETCHING_BOARD,
  SET_BOARD_INFO,
  DELETE_ASSIGNMENT,
} from "./types";
import { ICollaboratorOverview } from "models/ICollaboratorOverview";
import { openSnackbarGenericError, openSnackbar } from "../snackbar/actions";
import { CombineRoutes, GetRoute } from "core/web";
import { IAssignmentStatus } from "models/IAssignmentStatus";
import { AppState } from "index";
import { NewAssignmentForm } from "features/backlog/newAssignment/newAssignmentModal";
import { closeModal } from "redux/modules/modal/actions";
import { IAssignmentViewModel } from "models/IAssignmentViewModel";
import { UpdateAssignmentForm } from "features/assignment/assignmentPage";
import { isString } from "util";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";
import { getBacklogInfo } from "redux/modules/epic/actions";

export function getCollaboratorOverviewInfo(projectId: string): any {
  return async (dispatch: any) => {
    dispatch({ type: SET_IS_FETCHING_COLLABORATORS, payload: true });

    await api()
      .get(CombineRoutes(false, API_ENDPOINTS.COLLABORATORS, projectId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data } = response.data;

        if (success) {
          dispatch({
            type: SET_COLLABORATORS,
            payload: data.collaborators as ICollaboratorOverview[],
          });
        } else {
          dispatch(openSnackbarGenericError());
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({ type: SET_IS_FETCHING_COLLABORATORS, payload: false });

    return false;
  };
}

export function updateAssignmentStatus(
  assignmentId: string,
  assignmentStatus: IAssignmentStatus,
  assignmentBeforeId?: string
): any {
  return async (dispatch: any, getState: () => AppState) => {
    dispatch({ type: UPDATE_ASSIGNMENT_STATUS });

    await api()
      .post(GetRoute(API_ENDPOINTS.UPDATE_ASSIGNMENT_STATUS), {
        assignmentId: +assignmentId,
        status: assignmentStatus,
        assignmentBeforeId: assignmentBeforeId && +assignmentBeforeId,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success } = response.data;

        if (success) {
          const details = getState().project.projectDetails;
          dispatch(getBoardInfo(details ? String(details.id) : ""));
        } else {
          dispatch(openSnackbarGenericError());
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    return false;
  };
}

export function createAssignment(
  values: NewAssignmentForm,
  epicId: string
): any {
  return async (dispatch: any, getState: () => AppState) => {
    // @ts-ignore
    const assigneeId = values.assigneeId.value;
    await api()
      .post(GetRoute(API_ENDPOINTS.ASSIGNMENT), {
        name: values.name,
        assigneeId: +assigneeId || null,
        description: values.description,
        epicId: String(epicId),
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          const projectId = getState().project.projectDetails?.id;

          if (projectId) {
            dispatch(getBacklogInfo(String(projectId)));
          }

          dispatch(closeModal("newAssignment"));
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

export function getAssignment(assignmentId: string): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_ASSIGNMENT,
      payload: true,
    });

    await api()
      .get(CombineRoutes(false, API_ENDPOINTS.ASSIGNMENT, assignmentId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data, message } = response.data;

        if (success) {
          dispatch({
            type: SET_ASSIGNMENT,
            payload: data as IAssignmentViewModel,
          });
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_ASSIGNMENT,
      payload: false,
    });

    return false;
  };
}

export function updateAssignment(values: UpdateAssignmentForm): any {
  return async (dispatch: any) => {
    let assigneeId = "";

    if (isString(values.assigneeId)) {
      console.log("yay");
      assigneeId = values.assigneeId;
    } else {
      assigneeId = values.assigneeId.value;
    }

    await api()
      .put(
        CombineRoutes(
          true,
          API_ENDPOINTS.UPDATE_ASSIGNMENT,
          values.assignmentId
        ),
        {
          name: values.name,
          assigneeId: +assigneeId,
          deadline: values.deadline,
          description: values.description,
        }
      )
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));
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

export function getBoardInfo(projectId: string): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_BOARD,
      payload: true,
    });

    await api()
      .get(CombineRoutes(false, API_ENDPOINTS.BOARD, projectId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data } = response.data;

        if (success) {
          dispatch({
            type: SET_BOARD_INFO,
            payload: data.assignments as IBoardAssignmentInfo[],
          });
        } else {
          dispatch(openSnackbarGenericError());
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_BOARD,
      payload: false,
    });

    return false;
  };
}

export function deleteAssignment(assignmentId: string): any {
  return async (dispatch: any) => {
    await api()
      .delete(
        CombineRoutes(true, API_ENDPOINTS.DELETE_ASSIGNMENT, assignmentId)
      )
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));
          dispatch({
            type: DELETE_ASSIGNMENT,
          });

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
