<template>
  <div class="flex justify-between custom-display place-items-center h-28">
    <!-- Left side of component -->
    <div class="flex items-center gap-3">
      <HamburgerNav v-model:isOpen="isOpen" />
      <router-link :to="{ name: 'home' }">
        <img src="/assets/images/logo.png" alt="website logo" class="w-36 md:w-52" />
      </router-link>
    </div>

    <!-- Right side of component -->
    <div>
      <!-- Small display for right side of component -->
      <div class="flex gap-3 sm:gap-5 md:hidden">
        <button v-if="!isLoggedIn" type="submit" @click="login" class="text-white">Login</button>
        <button v-if="isLoggedIn" type="submit" @click="logout" class="text-white">Logout</button>

        <HeaderCart />
      </div>
      <!-- Large display for right side of component -->
      <div class="hidden md:block">
        <SearchBar />
      </div>
    </div>
  </div>

  <!-- Small display, will be placed by nav list component that positioned in bottom, it will be hidden and active when hamburger nav clicked-->
  <transition>
    <div v-if="isOpen">
      <ul class="flex flex-col gap-3 text-white items-center border-t-2 py-5">
        <li v-for="category in categories" :key="category.id">
          <router-link :to="{ name: 'productsByCategory', params: { id: category.id } }">
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import HamburgerNav from './HamburgerNav.vue'
import HeaderCart from './HeaderCart.vue'
import SearchBar from './SearchBar.vue'

import getCategories from '@/composable/getCategories'
import { useAuth } from '@/composable/useAuth'
import { useAuthStatus } from '@/composable/useAuthStatus'

const { categories } = getCategories()
const { logout } = useAuth()
const { isLoggedIn } = useAuthStatus()

const route = useRoute()
const router = useRouter()

const login = () => {
  router.push('/login')
}
const isOpen = ref(false)

// Watch for route changes to close the hamburger nav if the route is 'productsByCategory' (category page)
watch(route, (newRoute) => {
  if (newRoute.name === 'productsByCategory') {
    isOpen.value = false
  }
})
</script>
<style>
.centered-text {
  font-size: 10px; /* Sesuaikan ukuran font sesuai kebutuhan */
  fill: black; /* Warna teks */
  font-family: 'Montserrat'; /* Jenis font */
}
</style>
