import api, { API_ENDPOINTS, ApiResponse } from "core/api";
import {
  openSnackbarGenericError,
  openSnackbar,
} from "redux/modules/snackbar/actions";
import { AxiosResponse } from "axios";
import { GetRoute, CombineRoutes, WEB_ROUTES } from "core/web";
import {
  SET_INVITATION_LINK,
  SET_PENDING_INVITATIONS,
  SET_PENDING_INVITATION_INFO,
  SET_INVITEE_EMAIL,
  SET_FETCHING_PENDING_INVITATIONS,
  SET_FETCHING_INVITATION_INFO,
} from "./types";
import { IPendingInvitation } from "models/IPendingInvitation";
import history from "core/history";

export function setInviteeEmail(email: string) {
  return (dispatch: any) =>
    dispatch({
      type: SET_INVITEE_EMAIL,
      payload: email,
    });
}

export function getInvitationLink(projectId: number, email: string): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_INVITATION_INFO,
      payload: true,
    });

    const webUrl = process.env.REACT_APP_WEB_URL;

    if (webUrl) {
      await api()
        .post(GetRoute(API_ENDPOINTS.INVITATION), {
          projectId,
          email,
          originEndpoint: CombineRoutes(false, webUrl, WEB_ROUTES.INVITATION),
        })
        .then((response: AxiosResponse<ApiResponse>) => {
          const { success, message, data } = response.data;
          if (success) {
            dispatch({
              type: SET_INVITATION_LINK,
              payload: data as string,
            });
          } else {
            dispatch(openSnackbar(message, true));
          }
        })
        .catch(() => {
          dispatch(openSnackbarGenericError());
        });
    }

    dispatch({
      type: SET_FETCHING_INVITATION_INFO,
      payload: false,
    });

    return false;
  };
}

export function getPendingInvitations(projectId: number): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_FETCHING_PENDING_INVITATIONS,
      payload: true,
    });

    await api()
      .get(
        CombineRoutes(
          true,
          API_ENDPOINTS.PENDING_INVITATIONS,
          String(projectId)
        )
      )
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message, data } = response.data;
        if (success) {
          dispatch({
            type: SET_PENDING_INVITATIONS,
            payload: data as IPendingInvitation[],
          });
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_FETCHING_PENDING_INVITATIONS,
      payload: false,
    });

    return false;
  };
}

export function getPendingInvitationInfo(token: string): any {
  return async (dispatch: any) => {
    await api()
      .get(CombineRoutes(true, API_ENDPOINTS.PENDING_INVITATION_INFO, token))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message, data } = response.data;
        if (success) {
          dispatch({
            type: SET_PENDING_INVITATION_INFO,
            payload: data as IPendingInvitation,
          });
        } else {
          dispatch(openSnackbar(message, true));
          history.push(GetRoute(WEB_ROUTES.DASHBOARD));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    return false;
  };
}

export function acceptInvitation(token: string): any {
  return async (dispatch: any) => {
    const webUrl = process.env.REACT_APP_WEB_URL;

    if (webUrl) {
      await api()
        .post(CombineRoutes(true, API_ENDPOINTS.ACCEPT_INVITATION, token), {
          token,
        })
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
    }

    return false;
  };
}

export function cancelInvitation(invitationId: number): any {
  return async (dispatch: any) => {
    await api()
      .post(
        CombineRoutes(
          true,
          API_ENDPOINTS.CANCEL_INVITATION,
          String(invitationId)
        )
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
