import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'animate.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Register the ToastifyContainer as a global component
app.use(Vue3Toastify)

app.mount('#app')
