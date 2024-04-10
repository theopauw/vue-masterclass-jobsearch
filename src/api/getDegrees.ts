import axios from "axios";
import type { Degree } from "@/api/types";

const getDegrees = async () => {
  const baseURL = import.meta.env.VITE_APP_API_URL;
  const url = `${baseURL}/degrees`;
  const response = await axios.get<Degree[]>(url);
  return response.data;
};

export default getDegrees;
