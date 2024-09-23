import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'animate.css'
import axios from 'axios';

axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createHead()) // Use the createHead function for meta tags
app.use(Vue3Toastify) // Register the ToastifyContainer as a global component

app.mount('#app')
