// stores/cartStore.js
import { defineStore } from 'pinia'
import cartService from '@/services/cartService';
import { toast } from 'vue3-toastify'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    error: null,
    isLoading: false,
  }),
  getters: {
    totalCartPrice(state) {
      return state.cart.reduce((total, product) => total + product.price * product.quantity, 0)
    }
  },
  actions: {
    async loadCart() {
      this.error = null
      this.isLoading = true
      try {
        const response = await cartService.getCartItems();
        this.cart = response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    },

    async addToCart(newItem) {
      this.error = null
      this.isLoading = true
      try {
        const response = await cartService.addToCart(newItem)
        const existingProduct = this.cart.find(item => item.name === newItem.name)
        if (existingProduct) {
          existingProduct.quantity += newItem.quantity
        } else {
          this.cart.push(response.data)
          toast.success("This product has been added to cart.", {
            autoClose: 5000,
            theme: "colored",
            position: "top-center",
            pauseOnHover: false
          });
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        console.error('Error adding product to cart:', this.error)
      } finally {
        this.isLoading = false
      }
    },

    async updateQuantity(item_id, newQuantity) {
      this.error = null
      this.isLoading = true
      try {
        const product = this.cart.find(item => item._id === item_id)
        if (product) {
          product.quantity = newQuantity
          await cartService.updateCartItem(item_id, newQuantity)
          if (product.quantity <= 0) {
            this.deleteFromCart(item_id)
          }
        } else {
          throw new Error('Product not found')
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    },

    async deleteFromCart(item_id) {
      this.error = null
      this.isLoading = true
      try {
        const product = this.cart.find(item => item._id === item_id)
        if (product) {
          await cartService.deleteCartItem(item_id)
          this.cart = this.cart.filter(item => item._id !== item_id)
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    },

    async clearCart() {
      this.error = null
      this.isLoading = true
      try {
        await cartService.clearCart()
        this.cart = []
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.isLoading = false
      }
    }
  },
})

export default useCartStore;
