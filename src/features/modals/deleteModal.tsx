import React from "react";
import { closeModal } from "redux/modules/modal/actions";
import Modal from "components/modals/modal";
import Button from "components/buttons/button";
import { ApplicationModals } from "redux/modules/modal/types";
import { IBacklogEpicInfo } from "models/IBacklogEpicInfo";
import { connect } from "react-redux";
import "./deleteModal.scss";

interface Props {
  epic?: IBacklogEpicInfo;
  isOpen: boolean;
  closeModal: (modal: ApplicationModals) => any;
  onConfirm: () => void;
  elementName?: string;
}

const DeleteModal: React.FunctionComponent<Props> = (props: Props) => {
  const { isOpen, closeModal, onConfirm, elementName } = props;

  const handleClose = () => {
    closeModal("delete");
  };

  return (
    <Modal
      minWidthPx={600}
      maxWidthPx={900}
      isOpen={isOpen}
      onRequestClose={handleClose}
    >
      <h1>Confirm delete</h1>
      <div className="delete-modal__message">
        <span>
          Are you sure you want to delete
          <b>{`${elementName ? ` ${elementName}` : ""}`}</b>
        </span>
        ?
      </div>
      <div className="delete-modal__buttons">
        <Button onClick={handleClose} variant="alt">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="delete">
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default connect(null, { closeModal })(DeleteModal);
