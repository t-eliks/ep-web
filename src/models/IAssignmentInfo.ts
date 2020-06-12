import { IAssignmentStatus } from "./IAssignmentStatus";

export interface IAssignmentInfo {
  id: number;
  name: string;
  status: IAssignmentStatus;
  deadline?: string;
  assigneeFirstName: string;
  assigneeLastName: string;
  createdOn: Date;
}
