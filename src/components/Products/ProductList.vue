<template>
  <div v-bind="$attrs">
    <div v-if="error" class="text-red-500 text-center text-h2 my-5">
      Cart list failed to render: {{ error }}
    </div>

    <div v-if="isLoading">
      <LoadSpinner />
    </div>

    <div class="custom-display my-8" v-if="category">
      <h3 class="mb-5 text-darkBlue">{{ category.name }}</h3>
      <h6 class="mb-2.5 lg:text-h5">{{ ProductsLaptopList.length }} Products</h6>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-5 gap-y-5 md:gap-y-12">
        <div v-for="product in ProductsLaptopList" :key="product.id">
          <router-link 
            :to="{
              name: 'product-detail',
              params: { categoryId: category.id, productId: product.id }
            }"
          >
            <img :src="product.image" :alt="product.name" class="w-full" />
            <h6 class="md:text-h5">{{ product.name }}</h6>
            <h6 class="text-brightYellow md:text-h5 md:mt-1">
              Rp {{ currencyFormat(product.price) }}
            </h6>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import LoadSpinner from '../Other/LoadSpinner.vue'

import getCategories from '@/composable/getCategories'
import { currencyFormat } from '@/utils/CurrencyFormat'

const route = useRoute()
const id = ref(route.params.id)

const { category, error, isLoading, loadCategoryById } = getCategories(id)

const ProductsLaptopList = computed(() => category.value?.products || [])

// Watch for route changes to update id and fetch new data if needed
watch(
  () => route.params.id,
  (newId) => {
    id.value = newId
    loadCategoryById(newId) // Fetch new category data when id changes
  }
)
</script>
