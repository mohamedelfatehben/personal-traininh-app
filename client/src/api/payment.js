import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createPaymentApi = async (formData) => {
  return axios.post(`${API_URL}/api/payments`, formData, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserPaymentsApi = async () => {
  return axios.get(`${API_URL}/api/payments`, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  });
};
