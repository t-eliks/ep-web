import {
  MODAL_CLOSE,
  MODAL_OPEN,
  ApplicationModals,
  MODAL_OPEN_WITH_PARAMS,
  ModalParams
} from "./types";

export function openModal(modal: ApplicationModals): any {
  return {
    type: MODAL_OPEN,
    payload: modal
  };
}

export function openModalWithParams(
  modal: ApplicationModals,
  params: ModalParams
): any {
  return {
    type: MODAL_OPEN_WITH_PARAMS,
    payload: { modal, params }
  };
}

export function closeModal(modal: ApplicationModals): any {
  return {
    type: MODAL_CLOSE,
    payload: modal
  };
}
