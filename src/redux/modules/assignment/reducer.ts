import {
  AssignmentState,
  SET_IS_FETCHING_COLLABORATORS,
  SET_COLLABORATORS,
  SET_ASSIGNMENT,
  SET_FETCHING_ASSIGNMENT,
  SET_BOARD_INFO,
  SET_FETCHING_BOARD,
  DELETE_ASSIGNMENT,
} from "./types";
import { ICollaboratorOverview } from "models/ICollaboratorOverview";
import { IAssignmentViewModel } from "models/IAssignmentViewModel";
import { IBoardAssignmentInfo } from "models/IBoardAssignmentInfo";

const initialState: AssignmentState = {
  collaborators: undefined,
  isFetchingAssignees: false,
  isFetchingAssignment: false,
  boardAssignments: undefined,
  isFetchingBoard: false,
};

export const assignment = (
  state = initialState,
  action: any
): AssignmentState => {
  const { type, payload } = action;

  switch (type) {
    case SET_IS_FETCHING_COLLABORATORS:
      return {
        ...state,
        isFetchingAssignees: payload as boolean,
      };
    case SET_COLLABORATORS:
      return {
        ...state,
        collaborators: payload as ICollaboratorOverview[],
      };
    case SET_ASSIGNMENT:
      return {
        ...state,
        assignmentInfo: payload as IAssignmentViewModel,
      };
    case SET_FETCHING_ASSIGNMENT:
      return {
        ...state,
        isFetchingAssignment: payload as boolean,
      };
    case SET_BOARD_INFO:
      return {
        ...state,
        boardAssignments: payload as IBoardAssignmentInfo[],
      };
    case SET_FETCHING_BOARD:
      return {
        ...state,
        isFetchingBoard: payload as boolean,
      };
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        assignmentInfo: undefined,
      };
    default:
      return state;
  }
};
