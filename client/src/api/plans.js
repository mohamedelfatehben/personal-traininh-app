import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Plan API
export const getPlansApi = async (token) => {
  return axios.get(`${API_URL}/api/plans`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPlanApi = async (plan, token) => {
  return axios.post(`${API_URL}/api/plans`, plan, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePlanApi = async (id, plan, token) => {
  return axios.put(`${API_URL}/api/plans/${id}`, plan, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePlanApi = async (id, token) => {
  return axios.delete(`${API_URL}/api/plans/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
