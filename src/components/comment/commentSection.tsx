import React from "react";
import { ICommentInfo } from "models/ICommentInfo";
import Comment from "./comment";
import CommentInput from "./commentInput";
import "./commentSection.scss";

interface Props {
  comments?: ICommentInfo[];
  onSubmit: (content: string) => void;
  onDelete: (commentId: string) => () => void;
}

const CommentSection: React.FunctionComponent<Props> = (props: Props) => {
  const { comments, onSubmit, onDelete } = props;
  return (
    <>
      <CommentInput onSubmit={onSubmit} />
      <div className="comments">
        {comments &&
          comments.length > 0 &&
          comments.map((x) => (
            <Comment onDelete={onDelete} key={x.id} info={x} />
          ))}
        {(!comments || comments.length > 0) && null}
      </div>
    </>
  );
};

export default CommentSection;
