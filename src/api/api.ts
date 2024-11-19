import axios from 'axios';

const API_URL = 'http://localhost:3002';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Token süresi dolmuş veya geçersiz
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/api/auth/login', { email, password }),
  register: (email: string, password: string) => 
    api.post('/api/auth/register', { email, password }),
  changePassword: (oldPassword: string, newPassword: string) => 
    api.post('/api/auth/change-password', { oldPassword, newPassword }),
};

export const todoAPI = {
  getAll: () => api.get('/api/todos'),
  create: (todo: any) => api.post('/api/todos', todo),
  update: (id: string, todo: any) => api.put(`/api/todos/${id}`, todo),
  delete: (id: string) => api.delete(`/api/todos/${id}`),
  toggleComplete: (id: string) => api.put(`/api/todos/${id}/toggle-complete`),
};

export { api };
