<template lang="">
  <div class="custom-display">
    <div class="bg-white flex flex-col items-center gap-5">
      <h4 class="mt-5">Best Seller</h4>
      <div class="flex flex-col gap-5 md:flex-row mx-12">
        <div v-for="best in data.best" :key="best.id" class="border border-lightGray font-14">
          <router-link :to="{ name: 'product-detail', params: { categoryId: best.categoryId, productId: best.id } }">
            <img :src="best.image" alt="best product" />
            <p class="mx-3">{{ best.name }}</p>
            <p class="text-brightYellow mx-3 mb-10">Rp {{ currencyFormat(best.price) }}</p>
          </router-link>
        </div>
      </div>
      <button
        type="button"
        class="text-white bg-brightYellow py-1.5 lg:py-3 px-8 lg:px-14 rounded-full md:text-h4 lg:text-h3 font-normal mb-8"
      >
        <a href="#categories">Show More</a>
      </button> 
    </div>
  </div>
</template>
<script setup>
import data from '../../Data/DB-local.json'
import { currencyFormat } from '@/utils/CurrencyFormat';
</script>

<style scoped>
.font-14 {
  font-size: 14px;
}
</style>
