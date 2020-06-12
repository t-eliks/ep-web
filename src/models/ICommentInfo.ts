export interface ICommentInfo {
  id: string;
  authorName: string;
  content: string;
  createdOn: string;
  authorId: number;
  isAssignee: boolean;
  assignmentId: number;
  isAuthor: boolean;
}
