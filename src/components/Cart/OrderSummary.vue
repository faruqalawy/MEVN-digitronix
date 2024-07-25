<template>
  <h4 class="mt-10 mb-2 md:text-h2">Order Summary</h4>
  <div class="border-b-2 border-lightGray"></div>
  <div class="my-7">
    <div class="flex justify-between">
      <h1 class="text-h5">Subtotal</h1>
      <h1 class="text-h5">Rp {{ currencyFormat(totalCartPrice) }}</h1>
    </div>
    <div class="flex justify-between mt-4">
      <h1 class="text-h5">
        Delivery
        <!-- <br><span class="underline">West Java, Indonesia</span> -->
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
</template>

<script setup>
import { computed, watch } from 'vue';
import useCartStore from '@/stores/cart'
import { currencyFormat } from '@/utils/CurrencyFormat'

const cartStore = useCartStore()
const totalCartPrice = computed(() => cartStore.totalCartPrice)
const cart = computed(() => cartStore.cart)

// Watch for changes in the cart to automatically update the view
watch(cart, () => {
  // Cart has changed, so we need to re-compute the totalCartPrice
  totalCartPrice.value = cartStore.totalCartPrice
})
</script>
