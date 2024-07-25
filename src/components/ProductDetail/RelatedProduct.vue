<template>
  <div class="my-12">
    <h4 class="md:text-h2">Related Products</h4>
    <div v-if="error" class="text-red-500 text-center text-h2 my-5">
      Related products failed to render: {{ error }}
    </div>

    <div v-if="isLoading">
      <LoadSpinner />
    </div>

    <div v-if="!error && !isLoading" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="product in relatedProduct" :key="product.id" class="max-w-80">
        <router-link
          :to="{
            name: 'product-detail',
            params: { productName: product.name }
          }"
        >
          <img :src="product.image" :alt="product.name" class="w-full my-5" />
          <h6 class="md:text-h5">{{ product.name }}</h6>
          <h6 class="text-brightYellow md:text-h5">Rp {{ currencyFormat(product.price) }}</h6>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LoadSpinner from '../Other/LoadSpinner.vue'
import getCategories from '@/composable/getCategories'
import { currencyFormat } from '@/utils/CurrencyFormat'

const { categories, error, isLoading, loadCategories } = getCategories()
const relatedProduct = ref([])
const route = useRoute()
const productName = ref(route.params.productName)

const loadRelatedProducts = () => {
  if (categories.value.length > 0) {
    let currentCategory = null;
    // Find the category of the current product
    for (const category of categories.value) {
      const foundProduct = category.products.find((prod) => prod.name === productName.value)
      if (foundProduct) {
        currentCategory = category;
        break;
      }
    }

    if (currentCategory) {
      // Get all products in the same category, excluding the current product
      const relatedProducts = currentCategory.products.filter(product => product.name !== productName.value)
      
      // Shuffle and pick 3 random products
      const shuffledProducts = relatedProducts.sort(() => 0.5 - Math.random())
      relatedProduct.value = shuffledProducts.slice(0, 3)
    }
  }
}

onMounted(async () => {
  await loadCategories()
  loadRelatedProducts()
})

watch(
  () => route.params.productName,
  (newProductName) => {
    productName.value = newProductName
    loadRelatedProducts()
  }
)
</script>
