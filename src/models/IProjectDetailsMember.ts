import { IAssignmentInfo } from "./IAssignmentInfo";

export interface IProjectDetailsMember {
  index: number;
  firstName: string;
  lastName: string;
  completedAssignments: number;
  assignments: IAssignmentInfo[];
  isCreator: boolean;
}
