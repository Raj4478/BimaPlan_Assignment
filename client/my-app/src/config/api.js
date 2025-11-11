
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8000/api'
  },
  production: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-backend-deployment-url.vercel.app/api'
  }
};

const currentEnv = import.meta.env.MODE || 'development';
export const API_BASE_URL = API_CONFIG[currentEnv].baseURL;


export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

export default API_CONFIG;