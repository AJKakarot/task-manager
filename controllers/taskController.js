import asyncHandler from "../middleware/asyncHandler.js";
import {
  createTaskForUser,
  deleteTaskForUser,
  getTasksForUser,
  updateTaskForUser
} from "../services/taskService.js";

const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskForUser(req.user._id, req.body);
  res.status(201).json({ success: true, data: task });
});

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await getTasksForUser(req.user._id);
  res.status(200).json({ success: true, data: tasks });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await updateTaskForUser(req.params.id, req.user._id, req.body);

  res.status(200).json({ success: true, data: task });
});

const deleteTask = asyncHandler(async (req, res) => {
  await deleteTaskForUser(req.params.id, req.user._id);

  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

export { createTask, deleteTask, getTasks, updateTask };
