<template>
  <!-- Trigger handleCartClick when the cart icon is clicked -->
  <div @click="handleCartClick" class="flex items-center gap-2 cursor-pointer">
    <i class="fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
    <!-- Cart icon image -->
    <!-- Display the number of items in the cart -->
    <span class="bg-white rounded-full px-2">{{ cart.length }}</span>
  </div>

  <!-- Background overlay for cart preview -->
  <div v-if="cartStatus" class="fixed inset-0 bg-black/50 z-50" @click="closeCart"></div>

  <!-- Cart preview -->
  <transition
    enter-active-class="animate__animated animate__fadeInRightBig"
    leave-active-class="animate__animated animate__fadeOutRightBig"
  >
    <div
      v-if="cartStatus"
      @click.stop
      class="fixed right-0 top-0 bottom-0 max-w-[500px] w-full bg-white p-5 border-2 border-lightGray flex flex-col overflow-y-scroll z-50 no-scrollbar"
    >
      <!-- Header for the cart preview with title and close button -->
      <div class="flex justify-between">
        <h5>Shopping Cart</h5>
        <!-- Cart title -->
        <span class="cursor-pointer" @click="toggleCart">X</span>
        <!-- Button to close the cart -->
      </div>
      <div class="border-b-2 border-lightGray w-full mt-3 mb-5"></div>
      <!-- Separator line -->

      <div class="md:w-[460px]">
        <!-- Show a loading spinner while cart data is being fetched -->
        <div v-if="isLoading" class="text-center">
          <LoadSpinner />
        </div>
        <!-- Show an error message if there is an error -->
        <div v-if="error" class="text-red-500 text-center">
          {{ error }}
        </div>
        <!-- Iterate over cart items and display each product -->
        <div v-for="product in cart" :key="product.id">
          <div class="grid grid-cols-12">
            <img :src="product.image" alt="product.name" class="w-10 h-fit col-span-2" />
            <!-- Product image -->
            <div class="col-span-6 flex flex-col gap-1">
              <h5>{{ product.name }}</h5>
              <!-- Product name -->
              <div class="flex items-center max-w-48 border rounded-md overflow-hidden">
                <!-- Button to decrease product quantity -->
                <button
                  class="bg-red-500/60 hover:bg-red-500 text-white px-4 py-2 focus:outline-none"
                  @click="handleDecrement(product)"
                >
                  -
                </button>
                <!-- Input field for setting product quantity -->
                <input
                  type="number"
                  class="cart-number w-full text-center border-none focus:outline-none appearance-none"
                  v-model="product.quantity"
                />
                <!-- Button to increase product quantity -->
                <button
                  class="bg-green-500/60 hover:bg-green-500 text-white px-4 py-2 focus:outline-none"
                  @click="handleIncrement(product)"
                >
                  +
                </button>
              </div>
            </div>
            <h5 class="col-span-1">x{{ product.quantity }}</h5>
            <!-- Display product quantity -->
            <div class="flex flex-col justify-between items-end col-span-3">
              <!-- Button to remove the product from the cart -->
              <i
                class="fa-regular fa-circle-xmark cursor-pointer"
                @click="deleteFromCart(product.name)"
              ></i>
              <h5>Rp {{ currencyFormat(product.price) }}</h5>
              <!-- Display product price -->
            </div>
          </div>

          <div class="border-b-2 border-lightGray w-full my-5"></div>
          <!-- Separator line for each product -->
        </div>
      </div>

      <!-- Message displayed when the cart is empty -->
      <h5
        v-if="cart.length === 0"
        class="grow flex items-center justify-center max-w-[460px] md:w-[460px]"
      >
        There is no product in your cart.
      </h5>

      <div class="bottom">
        <!-- Display subtotal if there are items in the cart -->
        <div v-if="totalCartPrice > 0" class="flex justify-between">
          <h5>SubTotal</h5>
          <h5>Rp {{ currencyFormat(totalCartPrice) }}</h5>
        </div>
        <div v-if="totalCartPrice > 0" class="border-b-2 border-lightGray w-full my-5"></div>

        <div class="flex flex-col gap-3">
          <!-- Link to view the cart page -->
          <router-link :to="{ name: 'cart' }" @click="closeCart">
            <button
              type="button"
              class="text-white bg-brightYellow py-3 rounded-md font-normal w-full mt-5"
            >
              View Cart
            </button>
          </router-link>
          <!-- Link to the checkout page -->
          <router-link :to="{ name: 'checkout' }" @click="closeCart">
            <button
              type="button"
              class="text-white bg-brightYellow py-3 rounded-md font-normal w-full"
            >
              Checkout
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { currencyFormat } from '@/utils/CurrencyFormat'
import LoadSpinner from '../Other/LoadSpinner.vue'

// Initialize the cart store
const cartStore = useCartStore()
const route = useRoute()

// Computed properties for cart and total cart price
const cart = computed(() => cartStore.cart)
const totalCartPrice = computed(() => cartStore.totalCartPrice)
const isLoading = computed(() => cartStore.isLoading)
const error = computed(() => cartStore.error)

// Check if the current route is the checkout or cart page
const isForbiddenPage = computed(() => route.name === 'checkout' || route.name === 'cart')

// Toggle the cart status
const cartStatus = ref(false)
const toggleCart = () => {
  if (!isForbiddenPage.value) {
    cartStatus.value = !cartStatus.value
  }
}
const handleCartClick = () => {
  if (!isForbiddenPage.value) {
    toggleCart()
  }
}
const closeCart = () => {
  cartStatus.value = false
}

// Delete a product from the cart
async function deleteFromCart(productName) {
  await cartStore.deleteFromCart(productName)
}

// Increment product quantity
async function handleIncrement(product) {
  const newQuantity = product.quantity + 1
  await cartStore.updateQuantity(product.name, newQuantity)
}

// Decrement product quantity
async function handleDecrement(product) {
  if (product.quantity > 1) {
    const newQuantity = product.quantity - 1
    await cartStore.updateQuantity(product.name, newQuantity)
  }
}

// Watch for changes in the cart to automatically update the view
watch(cart, () => {
  // Cart has changed, so we need to re-compute the totalCartPrice
  totalCartPrice.value = cartStore.totalCartPrice
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
