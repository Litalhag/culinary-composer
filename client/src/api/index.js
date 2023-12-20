import axios from 'axios';

// import { showToast } from '../utils';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/api/v1`;

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ URL });
// Add a response interceptor that handles errors
API.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            showToast('Network error: Please check your internet connection.', 'error');
            console.error('Network error: Please check your internet connection.');
            return Promise.reject(new Error('Network error: Please check your internet connection.'));
        }

        const { status, data, statusText } = error.response;

        let message = data?.error || statusText || 'An error occurred';

        console.error(`${status} - ${message}`);

        return Promise.reject(error);
    }
);
// Set the authorization token in the headers
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
};

export const registerUser = async (userData) => {
    const res = await axios.post(`${URL}/auth/register`, userData);
    return res;
}
export const loginUser = async (email, password) => {
    const res = await axios.post(`${URL}/auth/login`, { email, password });
    return res;
}
export const logoutUser = async () => {
    const res = await axios.get(`${URL}/auth/logout`);
    return res;
}
export const getCurrentUser = async () => {
    const res = await axios.get(`${URL}/auth/me`);
    return res;
}