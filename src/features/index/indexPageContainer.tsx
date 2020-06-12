import React from "react";
import { IndexPage } from "./indexPage";
import { openModal } from "redux/modules/modal/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ApplicationModals } from "redux/modules/modal/types";

interface Props {
  openModal: (modal: ApplicationModals) => any;
}

class IndexPageContainer extends React.Component<Props> {
  handleRegisterClick = () => {
    const { openModal } = this.props;

    openModal("register");
  };

  handleLoginClick = () => {
    const { openModal } = this.props;

    openModal("login");
  };

  render() {
    return (
      <IndexPage
        onRegisterClick={this.handleRegisterClick}
        onLoginClick={this.handleLoginClick}
      />
    );
  }
}

export default connect(null, dispatch =>
  bindActionCreators({ openModal }, dispatch)
)(IndexPageContainer);
