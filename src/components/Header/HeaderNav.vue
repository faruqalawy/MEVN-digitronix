<template>
  <div class="flex items-center custom-display py-4">
    <!-- Small display, just placed search bar -->
    <div class="md:hidden w-full">
      <SearchBar />
    </div>

    <!-- Large display -->
    <div class="justify-between w-full hidden md:flex">
      <div class="text-white">
        <ul class="flex gap-5 lg:gap-12 items-center">
          <NavSubMenu />
          <li>
            <router-link :to="{ name: 'productsByCategory', params: { id: 2 } }"
              >Gadgets</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'productsByCategory', params: { id: 7 } }"
              >Photography</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'productsByCategory', params: { id: 3 } }"
              >Gaming</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'productsByCategory', params: { id: 6 } }"
              >PC & Laptops</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'productsByCategory', params: { id: 4 } }"
              >Home Appliances</router-link
            >
          </li>
        </ul>
      </div>

      <div class="hidden md:block">
        <HeaderCart />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavSubMenu from './NavSubMenu.vue'
import HeaderCart from './HeaderCart.vue'
import SearchBar from './SearchBar.vue';
</script>
