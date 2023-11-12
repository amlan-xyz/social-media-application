import axios from "axios";
import { BASE_URL } from "../../helper";

const api = `${BASE_URL}/users`;

export const createUser = async (userData) => {
  const response = await axios.post(`${api}/signup`, userData);
  console.log(response);
  return response;
};

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${api}/login`, { username, password });
  localStorage.setItem("token", response.data.token);
  return response;
};
