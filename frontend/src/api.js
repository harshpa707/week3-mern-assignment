import axios from 'axios'; // Import Axios for HTTP requests.

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' }); // Set the API base URL.
api.interceptors.request.use((config) => { // Run before each request is sent.
  const token = localStorage.getItem('token'); // Read token saved after login.
  if (token) config.headers.Authorization = `Bearer ${token}`; // Attach token to protected API requests.
  return config; // Continue request with updated headers.
});
export default api; // Share the configured Axios client across components.
