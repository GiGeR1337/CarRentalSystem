import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Matches your backend port
    headers: { 'Content-Type': 'application/json' }
});

// Automatically add the Token to every request if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;