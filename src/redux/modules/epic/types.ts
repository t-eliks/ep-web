import { IBacklogInfo } from "models/IBacklogInfo";

export interface EpicState {
  backlogInfo?: IBacklogInfo;
  isFetchingBacklog: boolean;
}

export const SET_FETCHING_BACKLOG = "@@project/SET_FETCHING_BACKLOG";
export const SET_BACKLOG_INFO = "@@project/SET_BACKLOG_INFO";
