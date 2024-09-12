const extractErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

export default extractErrorMessage;
