import React from "react";
import "./resources/iconLibrary";
import ApplicationModals from "features/applicationModals";
import Snackbar from "components/snackbar/snackbar";
import AppRoutes from "components/routes/appRoutes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { tryAuthenticate } from "redux/modules/user/actions";
import { AppState } from "index";
import Loader from "components/loader/loader";
import "./scss/_base.scss";

Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

interface Props {
  tryAuthenticate: () => any;
  isAuthenticating: boolean;
}

class App extends React.Component<Props> {
  componentDidMount() {
    const { tryAuthenticate } = this.props;

    tryAuthenticate();
  }

  render() {
    const { isAuthenticating } = this.props;

    if (isAuthenticating) {
      return (
        <div className="app-loader">
          <Loader />
        </div>
      );
    }

    return (
      <>
        <AppRoutes />
        <ApplicationModals />
        <Snackbar />
      </>
    );
  }
}

export default connect(
  (state: AppState) => ({
    isAuthenticating: state.user.isAuthenticating,
  }),
  (dispatch) => bindActionCreators({ tryAuthenticate }, dispatch)
)(App);
