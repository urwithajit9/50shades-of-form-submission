import axios from "axios";

export const fetchRepos = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/registeruser/");
  return response.data;
};
