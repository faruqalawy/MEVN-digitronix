<script setup>
import getCategories from '@/composable/getCategories'

const { categories } = getCategories()
</script>

<template>
  <div class="bg-darkBlue border-b-4 border-lightGray py-10">
    <div class="custom-display">
      <img src="/assets/images/logo.png" alt="logo" class="h-8 mx-auto mb-5 md:hidden" />

      <div
        class="flex flex-col items-center md:items-start text-center md:text-start text-white/60 md:grid md:grid-cols-4"
      >
        <div class="">
          <router-link :to="{ name: 'home' }">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              class="h-8 mx-auto md:mx-0 mb-5 hidden md:block"
            />
          </router-link>
          <div class="flex justify-center md:justify-normal gap-2 mb-12">
            <img src="/assets/images/instagram.png" alt="instagram logo" class="h-6" />
            <img src="/assets/images/youtube.png" alt="youtube logo" class="h-6" />
            <img src="/assets/images/facebook.png" alt="facebook logo" class="h-6" />
            <img src="/assets/images/whatsapp.png" alt="whatsapp logo" class="h-6" />
          </div>
        </div>
        <div class="mb-10">
          <h4>Shop</h4>
          <ul class="">
            <li v-for="category in categories" :key="category.id">
              <router-link
                :to="{ name: 'productsByCategory', params: { id: category.id } }"
                class="block py-2 px-5 w-52 mx-auto md:m-0"
                >{{ category.name }}</router-link
              >
            </li>
          </ul>
        </div>
        <div class="mb-10 ">
          <h4>Customer Support</h4>
          <ul>
            <li>Contact</li>
            <li>Order Tracking</li>
            <li>FAQs</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4>Store Information</h4>
          <ul>
            <li>Jl. Pembangunan No.123, Kecamatan Tarogong, Garut, Jawa Barat, 44151</li>
            <li>Phone: (0262) 123-4567</li>
            <li>WhatsApp: +62 812-3456-7890</li>
            <li>info@elektronik.com</li>
            <li>support@elektronik.com</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-darkBlue py-7">
    <div class="custom-display">
      <h1 class="text-h6 text-white/60 text-center">Copyright © 2024 Digitronix. All rights reserved.</h1>
    </div>
  </div>
</template>

<style scoped>
ul {
  @apply flex flex-col gap-2.5;
}

/* this style enable to reset default styles for 'a' in 'router-link' */
a {
  @apply p-0 w-fit;
}

h4 {
  @apply text-brightYellow mb-5;
}
</style>
