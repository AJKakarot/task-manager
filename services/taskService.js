import mongoose from "mongoose";
import Task from "../models/Task.js";

const assertValidTaskId = (taskId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error("Invalid task id");
    error.statusCode = 400;
    throw error;
  }
};

const createTaskForUser = async (userId, payload) => {
  return Task.create({
    title: payload.title,
    description: payload.description ?? "",
    status: payload.status ?? "pending",
    user: userId
  });
};

const getTasksForUser = async (userId) => {
  return Task.find({ user: userId }).sort({ createdAt: -1 });
};

const updateTaskForUser = async (taskId, userId, payload) => {
  assertValidTaskId(taskId);

  const task = await Task.findOneAndUpdate({ _id: taskId, user: userId }, payload, {
    new: true,
    runValidators: true
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const deleteTaskForUser = async (taskId, userId) => {
  assertValidTaskId(taskId);

  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
};

export { createTaskForUser, deleteTaskForUser, getTasksForUser, updateTaskForUser };
