export interface IDashboardInfo {
  projectDtos: IDashboardProjectInfo[];
}

export interface IDashboardProjectInfo {
  id: number;
  name: string;
  description: string;
  collaboratorCount: number;
  assignmentCount: number;
  isCreator: boolean;
  completedCount: number;
  createdOn: string;
}
