// src/composables/useAuthStatus.js
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export function useAuthStatus() {
  const authStore = useAuthStore()

  const isLoggedIn = computed(() => {
    console.log('isLoggedIn:', authStore.user !== null || !!localStorage.getItem('currentUser'))
    return authStore.user !== null || !!localStorage.getItem('currentUser')
  })

  return {
    isLoggedIn
  }
}
