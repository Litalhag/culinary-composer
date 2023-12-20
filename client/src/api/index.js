import axios from 'axios';

import { showToast } from '../utils';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/api/v1`;

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

export const registerUser = async (userData) => {
    const res = await axios.get(`${URL}/auth/register`);
    return res.data.data;
}
export const loginUser = async (email, password) => {
    const res = await axios.get(`${URL}/auth/login`);
    return res.data.data;
}
export const logoutUser = async (email, password) => {
    const res = await axios.get(`${URL}/auth/logout`);
    return res.data.data;
}
export const getCurrentUser = async () => {
    const res = await axios.get(`${URL}/auth/me`);
    return res.data.data;
}