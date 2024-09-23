import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllTraineesApi = async (
  page = 1,
  limit = 10,
  token,
  search = "",
  filterStatus = "",
  filterNextPaymentStatus = "",
  filterPlan = "",
  gender = "male"
) => {
  console.log(gender);
  return axios.get(`${API_URL}/api/users/trainees`, {
    params: {
      page,
      limit,
      search,
      filterStatus,
      filterNextPaymentStatus,
      filterPlan,
      gender,
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

export const submitFormImagesApi = async (images, token) => {
  return axios.put(`${API_URL}/api/users/form-images`, images, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
