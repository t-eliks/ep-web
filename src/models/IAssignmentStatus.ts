export type IAssignmentStatus = 0 | 1 | 2;

export type AssignmentStatusMapping = "todo" | "inProgress" | "complete";

export function GetAssignmentStatus(
  status: AssignmentStatusMapping
): IAssignmentStatus {
  switch (status) {
    case "complete":
      return 2;
    case "inProgress":
      return 1;
    case "todo":
      return 0;
  }
}
