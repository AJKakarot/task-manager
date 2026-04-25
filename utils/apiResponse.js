const sendSuccess = (res, { statusCode = 200, message = "Success", data = null, meta } = {}) => {
  const payload = {
    success: true,
    message
  };

  if (data !== null) {
    payload.data = data;
  }

  if (meta) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

const sendError = (
  res,
  {
    statusCode = 500,
    message = "Internal Server Error",
    code = "INTERNAL_SERVER_ERROR",
    errors,
    stack
  } = {}
) => {
  const payload = {
    success: false,
    message,
    error: {
      code,
      ...(errors ? { details: errors } : {})
    }
  };

  if (stack) {
    payload.error.stack = stack;
  }

  return res.status(statusCode).json(payload);
};

export { sendError, sendSuccess };
