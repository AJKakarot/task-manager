import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import env from "../config/env.js";
import { sendSuccess } from "../utils/apiResponse.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    error.code = "USER_ALREADY_EXISTS";
    throw error;
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id.toString());

  return sendSuccess(res, {
    statusCode: 201,
    message: "Signup successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    }
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const token = generateToken(user._id.toString());

  return sendSuccess(res, {
    statusCode: 200,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    }
  });
});

export { login, signup };
