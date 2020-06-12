import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Snackbar as ReactSnackbar } from "@material/react-snackbar";
import { ISnackbarPayload } from "models/ISnackbarPayload";
import { closeSnackbar } from "redux/modules/snackbar/actions";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import "./snackbar.scss";

interface Props {
  isOpen: boolean;
  message: ISnackbarPayload | undefined;
  closeSnackbar: () => any;
}

class Snackbar extends React.Component<Props> {
  handleClose = (): void => {
    const { closeSnackbar } = this.props;

    closeSnackbar();
  };

  renderContent(payload: ISnackbarPayload) {
    if (payload.isError) {
      return (
        <>
          <FontAwesomeIcon className="snackbar__icon" icon="times-circle" />
          {payload.content}
        </>
      );
    } else
      return (
        <>
          <FontAwesomeIcon className="snackbar__icon" icon="check-circle" />
          {payload.content}
        </>
      );
  }

  render() {
    const { isOpen, message } = this.props;
    if (message) {
      const { isError } = message;

      return (
        <ReactSnackbar
          open={isOpen}
          className={`snackbar ${
            isError ? "snackbar--error" : "snackbar--success"
          }`}
          // @ts-ignore
          message={this.renderContent(message)}
          onClose={this.handleClose}
        />
      );
    } else return null;
  }
}

export default connect(
  (state: AppState) => ({
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message
  }),
  dispatch => bindActionCreators({ closeSnackbar }, dispatch)
)(Snackbar);
