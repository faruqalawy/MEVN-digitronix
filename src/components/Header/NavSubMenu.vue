<template>
  <li class="relative group">
    <div class="flex items-center">
        <a href="#" class="block py-2 px-2">All Product</a>
        <i class="fa-solid fa-chevron-down"></i>
    </div>
    <ul class=" p-2 absolute hidden group-hover:block bg-darkBlue text-white">
      <li v-for="category in categories" :key="category.id">
        <router-link
          :to="{ name: 'productsByCategory', params: { id: category.id } }"
          class="block py-2 px-5 w-52"
          >{{ category.name }}</router-link
        >
      </li>
    </ul>
  </li>
</template>
<script setup>
import getCategories from '@/composable/getCategories'

const { categories } = getCategories()
</script>
<style lang=""></style>
