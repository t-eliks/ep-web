import { IAssignmentInfo } from "./IAssignmentInfo";
import { IProjectDetailsMember } from "./IProjectDetailsMember";

export interface IProjectDetails {
  id: number;
  isCreator: boolean;
  name: string;
  description: string;
  completedAssignments: number;
  leftToDo: number;
  latestAssignments: IAssignmentInfo[];
  memberAssignmentInfo: IProjectDetailsMember[];
  hasUnreadNotifications: boolean;
}
