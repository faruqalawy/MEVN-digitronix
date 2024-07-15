<template>
  <h4 class="mt-10 mb-2 md:text-h2">Cart</h4>
  <div class="border-b-2 border-lightGray"></div>
  <div v-if="error" class="text-red-500 text-center text-h2 my-5">
    Cart list failed to render: {{ error }}
  </div>

  <div v-if="isLoading">
    <LoadSpinner />
  </div>

  <div v-if="!error && !isLoading && cart.length > 0">
    <div v-for="product in cart" :key="product.id">
      <div class="grid grid-cols-8 my-7 items-center gap-2.5">
        <div class="col-span-2">
          <img :src="product.image" :alt="product.name" class="lg:w-9/12" />
        </div>
        <div class="col-span-5">
          <h6 class="text-brightYellow md:text-h5 lg:text-h4">{{ product.name }}</h6>
          <h6 class="md:text-[14px] lg:text-h5">Rp {{ currencyFormat(product.price) }}</h6>
          <div
            class="flex items-center max-w-48 border rounded-md overflow-hidden"
          >
            <button
              class="bg-red-500/60 hover:bg-red-500 text-white px-4 py-2 focus:outline-none"
              @click="handleDecrement(product)"
            >
              -
            </button>
            <input
              type="number"
              class="cart-number w-full text-center border-none focus:outline-none appearance-none"
              v-model="product.quantity"
            />
            <button
              class="bg-green-500/60 hover:bg-green-500 text-white px-4 py-2 focus:outline-none"
              @click="handleIncrement(product)"
            >
              +
            </button>
          </div>
          <h6 class="mt-1 md:text-[14px] lg:text-h5">
            Total: Rp {{ currencyFormat(product.price * product.quantity) }}
          </h6>
        </div>
        <div class="col-span-1 flex justify-center cursor-pointer" @click="deleteFromCart(product.name)">
          <i class="fa-solid fa-trash"></i>        </div>
      </div>
      <div class="border-b-2 border-lightGray"></div>
    </div>
  </div>
  <div v-else-if="!isLoading && cart.length === 0">
    <p class="mt-3 text-center">No products in the cart.</p>
  </div>
</template>

<script setup>
import LoadSpinner from '@/components/Other/LoadSpinner.vue'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { currencyFormat } from '@/utils/CurrencyFormat'

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
const isLoading = computed(() => cartStore.isLoading)
const error = computed(() => cartStore.error)

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

// Delete a product from the cart
async function deleteFromCart(productName) {
  await cartStore.deleteFromCart(productName)
}
</script>
