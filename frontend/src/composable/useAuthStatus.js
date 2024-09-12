// src/composables/useAuthStatus.js
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

export function useAuthStatus() {
  const authStore = useAuthStore()

  const isLoggedIn = computed(() => {
    return authStore.sessionID !== null || !!localStorage.getItem('sessionID')
  })

  return {
    isLoggedIn
  }
}
