import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getPlansApi = async () => {
  return axios.get(`${API_URL}/api/plans`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
};
