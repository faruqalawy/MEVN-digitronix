<template>
  <div v-if="error" class="text-red-500 text-center text-h2 my-5">
    Search Results failed to render: {{ error }}
  </div>
  <div v-if="isLoading">
    <LoadSpinner />
  </div>
  <div v-if="!error && !isLoading && filteredProducts.length" class="custom-display my-8">
    <h3 class="mb-5 text-darkBlue">Search Results for: '{{ query }}'</h3>
    <h3 class="text-h5 mb-2.5 lg:text-h4">{{ filteredProducts.length }} Products</h3>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-12">
      <div v-for="product in filteredProducts" :key="product.id">
        <router-link :to="{ name: 'product-detail', params: { productName: product.name }}">
          <img :src="product.image" />
          <h3 class="text-[14px] lg:text-h4">{{ product.name }}</h3>
          <h3 class="text-h6 text-brightYellow lg:text-[18px] md:mt-1">Rp {{ currencyFormat(product.price) }}</h3>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-h2 my-5 custom-display">
    <h3 class="mb-5 text-start text-darkBlue">Search Results for: '{{ query }}'</h3>
    <h5 class="flex justify-center items-center py-10">
      Sorry, but nothing matched your search terms. Please try again with some different keywords.
    </h5>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { currencyFormat } from '@/utils/CurrencyFormat'
import getCategories from '@/composable/getCategories'

const { categories, error, isLoading, loadCategories } = getCategories()
const route = useRoute()
const query = ref(route.query.q || '')

const filteredProducts = computed(() => {
  if (!categories.value || !Array.isArray(categories.value)) {
    return []
  }
  return categories.value.flatMap((category) =>
    category.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.value.toLowerCase()) ||
        product.features.some((feature) => feature.toLowerCase().includes(query.value.toLowerCase()))
    )
  )
})

onMounted(async () => {
  await loadCategories()
  document.title = `Search Results for ${query.value}`
})

watch(
  () => route.query.q,
  (newQuery) => {
    query.value = newQuery || ''
    document.title = `Search Results for "${query.value}"`
  }
)
</script>
