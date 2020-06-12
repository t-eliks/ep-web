import React from "react";
import { connect } from "react-redux";
import NotificationPage from "./notificationsPage";
import { INotification } from "models/INotification";
import { AppState } from "index";
import { getNotifications } from "redux/modules/discussion/actions";
import { bindActionCreators } from "redux";

interface Props {
  notifications?: INotification[];
  getNotifications: (projectId: number) => any;
  projectId?: number;
  isFetchingNotifications: boolean;
}

class NotificationsContainer extends React.Component<Props> {
  componentDidMount() {
    const { projectId, getNotifications } = this.props;

    if (projectId) {
      getNotifications(projectId);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { projectId: newProjectId } = this.props;
    const { projectId: prevProjectId } = prevProps;

    if (newProjectId !== prevProjectId) {
      const { getNotifications } = this.props;

      if (newProjectId) {
        getNotifications(newProjectId);
      }
    }
  }

  render() {
    const { notifications, isFetchingNotifications } = this.props;

    return (
      <NotificationPage
        notifications={notifications}
        isFetchingNotifications={isFetchingNotifications}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    notifications: state.discussion.notifications,
    projectId: state.project.projectDetails?.id,
    isFetchingNotifications: state.discussion.isFetchingNotifications,
  }),
  (dispatch) => bindActionCreators({ getNotifications }, dispatch)
)(NotificationsContainer);
