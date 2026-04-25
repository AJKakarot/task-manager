import { validationResult } from "express-validator";
import { sendError } from "../utils/apiResponse.js";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return sendError(res, {
    statusCode: 400,
    message: "Validation failed",
    code: "VALIDATION_ERROR",
    errors: errors.array().map((error) => ({
      field: error.path,
      message: error.msg
    }))
  });
};

export default validateRequest;
