<script setup>
import { RouterView } from 'vue-router';
import HeaderView from './components/Header/HeaderView.vue';
import FooterView from './components/Footer/FooterView.vue';
</script>

<template>
  <div id="app">
    <header>
      <HeaderView />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <FooterView />
    </footer>
  </div>
</template>

<style scoped>

</style>
