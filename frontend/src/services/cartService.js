import axios from 'axios'

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL}/cart`

export const getCartItems = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true })
    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error getting cart data')
  }
}

export const addToCart = async (newItem) => {
  try {
    const response = await axios.post(API_URL, newItem, { withCredentials: true })
    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error add new cart')
  }
}

export const updateCartItem = async (item_id, quantity) => {
  try {
    const response = await axios.put(
      `${API_URL}/${item_id}`,
      { quantity },
      { withCredentials: true }
    )
    return response
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error update new quantity')
  }
}

export const deleteCartItem = async (item_id) => {
  try {
    await axios.delete(`${API_URL}/${item_id}`, { withCredentials: true })
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error delete cart item')
  }
}

export const clearCart = async () => {
  try {
    await axios.delete(API_URL, { withCredentials: true })
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error clear cart')
  }
}

export default {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart
}
