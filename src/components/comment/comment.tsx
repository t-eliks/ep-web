import React from "react";
import { ICommentInfo } from "models/ICommentInfo";
import "./comment.scss";
import { formatDistanceToNow } from "date-fns";
import { EditorState, Editor, convertFromRaw } from "draft-js";
import PopupMenu from "components/menus/popupMenu";
import Popup from "components/popups/popup";
import PopupMenuItem from "components/menus/popupMenuItem";
import Button from "components/buttons/button";

interface Props {
  info: ICommentInfo;
  onDelete: (commentId: string) => () => void;
}

const renderComment = (
  info: ICommentInfo,
  onDelete: (commentId: string) => () => void
) => {
  const { id, content, authorName, createdOn, isAssignee, isAuthor } = info;

  return (
    <div className="comment">
      <div className="comment__header">
        <span className="comment-title">
          {authorName} {`${isAssignee ? " | ASSIGNEE" : ""}`}
        </span>
        <span className="comment-date">
          {formatDistanceToNow(Date.parse(`${createdOn}Z`))} ago
        </span>
        {isAuthor && (
          <div className="comment-button">
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
      <div className="comment-content">
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

const Comment: React.FunctionComponent<Props> = (props: Props) => {
  const { info, onDelete } = props;

  return renderComment(info, onDelete);
};

export default Comment;
