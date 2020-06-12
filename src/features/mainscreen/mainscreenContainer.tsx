import React from "react";
import MainscreenPage from "./mainscreenPage";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getProjectDetails } from "redux/modules/project/actions";
import { discussionHubConnection } from "core/api";
import { HubConnectionState } from "@microsoft/signalr";

interface MatchProps {
  id?: string;
}

interface Props extends RouteComponentProps<MatchProps> {
  getProjectDetails: (projectId: string) => any;
}

class MainscreenContainer extends React.Component<Props> {
  async componentDidMount() {
    const { getProjectDetails, match } = this.props;
    const { params } = match;
    const { id } = params;

    if (id) {
      await getProjectDetails(id);

      discussionHubConnection.start().then(() => {
        discussionHubConnection.send("JoinGroup", id);
      });
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { id: oldId } = prevProps.match.params;
    const { id: newId } = this.props.match.params;

    if (newId && oldId !== newId) {
      const { getProjectDetails } = this.props;

      await getProjectDetails(newId);

      discussionHubConnection.start().then(() => {
        discussionHubConnection.send("JoinGroup", newId);
      });
    }
  }

  async componentWillUnmount() {
    const { id } = this.props.match.params;
    if (id && discussionHubConnection.state === HubConnectionState.Connected) {
      await discussionHubConnection.send("LeaveGroup", id);
    }

    await discussionHubConnection.stop();
  }

  render() {
    return <MainscreenPage routerProps={this.props} />;
  }
}

export default connect(null, (dispatch) =>
  bindActionCreators({ getProjectDetails }, dispatch)
)(MainscreenContainer);
