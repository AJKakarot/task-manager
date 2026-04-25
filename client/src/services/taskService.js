import apiClient from "./apiClient.js";

const getTasks = async () => {
  const { data } = await apiClient.get("/tasks");
  return data.data;
};

const createTask = async (payload) => {
  const { data } = await apiClient.post("/tasks", payload);
  return data.data;
};

const updateTask = async (taskId, payload) => {
  const { data } = await apiClient.patch(`/tasks/${taskId}`, payload);
  return data.data;
};

const deleteTask = async (taskId) => {
  await apiClient.delete(`/tasks/${taskId}`);
};

export { createTask, deleteTask, getTasks, updateTask };
