import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import env from "../config/env.js";

const generateToken = (userId) =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id.toString());

  res.status(201).json({
    success: true,
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
    throw error;
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({
    success: true,
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
