<template>
  <div>
    <h4 class="mt-10 mb-3 md:text-h2 underline underline-offset-8">Payment</h4>
    <h6 class="text-black/50 my-5 md:text-h5">There is no payment method available</h6>
    <button
      type="button"
      class="text-white bg-brightYellow py-3 rounded-md font-normal w-full mb-16 flex justify-center"
      @click="handleConfirmOrder"
    >
      <img :src="lock" alt="lock" class="mr-3 pt-0.5 w-4">
      Confirm Order
    </button>
  </div>
</template>

<script setup>
import lock from '@/assets/images/lock.png';
import { defineEmits } from 'vue';

const emits = defineEmits(['validate']);

const handleConfirmOrder = () => {
  emits('validate');
};
</script>
