import { ISnackbarPayload } from "models/ISnackbarPayload";

export const OPEN_SNACKBAR = "@@snackbar/OPEN_SNACKBAR";
export const CLOSE_SNACKBAR = "@@snackbar/CLOSE_SNACKBAR";

export interface SnackbarState {
  isOpen: boolean;
  message: ISnackbarPayload | undefined;
}
