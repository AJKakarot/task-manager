import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";
import env from "../config/env.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Authorization token is required");
    error.statusCode = 401;
    error.code = "AUTH_TOKEN_MISSING";
    throw error;
  }

  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, env.jwtSecret);
  } catch {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    error.code = "AUTH_TOKEN_INVALID";
    throw error;
  }

  const user = await User.findById(decodedToken.userId).select("-password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    error.code = "AUTH_USER_NOT_FOUND";
    throw error;
  }

  req.user = user;
  next();
});

export { protect };
