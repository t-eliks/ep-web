import { SnackbarState, OPEN_SNACKBAR, CLOSE_SNACKBAR } from "./types";

const init: SnackbarState = {
  isOpen: false,
  message: undefined
};

export const snackbar = (state = init, action: any): SnackbarState => {
  const { type, payload } = action;

  switch (type) {
    case OPEN_SNACKBAR:
      return {
        isOpen: true,
        message: payload
      };
    case CLOSE_SNACKBAR:
      return {
        isOpen: false,
        message: undefined
      };
    default:
      return state;
  }
};
