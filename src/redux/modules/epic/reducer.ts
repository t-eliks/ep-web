import { EpicState, SET_BACKLOG_INFO, SET_FETCHING_BACKLOG } from "./types";
import { IBacklogInfo } from "models/IBacklogInfo";

const initialState: EpicState = {
  isFetchingBacklog: false,
  backlogInfo: undefined,
};

export const epic = (state = initialState, action: any): EpicState => {
  const { type, payload } = action;
  switch (type) {
    case SET_BACKLOG_INFO:
      return {
        ...state,
        backlogInfo: payload as IBacklogInfo,
      };

    case SET_FETCHING_BACKLOG:
      return {
        ...state,
        isFetchingBacklog: payload as boolean,
      };
    default:
      return state;
  }
};
