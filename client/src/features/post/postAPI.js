import axios from "axios";
import { BASE_URL } from "../../helper";

const api = `${BASE_URL}/posts`;

export const fetchPosts = async () => {
  const response = await axios.get(api);
  return response;
};