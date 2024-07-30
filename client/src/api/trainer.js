import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Programs API
export const getProgramsApi = async (page, limit, token) => {
  return axios.get(`${API_URL}/api/programs?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllProgramsApi = async (token) => {
  return axios.get(`${API_URL}/api/programs/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createProgramApi = async (program, token) => {
  return axios.post(`${API_URL}/api/programs`, program, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProgramApi = async (id, program, token) => {
  return axios.put(`${API_URL}/api/programs/${id}`, program, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProgramApi = async (id, token) => {
  return axios.delete(`${API_URL}/api/programs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Daily Programs API
export const getDailyProgramsApi = async (page, limit, token) => {
  return axios.get(
    `${API_URL}/api/daily-programs?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllDailyProgramsApi = async (token) => {
  return axios.get(`${API_URL}/api/daily-programs/all-daily-programs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createDailyProgramApi = async (dailyProgram, token) => {
  return axios.post(`${API_URL}/api/daily-programs`, dailyProgram, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDailyProgramApi = async (id, dailyProgram, token) => {
  return axios.put(`${API_URL}/api/daily-programs/${id}`, dailyProgram, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDailyProgramApi = async (id, token) => {
  return axios.delete(`${API_URL}/api/daily-programs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Exercises API
export const getExercisesApi = async (page, limit, token) => {
  return axios.get(`${API_URL}/api/exercises?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllExercisesApi = async (token) => {
  return axios.get(`${API_URL}/api/exercises/all-exercises`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createExerciseApi = async (exercise, token) => {
  return axios.post(`${API_URL}/api/exercises`, exercise, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateExerciseApi = async (id, exercise, token) => {
  return axios.put(`${API_URL}/api/exercises/${id}`, exercise, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteExerciseApi = async (id, token) => {
  return axios.delete(`${API_URL}/api/exercises/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
