import React from "react";
import { connect } from "react-redux";
import DiscussionPage from "./discussionPage";
import { IDiscussionMessage } from "models/IDiscussionMessage";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import {
  getDiscussionMessages,
  createDiscussionMessage,
  getDiscussionMessage,
  deleteDiscussionMessage,
  filterDiscussionMessage,
} from "redux/modules/discussion/actions";
import { discussionHubConnection } from "core/api";
import { openModalWithParams } from "redux/modules/modal/actions";
import { ApplicationModals } from "redux/modules/modal/types";
import { DeleteModalParams } from "features/modals/deleteModalContainer";

interface Props {
  getDiscussionMessages: (projectId: number) => void;
  createDiscussionMessage: (projectId: number, content: string) => void;
  getDiscussionMessage: (projectId: number, messageId: string) => void;
  deleteDiscussionMessage: (messageId: string) => void;
  filterDiscussionMessage: (messageId: string) => void;
  openModalWithParams: (
    modal: ApplicationModals,
    params: DeleteModalParams
  ) => void;
  messages?: IDiscussionMessage[];
  isFetchingMessages: boolean;
  projectId?: number;
}

interface State {
  hubInitialised: boolean;
  rerenderInterval?: NodeJS.Timeout;
}

class DiscussionContainer extends React.Component<Props, State> {
  state: State = {
    hubInitialised: false,
    rerenderInterval: undefined,
  };

  componentDidMount() {
    const { projectId, getDiscussionMessages } = this.props;

    if (projectId) {
      getDiscussionMessages(projectId);
    }

    this.setUpHub();

    this.setState({
      rerenderInterval: setInterval(() => {
        this.forceUpdate();
      }, 60000),
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { projectId: newProjectId } = this.props;
    const { projectId: oldProjectId } = prevProps;

    if (newProjectId !== oldProjectId && newProjectId) {
      const { getDiscussionMessages } = this.props;

      getDiscussionMessages(newProjectId);
    }

    this.setUpHub();
  }

  setUpHub = () => {
    if (!this.state.hubInitialised) {
      discussionHubConnection.on(
        "NewDiscussionMessage",
        (messageId: string) => {
          const { projectId, getDiscussionMessage } = this.props;

          if (projectId) {
            getDiscussionMessage(projectId, messageId);
          }
        }
      );

      discussionHubConnection.on("MessageRemoved", (messageId: string) => {
        const { filterDiscussionMessage } = this.props;

        filterDiscussionMessage(messageId);
      });

      this.setState({
        hubInitialised: true,
      });
    }
  };

  async componentWillUnmount() {
    discussionHubConnection.off("NewDiscussionMessage");
    discussionHubConnection.off("MessageRemoved");

    if (this.state.rerenderInterval) {
      clearInterval(this.state.rerenderInterval);
    }

    this.setState({
      hubInitialised: false,
      rerenderInterval: undefined,
    });
  }

  handleSubmit = (content: string) => {
    const { projectId, createDiscussionMessage } = this.props;

    if (projectId) {
      createDiscussionMessage(projectId, content);
    }
  };

  delete = (messageId: string) => () => {
    const { deleteDiscussionMessage } = this.props;

    deleteDiscussionMessage(messageId);
  };

  handleDeleteClick = (messageId: string) => () => {
    const { openModalWithParams } = this.props;

    openModalWithParams("delete", {
      onConfirm: this.delete(messageId),
      elementName: "this message",
    });
  };

  render() {
    const { messages, isFetchingMessages } = this.props;

    return (
      <DiscussionPage
        isFetchingMessages={isFetchingMessages}
        onSubmit={this.handleSubmit}
        messages={messages}
        onDelete={this.handleDeleteClick}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    messages: state.discussion.messages,
    projectId: state.project.projectDetails?.id,
    isFetchingMessages: state.discussion.isFetchingMessages,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getDiscussionMessages,
        getDiscussionMessage,
        createDiscussionMessage,
        deleteDiscussionMessage,
        openModalWithParams,
        filterDiscussionMessage,
      },
      dispatch
    )
)(DiscussionContainer);
