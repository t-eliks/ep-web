import axios from "axios";
import { AUTHORIZATION } from "./constants";
import * as SignalR from "@microsoft/signalr";

const api = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

export function setAuthorizationHeader(token: string) {
  axios.defaults.headers.common[AUTHORIZATION] = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common[AUTHORIZATION];
}

export const discussionHubConnection = new SignalR.HubConnectionBuilder()
  .withUrl(process.env.REACT_APP_API_HUB_URL || "", {
    skipNegotiation: true,
    transport: SignalR.HttpTransportType.WebSockets,
  })
  .build();

export default api;

export const API_ENDPOINTS = {
  AUTHENTICATION: "user",
  REGISTRATION: "user/register",
  NEW_PROJECT: "project",
  DASHBOARD: "user/dashboard",
  NEW_EPIC: "epic",
  BACKLOG: "epic/backlog",
  ASSIGNMENT: "assignment",
  COLLABORATORS: "invitation/collaborators",
  PROJECT_DETAILS: "project/details",
  BOARD: "assignment/board",
  UPDATE_ASSIGNMENT_STATUS: "assignment/update-status",
  INVITATION: "invitation",
  PENDING_INVITATIONS: "invitation/pending-invitations",
  PENDING_INVITATION_INFO: "invitation",
  ACCEPT_INVITATION: "invitation/accept",
  COMMENTS: "discussion/comments",
  POST_COMMENT: "discussion/comments",
  CANCEL_INVITATION: "invitation/cancel",
  DISCUSSION_MESSAGES: "discussion",
  CREATE_DISCUSSION_MESSAGE: "discussion",
  UPDATE_ASSIGNMENT: "assignment",
  UPDATE_EPIC: "epic",
  DELETE_EPIC: "epic",
  UPDATE_PROJECT: "project",
  DELETE_PROJECT: "project",
  DELETE_COMMENT: "discussion/comments",
  DELETE_DISCUSSION_MESSAGE: "discussion",
  SAVE_PROFILE_INFO: "user/update-profile",
  NOTIFICATIONS: "discussion/notifications",
  DELETE_PROFILE_INFO: "user/delete-profile",
  DELETE_ASSIGNMENT: "assignment",
};

export const HUB_ENDPOINTS = {
  DISCUSSION: "/hubs/discussion",
};

export interface ApiResponse {
  message: string;
  success: boolean;
  data: any;
}
