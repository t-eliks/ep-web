import { IBacklogEpicInfo } from "./IBacklogEpicInfo";

export interface IBacklogInfo {
  epics?: IBacklogEpicInfo[];
  earliestDeadline?: Date;
  earliestDeadlineAssignmentId?: number;
}
