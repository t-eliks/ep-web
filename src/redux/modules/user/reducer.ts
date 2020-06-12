import { IApplicationUser } from "models/IApplicationUser";
import {
  SET_APPLICATION_USER,
  UserState,
  SET_IS_AUTHENTICATING,
  LOG_OUT,
  SET_IS_FETCHING_PROFILE,
} from "./types";

const initialState: UserState = {
  user: undefined,
  isAuthenticated: false,
  isAuthenticating: true,
  isFetchingProfile: false,
};

export const user = (state = initialState, action: any): UserState => {
  const { type, payload } = action;

  switch (type) {
    case SET_APPLICATION_USER:
      return {
        ...state,
        user: payload as IApplicationUser,
        isAuthenticated: payload ? true : false,
      };
    case SET_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: payload as boolean,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case SET_IS_FETCHING_PROFILE:
      return {
        ...state,
        isFetchingProfile: payload as boolean,
      };
    default:
      return state;
  }
};
