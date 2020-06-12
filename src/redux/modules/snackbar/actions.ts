import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from "./types";
import { RESOURCES } from "localization/resources";

export function openSnackbar(content: string, isError?: boolean): any {
  return {
    type: OPEN_SNACKBAR,
    payload: { content, isError }
  };
}

export function closeSnackbar(): any {
  return {
    type: CLOSE_SNACKBAR
  };
}

export function openSnackbarGenericError(): any {
  return {
    type: OPEN_SNACKBAR,
    payload: { content: RESOURCES.ERRORS.GENERIC_ERROR, isError: true }
  };
}
