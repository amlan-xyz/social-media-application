import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const BACKEND_URL = `${BASE_URL}/posts`;

export const fetchPosts = async () => {
  const response = await axios.get(BACKEND_URL);
  return response;
};

export const createPost = async (postData) => {
  const response = await axios.post(
    BACKEND_URL,
    {
      caption: postData.caption,
      file: postData.image,
    },
    {
      headers: {
        authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};

export const editPost = async (postId, postData) => {
  const response = await axios.put(`${BACKEND_URL}/${postId}`, postData, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

export const likePost = async (postId) => {
  const response = await fetch(`${BACKEND_URL}/${postId}/like`, {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export const unlikePost = async (postId) => {
  const response = await fetch(`${BACKEND_URL}/${postId}/unlike`, {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`${BACKEND_URL}/${postId}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

export const addComment = async (postId, commentData) => {
  const response = await axios.post(
    `${BACKEND_URL}/${postId}/comments/add`,
    commentData,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

export const removeComment = async (postId, commentId) => {
  const response = await axios.post(
    `${BACKEND_URL}/${postId}/comments/${commentId}/remove`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};
