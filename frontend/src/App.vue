<script setup>
import { RouterView, useRoute } from 'vue-router';
import { ref } from 'vue';
import HeaderView from './components/Header/HeaderView.vue';
import FooterView from './components/Footer/FooterView.vue';

import { useHead } from '@vueuse/head';

const route = useRoute();

// Data untuk metadata
const siteData = ref({
  title: 'Digitronix',
  description: 'Discover a wide range of high-quality electronic products including smartphones, laptops, home appliances, and more. Enjoy competitive prices, excellent customer service, and a seamless shopping experience at Digitronix.',
  author: 'Faruq Alawy Hudaya',
  keywords: 'Electronic, Smartphone, Laptop, Home Appliance, Best Quality, Fast Shipping',
  copyright: 'Copyright © 2024 Digitronix. All Rights Reserved.',
  robots: 'index, follow',
  googlebot: 'index, follow',
  language: 'en',
  charset: 'UTF-8',
  viewport: 'width=device-width, initial-scale=1.0',
  ogTitle: 'Digitronix',
});

// Mengatur metadata menggunakan computed getter
useHead({
  title: () => siteData.value.title,
  meta: [
    {
      name: 'description',
      content: () => siteData.value.description,
    },
    {
      name: 'author',
      content: () => siteData.value.author,
    },
    {
      name: 'keywords',
      content: () => siteData.value.keywords,
    },
    {
      name: 'copyright',
      content: () => siteData.value.copyright,
    },
    {
      name: 'robots',
      content: () => siteData.value.robots,
    },
    {
      name: 'googlebot',
      content: () => siteData.value.googlebot,
    },
    {
      name: 'language',
      content: () => siteData.value.language,
    },
    {
      charset: () => siteData.value.charset,
    },
    {
      name: 'viewport',
      content: () => siteData.value.viewport,
    },
    {
      property: 'og:title',
      content: () => siteData.value.ogTitle,
    },
  ],
});
</script>

<template>
  <div id="app">
    <header v-if="route.name !== 'login' && route.name !== 'register'">
      <HeaderView />
    </header>

    <main>
      <RouterView />
    </main>

    <footer v-if="route.name !== 'login' && route.name !== 'register'">
      <FooterView />
    </footer>
  </div>
</template>

<style scoped>

</style>
