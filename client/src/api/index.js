import axios from 'axios'

// import { showToast } from '../utils';

const baseURL = import.meta.env.VITE_BASE_URL

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ baseURL })

// Add a response interceptor that handles errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      showToast(
        'Network error: Please check your internet connection.',
        'error'
      )
      console.error('Network error: Please check your internet connection.')
      return Promise.reject(
        new Error('Network error: Please check your internet connection.')
      )
    }

    const { status, data, statusText } = error.response

    let message = data?.error || statusText || 'An error occurred'

    console.error(`${status} - ${message}`)

    return Promise.reject(error)
  }
)

// Set the authorization token in the headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

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
}

// Recipe API endpoints
export const recipeAPI = {
  // Get all shoes
  getAllRecipe: () => API.get('/recipes'),
  // Get a specific shoe
  getRecipe: (recipeId) => API.get(`/recipes/${recipeId}`),
  // Add a shoe
  addRecipe: (recipe) => API.post('/recipes/create', recipe),
}
