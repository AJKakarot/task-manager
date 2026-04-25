import toast from "react-hot-toast";

const codeToMessageMap = {
  USER_ALREADY_EXISTS: "This email is already registered.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  VALIDATION_ERROR: "Please check the highlighted fields.",
  AUTH_TOKEN_MISSING: "Please log in to continue.",
  AUTH_TOKEN_INVALID: "Your session has expired. Please log in again.",
  AUTH_USER_NOT_FOUND: "Account not found. Please log in again.",
  TASK_NOT_FOUND: "Task not found or already deleted.",
  INVALID_TASK_ID: "Invalid task selected."
};

const getFriendlyErrorMessage = (error) => {
  if (error?.code && codeToMessageMap[error.code]) {
    return codeToMessageMap[error.code];
  }

  return error?.message || "Something went wrong. Please try again.";
};

const showApiErrorToast = (error) => {
  const message = getFriendlyErrorMessage(error);
  toast.error(message);
  return message;
};

export { getFriendlyErrorMessage, showApiErrorToast };
