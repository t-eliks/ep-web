import React from "react";
import { connect } from "react-redux";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import { closeModal, openModal } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";
import DeleteModal from "./deleteModal";

export interface DeleteModalParams {
  onConfirm: () => any;
  elementName?: string;
}

interface Props {
  params: DeleteModalParams;
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  openModal: (modal: ApplicationModals) => any;
}

const DeleteModalContainer: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, params } = props;

  const handleConfirm = async () => {
    if (params) {
      const { onConfirm } = params;

      onConfirm();
    }
  };

  return (
    <DeleteModal
      elementName={params && params.elementName}
      isOpen={isOpen}
      onConfirm={handleConfirm}
    />
  );
};

export default connect(
  (state: AppState) => ({
    isOpen: state.modal.deleteModalIsOpen,
    params: state.modal.params,
  }),
  (dispatch) => bindActionCreators({ closeModal, openModal }, dispatch)
)(DeleteModalContainer);
