<template>
  <!-- Toggle for small screens -->
  <div class="summary-toggle border-b-2 border-t-2 border-[#d9d9d9] bg-offWhite lg:hidden" @click="toggleCart">
    <div class="custom-display flex justify-between p-5">
      <div class="flex gap-1.5">
        <h6 class="md:text-h5">{{ isCartOpen ? 'Hide Your Order' : 'Show Your Order' }}</h6>
        <i :class="['fa-solid fa-chevron-down pt-0.5 transition-transform duration-300', { 'rotate-180': isCartOpen }]"></i>
      </div>
      <h6 class="md:text-h5">Rp {{ currencyFormat(totalCartPrice) }}</h6>
    </div>
  </div>

  <!-- Cart summary list -->
  <transition name="slide-down">
    <div v-if="isCartOpen || isLargeScreen" class="custom-display lg:custom-display-reset">
      <div v-if="error" class="text-red-500 text-center text-h2">
        {{ error }}
      </div>
      <div v-if="isLoading">
        <LoadSpinner />
      </div>
      <h3 v-if="!error && !isLoading" class="mt-10 mb-3 md:text-h2 underline underline-offset-8 hidden lg:block">Your Order</h3>
      <div class="border-b-2 border-[#d9d9d9] hidden lg:block mt-7"></div>
      <div v-for="product in cart" :key="product.id" class="border-b-2 border-[#d9d9d9] py-7">
        <div class="grid grid-cols-12 gap-2 items-center">
          <div class="col-span-2">
            <img :src="product.image" :alt="product.name" />
          </div>
          <h6 class="col-span-6 md:text-h5">
            {{ product.name }}
          </h6>
          <h6 class="col-span-1 flex justify-center md:text-h5">x {{ product.quantity }}</h6>
          <h6 class="col-span-3 flex justify-end md:text-h5">
            Rp {{ currencyFormat(product.price * product.quantity) }}
          </h6>
        </div>
      </div>
      <div class="row-style mb-3">
        <h5 class="md:text-h4">Sub Total</h5>
        <h5 class="md:text-h4">Rp {{ currencyFormat(totalCartPrice) }}</h5>
      </div>
      <div class="row-style">
        <h5 class="md:text-h4">Delivery</h5>
        <h5 class="md:text-h4">FREE</h5>
      </div>
      <div class="border-b-2 border-[#d9d9d9]"></div>
      <div class="font-bold row-style">
        <h5 class="md:text-h4">Total</h5>
        <h5 class="md:text-h4">Rp {{ currencyFormat(totalCartPrice) }}</h5>
      </div>
      <div class="border-b-2 border-[#d9d9d9]"></div>
    </div>
  </transition>
</template>

<script setup>
import LoadSpinner from '../Other/LoadSpinner.vue';
import { currencyFormat } from '@/utils/CurrencyFormat';
import { onMounted, ref, computed } from 'vue';
import useCartStore from '@/stores/cart';

const cartStore = useCartStore();
const { cart, loadCart, error, isLoading, totalCartPrice } = cartStore;

const isCartOpen = ref(false);
const isLargeScreen = computed(() => window.innerWidth >= 1024);

onMounted(() => {
  loadCart();
  window.addEventListener('resize', handleResize);
});

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isCartOpen.value = true;
  }
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};
</script>

<style scoped>
/* this style enable to reset 'custom-display' for 'your order' component when screen width is more than 1024 (lg) */
.custom-display-reset {
  max-width: 0;
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
}

@media (min-width: 768px) {
  .custom-display {
    padding-left: 0;
    padding-right: 0;
  }
}

.row-style {
  @apply my-7 flex justify-between;
}

.rotate-180 {
  transform: rotate(180deg);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease;
}

.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to, .slide-down-leave-from {
  max-height: 2000px;
  opacity: 1;
}
</style>
