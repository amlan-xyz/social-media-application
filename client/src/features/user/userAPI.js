import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const api = `${BASE_URL}/users`;

export const createUser = async (userData) => {
  const response = await axios.post(`${api}/signup`, userData);
  localStorage.setItem("token", response.data.token);
  return response;
};

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(`${api}/login`, { username, password });
  localStorage.setItem("token", response.data.token);
  return response;
};

export const followUser = async (userId) => {
  const response = await axios.post(
    `${api}/follow/${userId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

export const unfollowUser = async (userId) => {
  const response = await axios.post(
    `${api}/unfollow/${userId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

export const updateProfile = async (updatedData) => {
  const response = await axios.put(
    `${api}/profile/update`,
    {
      updatedData,
    },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

export const fetchUsers = async () => {
  const response = await axios.get(api);
  return response;
};

export const fetchProfile = async () => {
  const response = await axios.get(`${api}/profile`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

export const changeAvatar = async (avatar) => {
  const response = await axios.post(
    `${api}/profile/update/avatar`,
    {
      file: avatar,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};
