import { IAssignmentInfo } from "./IAssignmentInfo";

export interface IBacklogEpicInfo {
  id: string;
  name: string;
  description: string;
  assignments: IAssignmentInfo[];
}
