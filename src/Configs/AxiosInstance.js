import axios from 'axios';

const instance = axios.create();

instance.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
});

export default instance;
