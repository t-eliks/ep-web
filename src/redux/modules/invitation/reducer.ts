import {
  InvitationState,
  SET_INVITATION_LINK,
  SET_PENDING_INVITATIONS,
  SET_PENDING_INVITATION_INFO,
  SET_INVITEE_EMAIL,
  SET_FETCHING_PENDING_INVITATIONS,
  SET_FETCHING_INVITATION_INFO,
  CLEAR_INVITEE_EMAIL,
} from "./types";
import { IPendingInvitation } from "models/IPendingInvitation";

const initialState: InvitationState = {
  invitationLink: undefined,
  pendingInvitations: undefined,
  invitationInfo: undefined,
  isFetchingPendingInvitations: false,
  isFetchingInvitationInfo: false,
  inviteeEmail: undefined,
};

export const invitation = (
  state = initialState,
  action: any
): InvitationState => {
  const { type, payload } = action;

  switch (type) {
    case SET_INVITATION_LINK:
      return {
        ...state,
        invitationLink: payload as string,
      };
    case SET_PENDING_INVITATIONS:
      return {
        ...state,
        pendingInvitations: payload as IPendingInvitation[],
      };
    case SET_PENDING_INVITATION_INFO:
      return {
        ...state,
        invitationInfo: payload as IPendingInvitation,
      };
    case SET_INVITEE_EMAIL:
      return {
        ...state,
        inviteeEmail: payload as string,
      };
    case CLEAR_INVITEE_EMAIL:
      return {
        ...state,
        inviteeEmail: undefined,
      };
    case SET_FETCHING_PENDING_INVITATIONS:
      return {
        ...state,
        isFetchingPendingInvitations: payload as boolean,
      };
    case SET_FETCHING_INVITATION_INFO:
      return {
        ...state,
        isFetchingInvitationInfo: payload as boolean,
      };
    default:
      return state;
  }
};
