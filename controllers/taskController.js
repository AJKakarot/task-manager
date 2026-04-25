import asyncHandler from "../middleware/asyncHandler.js";
import {
  createTaskForUser,
  deleteTaskForUser,
  getTasksForUser,
  updateTaskForUser
} from "../services/taskService.js";
import { sendSuccess } from "../utils/apiResponse.js";

const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskForUser(req.user._id, req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Task created successfully",
    data: task
  });
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await getTasksForUser(req.user._id);
  return sendSuccess(res, {
    statusCode: 200,
    message: "Tasks fetched successfully",
    data: tasks
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await updateTaskForUser(req.params.id, req.user._id, req.body);

  return sendSuccess(res, {
    statusCode: 200,
    message: "Task updated successfully",
    data: task
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  await deleteTaskForUser(req.params.id, req.user._id);

  return sendSuccess(res, {
    statusCode: 200,
    message: "Task deleted successfully"
  });
});

export { createTask, deleteTask, getTasks, updateTask };
