import React from "react";
import "./discussion.scss";
import { IDiscussionMessage } from "models/IDiscussionMessage";
import DiscussionMessage from "components/discussion/discussionMessage";
import DiscussionInput from "components/discussion/discussionInput";
import Loader from "components/loader/loader";

interface Props {
  messages?: IDiscussionMessage[];
  onSubmit: (content: string) => void;
  isFetchingMessages: boolean;
  onDelete: (messageId: string) => () => void;
}

const DiscussionPage: React.FunctionComponent<Props> = (props: Props) => {
  const { messages, onSubmit, isFetchingMessages, onDelete } = props;

  return (
    <div className="card card--flow-column">
      <h1>Discussion</h1>
      <div className="discussion-container">
        <div className="discussion-container__messages">
          <div className="discussion-container__messages__inner">
            {isFetchingMessages && <Loader showSpinner />}
            {!isFetchingMessages &&
              messages &&
              messages.map((x) => (
                <DiscussionMessage onDelete={onDelete} key={x.id} info={x} />
              ))}
          </div>
        </div>
        <DiscussionInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default DiscussionPage;
