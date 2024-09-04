<template>
  <div class=" custom-display py-12">
    <h4 class="mb-5 sm:text-h1">What is everyone saying?</h4>
    <div class="grid gap-5 sm:grid-cols-2 sm:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 md:mb-10">
      <div v-for="testimony in data.testimonial" :key="testimony.id" class="bg-white px-4 py-8 ">
        <img :src="testimony.starImage" alt="5 stars" class="w-32">
        <p class="text-black/50 my-5">{{ testimony.testimony }}</p>
        <div class="flex gap-2 items-center">
          <img :src="testimony.image" alt="testimony" class="w-12">
          <p>{{ testimony.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import data from '../../Data/DB-local.json'
</script>
