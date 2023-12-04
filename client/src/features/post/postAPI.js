import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const api = `${BASE_URL}/posts`;

export const fetchPosts = async () => {
  const response = await axios.get(api);
  return response;
};

export const createPost = async (postData) => {
  const response = await axios.post(
    api,
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
  const response = await axios.put(`${api}/${postId}`, postData, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

export const likePost = async (postId) => {
  const response = await fetch(`${api}/${postId}/like`, {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export const unlikePost = async (postId) => {
  const response = await fetch(`${api}/${postId}/unlike`, {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = await response.json();
  return data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`${api}/${postId}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

export const addComment = async (postId, commentData) => {
  const response = await axios.post(
    `${api}/${postId}/comments/add`,
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
    `${api}/${postId}/comments/${commentId}/remove`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};
