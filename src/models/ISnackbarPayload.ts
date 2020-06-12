export interface ISnackbarPayload {
  content: React.ElementType<HTMLSpanElement> | string | undefined;
  isError?: boolean;
}
