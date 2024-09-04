import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password }, {withCredentials: true})
    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed')
  }
}

export const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { username, password },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };
  

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`)
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/currentUser`)
    return response.data?.user
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve current user')
  }
}

export default {
  register,
  login,
  logout,
  getCurrentUser
}
