export type INotificationType =
  | "assigneeChange"
  | "assignmentUpdate"
  | "newComment";

export function resolveNotificationType(type: number): INotificationType {
  switch (type) {
    case 0:
      return "assigneeChange";
    case 1:
      return "assignmentUpdate";
    case 2:
      return "newComment";
    default:
      return "assigneeChange";
  }
}
