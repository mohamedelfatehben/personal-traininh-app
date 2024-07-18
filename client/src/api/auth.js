import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const signUpApi = async (formData) => {
  return axios.post(`${API_URL}/api/auth/register`, formData);
};

export const loginApi = async (formData) => {
  return axios.post(`${API_URL}/api/auth/login`, formData);
};

export const getUserApi = async (token) => {
  return axios.get(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserApi = async (token, formData) => {
  return axios.put(`${API_URL}/api/users/me`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
