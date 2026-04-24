import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }
};

export const patientAPI = {
  getTests: async (email) => {
    const response = await api.get(`/patients/${email}/tests`);
    return response.data;
  },
  addTest: async (email, testData) => {
    const response = await api.post(`/patients/${email}/tests`, testData);
    return response.data;
  }
};

export default api;
