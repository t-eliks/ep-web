export interface IPendingInvitation {
  id: number;
  email: string;
  invitedByFirstName: string;
  invitedByLastName: string;
  createdOn: string;
  projectName: string;
  accountExists: boolean;
}
