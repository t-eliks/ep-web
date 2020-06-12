import { IDiscussionMessage } from "models/IDiscussionMessage";
import { INotification } from "models/INotification";
import { ICommentInfo } from "models/ICommentInfo";

export interface DiscussionState {
  messages?: IDiscussionMessage[];
  notifications?: INotification[];
  isFetchingMessages: boolean;
  comments?: ICommentInfo[];
  isFetchingComments: boolean;
  isFetchingNotifications: boolean;
}

export const SET_FETCHING_MESSAGES = "@@discussion/SET_FETCHING_MESSAGES";
export const SET_DISCUSSION_MESSAGES = "@@discussion/SET_DISCUSSION_MESSAGES";
export const SET_DISCUSSION_MESSAGE = "@@discussion/SET_DISCUSSION_MESSAGE";
export const REMOVE_DISCUSSION_MESSAGE =
  "@@discussion/REMOVE_DISCUSSION_MESSAGE";
export const SET_FETCHING_NOTIFICATIONS =
  "@@discussion/SET_FETCHING_NOTIFICATIONS";
export const SET_NOTIFICATIONS = "@@discussion/SET_NOTIFICATIONS";
export const SET_COMMENTS = "@@assignment/SET_COMMENTS";
export const SET_FETCHING_COMMENTS = "@@assignment/SET_FETCHING_COMMENTS";
export const POST_COMMENT = "@@assignment/POST_COMMENT";
