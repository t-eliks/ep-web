import api, {
  API_ENDPOINTS,
  ApiResponse,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "core/api";
import { AxiosResponse, AxiosError } from "axios";
import { AUTH_TOKEN } from "core/constants";
import {
  SET_APPLICATION_USER,
  SET_IS_REGISTERING,
  SET_IS_AUTHENTICATING,
  LOG_OUT,
  SET_IS_FETCHING_PROFILE,
} from "./types";
import { openSnackbar, openSnackbarGenericError } from "../snackbar/actions";
import { RegistrationForm } from "features/register/registerModal";
import { closeModal, openModal } from "../modal/actions";
import { LoginForm } from "features/login/loginModal";
import { RESOURCES } from "localization/resources";
import history from "core/history";
import { WEB_ROUTES, GetRoute } from "core/web";
import { ProfileForm } from "features/profile/profilePage";
import { CLEAR_INVITEE_EMAIL } from "../invitation/types";

export function register(values: RegistrationForm): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_IS_REGISTERING,
      payload: true,
    });

    await api()
      .post(GetRoute(API_ENDPOINTS.REGISTRATION), {
        email: values.email,
        firstname: values.firstName,
        lastname: values.lastName,
        password: values.password,
        isInvitation: values.isInvitation,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(openSnackbar(message));

          dispatch({
            type: CLEAR_INVITEE_EMAIL,
          });

          dispatch(closeModal("register"));
          dispatch(openModal("login"));
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_IS_REGISTERING,
      payload: false,
    });

    return false;
  };
}

export function login(values: LoginForm, redirect = true): any {
  return async (dispatch: any) => {
    await api()
      .post(GetRoute(API_ENDPOINTS.AUTHENTICATION), {
        email: values.email,
        password: values.password,
      })
      .then((response: AxiosResponse<ApiResponse>) => {
        const { data, success, message } = response.data;

        if (success) {
          const token = data.token;

          localStorage.setItem(AUTH_TOKEN, token);
          setAuthorizationHeader(token);

          dispatch({
            type: CLEAR_INVITEE_EMAIL,
          });

          dispatch({
            type: SET_APPLICATION_USER,
            payload: data,
          });

          dispatch(openSnackbar(message));
          dispatch(closeModal("login"));

          if (redirect) {
            history.push(WEB_ROUTES.DASHBOARD);
          }
        } else {
          dispatch(openSnackbar(message, true));
        }
        return true;
      })
      .catch((err: AxiosError) => {
        const { response } = err;

        if (response && response.data.message) {
          dispatch(openSnackbar(response.data.message, true));
        } else dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_IS_REGISTERING,
      payload: false,
    });
  };
}

export function tryAuthenticate(): any {
  return async (dispatch: any) => {
    let authenticated = false;
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      setAuthorizationHeader(token);

      dispatch({
        type: SET_IS_AUTHENTICATING,
        payload: true,
      });

      await api()
        .get(GetRoute(API_ENDPOINTS.AUTHENTICATION))
        .then((response: AxiosResponse<ApiResponse>) => {
          const { data, success, message } = response.data;

          if (success) {
            dispatch({
              type: SET_APPLICATION_USER,
              payload: data,
            });

            authenticated = true;

            // history.push(WEB_ROUTES.DASHBOARD);
          } else {
            dispatch(openSnackbar(message, true));
          }
        })
        .catch(() => {
          dispatch(openSnackbarGenericError());
        });
    }

    if (!authenticated) {
      localStorage.removeItem(AUTH_TOKEN);
      removeAuthorizationHeader();
    }

    dispatch({
      type: SET_IS_AUTHENTICATING,
      payload: false,
    });

    return false;
  };
}

export function logout(): any {
  return async (dispatch: any) => {
    dispatch({ type: LOG_OUT });
    localStorage.removeItem(AUTH_TOKEN);
    removeAuthorizationHeader();
    dispatch({
      type: CLEAR_INVITEE_EMAIL,
    });
    dispatch(openSnackbar(RESOURCES.AUTHENTICATION.LOG_OUT));
    history.push(WEB_ROUTES.INDEX);

    return true;
  };
}

export function getUserInfo(): any {
  return async (dispatch: any) => {
    dispatch({
      type: SET_IS_FETCHING_PROFILE,
      payload: true,
    });

    await api()
      .get(GetRoute(API_ENDPOINTS.AUTHENTICATION))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { data, success, message } = response.data;

        if (success) {
          dispatch({
            type: SET_APPLICATION_USER,
            payload: data,
          });
        } else {
          dispatch(openSnackbar(message, true));
        }
      })
      .catch(() => {
        dispatch(openSnackbarGenericError());
      });

    dispatch({
      type: SET_IS_FETCHING_PROFILE,
      payload: false,
    });

    return false;
  };
}

export function saveUserInfo(values: ProfileForm): any {
  return async (dispatch: any) => {
    await api()
      .put(GetRoute(API_ENDPOINTS.SAVE_PROFILE_INFO), values)
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

export function deleteProfile(): any {
  return async (dispatch: any) => {
    await api()
      .delete(GetRoute(API_ENDPOINTS.DELETE_PROFILE_INFO))
      .then((response: AxiosResponse<ApiResponse>) => {
        const { success, message } = response.data;

        if (success) {
          dispatch(closeModal("delete"));
          dispatch(openSnackbar(message));
          localStorage.removeItem(AUTH_TOKEN);
          removeAuthorizationHeader();
          history.push(GetRoute(WEB_ROUTES.INDEX));
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
