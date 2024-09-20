import axios from 'axios'

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/register`,
      { username, email, password },
      { withcredentials: 'include' }
    )
    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed')
  }
}

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/login`,
      { username, password },
      { withcredentials: 'include' }
    )
    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

export const logout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/logout`, {
      withcredentials: 'include'
    })
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/currentUser`, {
      withcredentials: 'include'
    })
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
