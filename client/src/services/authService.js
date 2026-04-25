import apiClient from "./apiClient.js";

const login = async (payload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data.data;
};

const signup = async (payload) => {
  const { data } = await apiClient.post("/auth/signup", payload);
  return data.data;
};

export { login, signup };
