import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/_/backend/api';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getContests = () => api.get('/contests');
export const getProblems = () => api.get('/problems');
export const createSubmission = (payload, token) =>
  api.post('/submissions', payload, { headers: { Authorization: `Bearer ${token}` } });
export default api;
