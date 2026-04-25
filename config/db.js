import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  await mongoose.connect(env.mongodbUri);
  console.log("Connected to MongoDB");
};

export default connectDB;
