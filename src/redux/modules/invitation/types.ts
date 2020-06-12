import { IPendingInvitation } from "models/IPendingInvitation";

export interface InvitationState {
  invitationLink?: string;
  pendingInvitations?: IPendingInvitation[];
  invitationInfo?: IPendingInvitation;
  inviteeEmail?: string;
  isFetchingPendingInvitations: boolean;
  isFetchingInvitationInfo: boolean;
}

export const SET_INVITATION_LINK = "@@collaborator/SET_INVITATION_LINK";
export const SET_FETCHING_PENDING_INVITATIONS =
  "@@collaborator/SET_FETCHING_PENDING_INVITATIONS";
export const SET_PENDING_INVITATIONS = "@@collaborator/SET_PENDING_INVITATIONS";
export const SET_FETCHING_INVITATION_INFO =
  "@@collaborator/SET_FETCHING_INVITATION_INFO";
export const SET_PENDING_INVITATION_INFO =
  "@@collaborator/SET_PENDING_INVITATION_INFO";
export const SET_INVITEE_EMAIL = "@@collaborator/SET_INVITEE_EMAIL";
export const CLEAR_INVITEE_EMAIL = "@@collaborator/CLEAR_INVITEE_EMAIL";
