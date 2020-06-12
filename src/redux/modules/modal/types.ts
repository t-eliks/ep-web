import { NewEpicModalParams } from "features/backlog/newEpic/newEpicModalContainer";
import { NewAssignmentModalParams } from "features/backlog/newAssignment/newAssignmentModalContainer";
import { DeleteModalParams } from "features/modals/deleteModalContainer";
import { NewProjectModalParams } from "features/dashboard/newProject/newProjectModalContainer";

export interface ModalState {
  registerModalIsOpen: boolean;
  loginModalIsOpen: boolean;
  newProjectModalIsOpen: boolean;
  newEpicModalIsOpen: boolean;
  newAssignmentModalIsOpen: boolean;
  deleteModalIsOpen: boolean;
  params?: any;
}

export const MODAL_OPEN = "@@modal/MODAL_OPEN";
export const MODAL_CLOSE = "@@modal/MODAL_CLOSE";
export const MODAL_OPEN_WITH_PARAMS = "@@modal/MODAL_OPEN_WITH_PARAMS";

export type ApplicationModals =
  | "login"
  | "register"
  | "newProject"
  | "newEpic"
  | "newAssignment"
  | "delete";

export type ModalParams =
  | NewEpicModalParams
  | NewAssignmentModalParams
  | DeleteModalParams
  | NewProjectModalParams;
