import React from "react";
import CommentSection from "./commentSection";
import { connect } from "react-redux";
import { ICommentInfo } from "models/ICommentInfo";
import { AppState } from "index";
import { bindActionCreators } from "redux";
import {
  getComments,
  postComment,
  deleteComment,
} from "redux/modules/discussion/actions";
import { openModalWithParams } from "redux/modules/modal/actions";
import Loader from "components/loader/loader";
import { ApplicationModals } from "redux/modules/modal/types";
import { DeleteModalParams } from "features/modals/deleteModalContainer";

interface Props {
  assignmentId: number;
  getComments: (assignmentId: number) => void;
  postComment: (assignmentId: number, content: string) => void;
  deleteComment: (assignmentId: number, content: string) => void;
  openModalWithParams: (
    modal: ApplicationModals,
    params: DeleteModalParams
  ) => void;
  comments?: ICommentInfo[];
  isFetchingComments: boolean;
}

class CommentSectionContainer extends React.Component<Props> {
  componentDidMount() {
    const { assignmentId } = this.props;

    if (assignmentId) {
      this.fetchComments(assignmentId);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { assignmentId: oldAssignmentId } = prevProps;
    const { assignmentId: newAssignmentId } = this.props;

    if (oldAssignmentId !== newAssignmentId) {
      this.fetchComments(newAssignmentId);
    }
  }

  fetchComments = (assignmentId: number) => {
    const { getComments } = this.props;

    getComments(assignmentId);
  };

  postComment = (content: string) => {
    const { postComment, assignmentId } = this.props;

    postComment(assignmentId, content);
  };

  deleteComment = (commentId: string) => () => {
    const { assignmentId, deleteComment } = this.props;

    deleteComment(assignmentId, commentId);
  };

  handleDeleteClick = (commentId: string) => () => {
    const { openModalWithParams } = this.props;

    openModalWithParams("delete", {
      onConfirm: this.deleteComment(commentId),
    });
  };

  render() {
    const { comments, isFetchingComments } = this.props;

    if (isFetchingComments) {
      return <Loader showSpinner />;
    }

    return (
      <CommentSection
        onSubmit={this.postComment}
        onDelete={this.handleDeleteClick}
        comments={comments}
      />
    );
  }
}

export default connect(
  (state: AppState) => ({
    comments: state.discussion.comments,
    isFetchingComments: state.discussion.isFetchingComments,
  }),
  (dispatch) =>
    bindActionCreators(
      { getComments, postComment, deleteComment, openModalWithParams },
      dispatch
    )
)(CommentSectionContainer);
