import { IApplicationUser } from "models/IApplicationUser";

export interface UserState {
  user?: IApplicationUser;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isFetchingProfile: boolean;
}

export const SET_APPLICATION_USER = "@@user/SET_APPLICATION_USER";
export const SET_IS_REGISTERING = "@@user/SET_IS_REGISTERING";
export const SET_IS_AUTHENTICATING = "@@user/SET_IS_AUTHENTICATING";
export const LOG_OUT = "@@user/LOG_OUT";
export const SET_IS_FETCHING_PROFILE = "@@user/SET_IS_FETCHING_PROFILE";
