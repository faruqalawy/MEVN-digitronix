// stores/cartStore.js
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(sessionStorage.getItem('cart')) || [],
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
        const savedCart = JSON.parse(sessionStorage.getItem('cart'))
        if (savedCart) {
          this.cart = savedCart
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    async addToCart(product) {
      this.error = null
      this.isLoading = true
      try {
        const existingProduct = this.cart.find(item => item.name === product.name)
        if (existingProduct) {
          existingProduct.quantity += product.quantity
        } else {
          this.cart.push(product)
          toast.success("This product has been added to cart.", {
            autoClose: 5000,
            theme: "colored",
            position: "top-center",
            pauseOnHover: false
          });
        }
        this.saveCartToSessionStorage()
      } catch (err) {
        this.error = err.message
        console.error('Error adding product to cart:', this.error)
      } finally {
        this.isLoading = false
      }
    },
    async updateQuantity(productName, newQuantity) {
      this.error = null
      this.isLoading = true
      try {
        const product = this.cart.find(item => item.name === productName)
        if (product) {
          product.quantity = newQuantity
          if (product.quantity <= 0) {
            this.deleteFromCart(productName)
          } else {
            this.saveCartToSessionStorage()
          }
        } else {
          throw new Error('Product not found')
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    async deleteFromCart(productName) {
      this.error = null
      this.isLoading = true
      try {
        this.cart = this.cart.filter(item => item.name !== productName)
        this.saveCartToSessionStorage()
      } catch (err) {
        this.error = err.message
      } finally {
        this.isLoading = false
      }
    },
    saveCartToSessionStorage() {
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
    },
  },
})

export default useCartStore;
