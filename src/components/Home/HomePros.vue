<template>
  <div class="custom-display">
    <div class="pros grid grid-cols-2 grid-rows-2 gap-x-1 lg:gap-x-10 gap-y-8 lg:gap-y-0 bg-white lg:grid-cols-4 lg:grid-rows-none py-5 md:py-8 lg:py-12 px-1 md:px-5">
      <div v-for="pros in data.pros" :key="pros.id" class="flex items-center gap-1 md:gap-2">
        <img :src="pros.image" :alt="pros.name" class="w-14 h-14" />
        <h5 class="font-medium md:text-h4">{{ pros.description }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '../../Data/DB-local.json'


</script>

<style scoped>
.pros {
  margin-top: -10px;
  border: 1px solid #f1f1f1;
}
</style>
