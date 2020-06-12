import api, { API_ENDPOINTS, ApiResponse } from "core/api";
import { AxiosResponse } from "axios";
import {
  SET_DISCUSSION_MESSAGES,
  SET_FETCHING_MESSAGES,
  SET_DISCUSSION_MESSAGE,
  REMOVE_DISCUSSION_MESSAGE,
  SET_FETCHING_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  POST_COMMENT,
  SET_FETCHING_COMMENTS,
  SET_COMMENTS,
} from "./types";
import { IDiscussionMessage } from "models/IDiscussionMessage";
import { CombineRoutes } from "core/web";
import { openSnackbarGenericError, openSnackbar } from "../snackbar/actions";
import { AppState } from "index";
import { closeModal } from "../modal/actions";
import { INotification } from "models/INotification";
import { ICommentInfo } from "models/ICommentInfo";

export function getDiscussionMessages(projectId: number): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_MESSAGES,
      payload: true,
    });

    await api()
      .get(
        CombineRoutes(
          false,
          API_ENDPOINTS.DISCUSSION_MESSAGES,
          String(projectId)
        )
      )
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data } = response.data;
        if (success) {
          dispatch({
            type: SET_DISCUSSION_MESSAGES,
            payload: data as IDiscussionMessage[],
          });
        } else {
          dispatch(openSnackbarGenericError());
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_MESSAGES,
      payload: false,
    });

    return false;
  };
}

export function getNotifications(projectId: number): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_NOTIFICATIONS,
      payload: true,
    });

    await api()
      .get(CombineRoutes(true, API_ENDPOINTS.NOTIFICATIONS, String(projectId)))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data } = response.data;
        if (success) {
          dispatch({
            type: SET_NOTIFICATIONS,
            payload: data as INotification[],
          });
        } else {
          dispatch(openSnackbarGenericError());
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_NOTIFICATIONS,
      payload: false,
    });

    return false;
  };
}

export function getDiscussionMessage(
  projectId: number,
  messageId: string
): any {
  return async (dispatch: any) => {
    await api()
      .get(
        CombineRoutes(
          false,
          API_ENDPOINTS.DISCUSSION_MESSAGES,
          String(projectId),
          `?messageId=${messageId}`
        )
      )
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data } = response.data;
        if (success) {
          dispatch({
            type: SET_DISCUSSION_MESSAGE,
            payload: data[0] as IDiscussionMessage,
          });
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

export function createDiscussionMessage(
  projectId: number,
  content: string
): any {
  return async (dispatch: any) => {
    await api()
      .post(CombineRoutes(false, API_ENDPOINTS.CREATE_DISCUSSION_MESSAGE), {
        projectId,
        content,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (!success) {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    return false;
  };
}

export function deleteDiscussionMessage(id: string): any {
  return async (dispatch: any, getState: () => AppState) => {
    await api()
      .delete(CombineRoutes(true, API_ENDPOINTS.DELETE_DISCUSSION_MESSAGE, id))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          const projectId = getState().project.projectDetails?.id;
          if (projectId) {
            dispatch(closeModal("delete"));
          }
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

export function filterDiscussionMessage(id: string): any {
  return async (dispatch: any) => {
    dispatch({
      type: REMOVE_DISCUSSION_MESSAGE,
      payload: id,
    });
  };
}

export function postComment(assignmentId: number, content: string): any {
  return async (dispatch: any) => {
    dispatch({ type: POST_COMMENT });

    await api()
      .post(CombineRoutes(false, API_ENDPOINTS.POST_COMMENT), {
        assignmentId,
        content,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(getComments(assignmentId));
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

export function getComments(assignmentId: number): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_COMMENTS,
      payload: true,
    });

    await api()
      .get(CombineRoutes(false, API_ENDPOINTS.COMMENTS, String(assignmentId)))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, data, message } = response.data;

        if (success) {
          dispatch({
            type: SET_COMMENTS,
            payload: data as ICommentInfo[],
          });
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_COMMENTS,
      payload: false,
    });

    return false;
  };
}

export function deleteComment(assignmentId: number, commentId: string): any {
  return async (dispatch: any) => {
    await api()
      .delete(CombineRoutes(true, API_ENDPOINTS.DELETE_COMMENT, commentId))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(closeModal("delete"));
          dispatch(getComments(assignmentId));
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
