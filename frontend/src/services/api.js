import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getContests = () => api.get('/contests');
export const getProblems = () => api.get('/problems');
export const createSubmission = (payload, token) =>
  api.post('/submissions', payload, { headers: { Authorization: `Bearer ${token}` } });
export default api;
