const extractErrorMessage = (error) =>
  error instanceof Error ? error.message : String(error);

export default extractErrorMessage;
