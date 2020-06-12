import { IAssignmentStatus } from "./IAssignmentStatus";
import { ICommentInfo } from "./ICommentInfo";

export interface IAssignmentViewModel {
  id: string;
  name: string;
  description: string;
  status: IAssignmentStatus;
  deadline?: string;
  assigneeId?: string;
  createdOn: string;
  comments: ICommentInfo;
  authorFirstName: string;
  authorLastName: string;
  modifiedOn?: string;
  lastModifiedFirstName?: string;
  lastModifiedLastName?: string;
}
