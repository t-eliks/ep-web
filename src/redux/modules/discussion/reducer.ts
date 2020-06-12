import {
  DiscussionState,
  SET_FETCHING_MESSAGES,
  SET_DISCUSSION_MESSAGES,
  SET_DISCUSSION_MESSAGE,
  REMOVE_DISCUSSION_MESSAGE,
  SET_FETCHING_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  SET_FETCHING_COMMENTS,
  SET_COMMENTS,
} from "./types";
import { IDiscussionMessage } from "models/IDiscussionMessage";
import { INotification } from "models/INotification";
import { ICommentInfo } from "models/ICommentInfo";

const initState: DiscussionState = {
  messages: undefined,
  comments: undefined,
  isFetchingComments: false,
  isFetchingMessages: false,
  isFetchingNotifications: false,
};

export const discussion = (state = initState, action: any): DiscussionState => {
  const { type, payload } = action;

  switch (type) {
    case SET_FETCHING_MESSAGES:
      return {
        ...state,
        isFetchingMessages: payload as boolean,
      };
    case SET_FETCHING_COMMENTS:
      return {
        ...state,
        isFetchingComments: payload as boolean,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: payload as ICommentInfo[],
      };
    case SET_DISCUSSION_MESSAGES:
      return {
        ...state,
        messages: payload as IDiscussionMessage[],
      };
    case SET_DISCUSSION_MESSAGE:
      return {
        ...state,
        messages: [...(state.messages || []), payload as IDiscussionMessage],
      };
    case REMOVE_DISCUSSION_MESSAGE:
      return {
        ...state,
        messages: state.messages // eslint-disable-next-line
          ? state.messages.filter((x) => x.id != payload)
          : [],
      };
    case SET_FETCHING_NOTIFICATIONS:
      return {
        ...state,
        isFetchingNotifications: payload as boolean,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload as INotification[],
      };
    default:
      return state;
  }
};
