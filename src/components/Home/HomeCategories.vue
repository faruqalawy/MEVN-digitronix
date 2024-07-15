<template>
  <div class="custom-display" id="categories">
    <div v-if="error" class="text-red-500 text-center text-h2 my-5">
      Categories failed to render: {{ error }}
    </div>

    <div v-if="isLoading">
      <LoadSpinner />
    </div>

    <div
      v-if="!error && !isLoading"
      class="categories grid grid-cols-2 grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 bg-white my-6 pb-3"
    >
      <div v-for="category in categories" :key="category.id">
        <router-link :to="{ name: 'productsByCategory', params: { id: category.id } }">
          <div class="flex flex-col items-center">
            <img :src="category.image" :alt="category.name" />
            <p class="md:text-h4">{{ category.name }}</p>
            <h6 class="text-black/50 md:text-h5">{{ category.products.length }} Products</h6>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import LoadSpinner from '../Other/LoadSpinner.vue'
import getCategories from '@/composable/getCategories'

const { categories, error, isLoading } = getCategories()
</script>

<style scoped>
.categories {
  border: 1px solid #f1f1f1;
}
</style>
