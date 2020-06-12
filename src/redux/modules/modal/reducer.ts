import {
  ModalState,
  ApplicationModals,
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_OPEN_WITH_PARAMS,
} from "./types";

const initialState: ModalState = {
  registerModalIsOpen: false,
  loginModalIsOpen: false,
  newProjectModalIsOpen: false,
  newEpicModalIsOpen: false,
  newAssignmentModalIsOpen: false,
  deleteModalIsOpen: false,
  params: undefined,
};

const resolveModal = (modal: ApplicationModals) => {
  switch (modal) {
    case "newProject":
      return "newProjectModalIsOpen";
    case "login":
      return "loginModalIsOpen";
    case "register":
      return "registerModalIsOpen";
    case "newEpic":
      return "newEpicModalIsOpen";
    case "newAssignment":
      return "newAssignmentModalIsOpen";
    case "delete":
      return "deleteModalIsOpen";
  }
};

export const modal = (state = initialState, action: any): ModalState => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_OPEN:
      return {
        ...state,
        [resolveModal(payload as ApplicationModals)]: true,
        params: null,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        [resolveModal(payload as ApplicationModals)]: false,
      };
    case MODAL_OPEN_WITH_PARAMS:
      const { modal, params } = payload;
      return {
        ...state,
        [resolveModal(modal as ApplicationModals)]: true,
        params: params,
      };
    default:
      return state;
  }
};
