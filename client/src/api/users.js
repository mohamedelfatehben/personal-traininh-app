import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllTraineesApi = async (
  page = 1,
  limit = 10,
  token,
  search = "",
  filterStatus = "",
  filterNextPaymentStatus = "",
  filterPlan = ""
) => {
  return axios.get(`${API_URL}/api/users/trainees`, {
    params: {
      page,
      limit,
      search,
      filterStatus,
      filterNextPaymentStatus,
      filterPlan,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const assignProgramApi = async (data, token) => {
  return axios.post(`${API_URL}/api/users/assign-program`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
