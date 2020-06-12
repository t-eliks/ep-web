import { ICollaboratorOverview } from "models/ICollaboratorOverview";
import { IAssignmentViewModel } from "models/IAssignmentViewModel";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";

export interface AssignmentState {
  collaborators?: ICollaboratorOverview[];
  isFetchingAssignees: boolean;
  assignmentInfo?: IAssignmentViewModel;
  isFetchingAssignment: boolean;
  boardAssignments?: IBoardAssignmentInfo[];
  isFetchingBoard: boolean;
}

export const SET_IS_FETCHING_COLLABORATORS =
  "@@assignment/SET_IS_FETCHING_COLLABORATORS";

export const SET_COLLABORATORS = "@@assignment/SET_COLLABORATORS";
export const UPDATE_ASSIGNMENT_STATUS = "@@assignment/UPDATE_ASSIGNMENT_STATUS";
export const SET_FETCHING_ASSIGNMENT = "@@assignment/SET_FETCHING_ASSIGNMENT";
export const SET_ASSIGNMENT = "@@assignment/SET_ASSIGNMENT";
export const SET_FETCHING_BOARD = "@@assignment/SET_FETCHING_BOARD";
export const SET_BOARD_INFO = "@@assignment/SET_BOARD_INFO";
export const SET_ASSIGNMENT_STATUS = "@@assignment/SET_ASSIGNMENT_STATUS";
export const DELETE_ASSIGNMENT = "@@assignment/DELETE_ASSIGNMENT";
