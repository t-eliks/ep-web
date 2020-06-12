import React from "react";
import { IDiscussionMessage } from "models/IDiscussionMessage";
import { formatDistanceToNow } from "date-fns";
import { EditorState, convertFromRaw, Editor } from "draft-js";
import "./discussionMessage.scss";
import Popup from "components/popups/popup";
import Button from "components/buttons/button";
import PopupMenu from "components/menus/popupMenu";
import PopupMenuItem from "components/menus/popupMenuItem";

interface Props {
  info?: IDiscussionMessage;
  onDelete: (messageId: string) => () => void;
}

const DiscussionMessage: React.FunctionComponent<Props> = (props: Props) => {
  const { info, onDelete } = props;

  if (!info) {
    return null;
  }

  const { id, authorName, createdOn, content, isAuthor } = info;

  return (
    <div className="discussion-message">
      <div className="discussion-message__header">
        <span className="discussion-message-title">{authorName}</span>
        <span className="discussion-message-date">
          {formatDistanceToNow(Date.parse(`${createdOn}Z`))} ago
        </span>
        {isAuthor && (
          <div className="discussion-button">
            <Popup
              renderOwner={() => <Button icon="ellipsis-v" variant="icon" />}
            >
              <PopupMenu>
                <PopupMenuItem
                  icon="trash"
                  header="Delete"
                  onClick={onDelete(id)}
                />
              </PopupMenu>
            </Popup>
          </div>
        )}
      </div>
      <div className="discussion-message-content">
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(content))
          )}
          readOnly
          //@ts-ignore
          onChange={undefined}
        />
      </div>
    </div>
  );
};

export default DiscussionMessage;
