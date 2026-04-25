import { sendSuccess } from "../utils/apiResponse.js";

const getHealth = (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: "API is healthy"
  });
};

export { getHealth };
