import { sendError } from "../utils/apiResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || "INTERNAL_SERVER_ERROR";

  return sendError(res, {
    statusCode,
    message,
    code,
    errors: err.details,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export default errorHandler;
