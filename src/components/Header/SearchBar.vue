<template>
    <div class="flex bg-white w-full rounded-md">
        <input
          v-model="searchQuery"
          type="text"
          class="border-none w-full rounded-md px-2"
          placeholder="Search product..."
          @keyup.enter="handleSearch"
        />
        <img src="/assets/images/search.png" class="p-2 cursor-pointer search-icon" alt="search" @click="handleSearch" />
      </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
    if (searchQuery.value) {
        router.push({ name: 'search', query: { q: searchQuery.value } })
        searchQuery.value = ''
    }
}
</script>