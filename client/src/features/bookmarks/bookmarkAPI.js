import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const api = `${BASE_URL}/users/bookmarks`;

export const fetchBookmarks = async () => {
  const response = await axios.get(`${api}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  return response;
};

export const addBookmark = async (postId) => {
  const response = await axios.post(
    `${api}/${postId}/add`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};

export const removeBookmark = async (postId) => {
  const response = await axios.post(
    `${api}/${postId}/remove`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
  return response;
};
