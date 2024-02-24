import axios from "axios";

const getJobs = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  const url = `${baseURL}/jobs`;
  const response = await axios.get(url);
  return response.data;
};

export default getJobs;
