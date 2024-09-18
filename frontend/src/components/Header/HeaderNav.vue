<template>
  <div class="flex items-center custom-display py-4">
    <!-- Small display, just placed search bar -->
    <div class="md:hidden w-full">
      <SearchBar />
    </div>

    <!-- Large display -->
    <div class="justify-between w-full hidden md:flex">
      <div class="text-white">
        <ul class="flex gap-5 lg:gap-12 items-center flex-wrap">
          <NavSubMenu />
          <li>
            <router-link
              :to="{ name: 'productsByCategory', params: { id: '66e29b34aa43058af2ccce05' } }"
              >Gadgets</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'productsByCategory', params: { id: '66e29b34aa43058af2ccce28' } }"
              >Photography</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'productsByCategory', params: { id: '66e29b34aa43058af2ccce0c' } }"
              >Gaming</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'productsByCategory', params: { id: '66e29b34aa43058af2ccce21' } }"
              >PC & Laptops</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'productsByCategory', params: { id: '66e29b34aa43058af2ccce13' } }"
              >Home Appliances</router-link
            >
          </li>
        </ul>
      </div>

      <div class="hidden md:flex gap-5">
        <HeaderCart />

        <button v-if="!isLoggedIn" type="submit" @click="login" class="text-white">Login</button>
        <button v-if="isLoggedIn" type="submit" @click="logout" class="text-white">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavSubMenu from './NavSubMenu.vue'
import HeaderCart from './HeaderCart.vue'
import SearchBar from './SearchBar.vue'

import { useRouter } from 'vue-router'

import { useAuth } from '@/composable/useAuth'
import { useAuthStatus } from '@/composable/useAuthStatus'

const router = useRouter()
const { isLoggedIn } = useAuthStatus()
const { logout } = useAuth()

const login = () => {
  router.push('/login')
}
</script>
