import React from "react";
import { INotification } from "models/INotification";
import Loader from "components/loader/loader";
import { resolveNotificationType } from "models/INotificationType";
import { formatDistanceToNow } from "date-fns";

interface Props {
  notifications?: INotification[];
  isFetchingNotifications: boolean;
}

const resolveNotificationName = (type: number): string => {
  switch (resolveNotificationType(type)) {
    case "assigneeChange":
      return "New assignment";
    case "assignmentUpdate":
      return "Assignment updated";
    case "newComment":
      return "New comment";
  }
};

const NotificationPage: React.FunctionComponent<Props> = (props: Props) => {
  const { notifications, isFetchingNotifications } = props;

  return (
    <>
      <div className="card card--flow-column">
        <h1>Notifications</h1>
        <span>Here you can review your notifications:</span>
      </div>
      {isFetchingNotifications && <Loader showSpinner />}
      {!isFetchingNotifications &&
        notifications &&
        notifications.length > 0 &&
        notifications.map((x) => (
          <div key={x.id} className="card card--flow-column">
            <h1>
              {resolveNotificationName(x.type)}
              {!x.isRead ? "*" : ""}
            </h1>
            <span>{!x.isRead ? <b>{x.content}</b> : <>{x.content}</>}</span>
            <br />
            <span className="assignment-page__info-label">
              Received {formatDistanceToNow(Date.parse(`${x.createdOn}Z`))}
              {" ago"}
            </span>
          </div>
        ))}
    </>
  );
};

export default NotificationPage;
