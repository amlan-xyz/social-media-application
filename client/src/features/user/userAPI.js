import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";

const api = `${BASE_URL}/users`;

export const fetchUsers = async () => {
  const response = await axios.get(api);
  console.log(response);
  return response;
};
