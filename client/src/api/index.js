import axios from 'axios';

// import { showToast } from '../utils';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/api/v1`;
console.log(URL);

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ URL });

// Set the authorization token in the headers
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

// Auth API endpoints
export const authAPI = {
    // Register a new user
    register: (userData) => API.post('/auth/register', userData),
    // Login a user
    login: (email, password) => API.post('/auth/login', { email, password }),
    // Logout a user
    logout: () => API.get('/auth/logout'),
    // Get the current user
    getCurrentUser: () => API.get('/auth/me'),
};