<template>
  <h4 class="mt-10 mb-2 md:text-h2">Order Summary</h4>
  <div v-if="cart && cart.length > 0"> <!-- Cek jika cart tidak undefined -->
    <div class="border-b-2 border-lightGray"></div>
    <div class="my-7">
      <div class="flex justify-between">
        <h1 class="text-h5">Subtotal</h1>
        <h1 class="text-h5">Rp {{ currencyFormat(totalCartPrice) }}</h1>
      </div>
      <div class="flex justify-between mt-4">
        <h1 class="text-h5">
          Delivery
        </h1>
        <h1 class="text-h5">FREE</h1>
      </div>
    </div>
    <div class="border-b-2 border-lightGray"></div>
    <div class="flex justify-between mt-7 mb-10">
      <h4>Total</h4>
      <h4>Rp {{ currencyFormat(totalCartPrice) }}</h4>
    </div>
    <router-link :to="{ name: 'checkout' }">
      <button
        type="button"
        class="text-white bg-brightYellow py-3 rounded-md font-normal w-full mb-16"
      >
        Checkout
      </button>
    </router-link>
  </div>
  <div v-else>
    <p class="text-center">Your cart is empty</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import useCartStore from '@/stores/cartStore'
import { currencyFormat } from '@/utils/CurrencyFormat'

const cartStore = useCartStore()
const totalCartPrice = computed(() => cartStore.totalCartPrice)
const cart = computed(() => cartStore.cart || [])  // Inisialisasi cart sebagai array kosong jika undefined
</script>
