import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  // Make `error` reactive
  const error = ref(null)
  const isLoading = computed(() => authStore.isLoading)

  // Mengambil user dari localStorage saat composable ini diinisialisasi
  const initializeSession = () => {
    const storedSessionID = localStorage.getItem('sessionID')
    if (storedSessionID) {
      authStore.sessionID = JSON.parse(storedSessionID)
    }
  }
  
  initializeSession();

  const register = async (username, email, password) => {
    try {
      const response = await authStore.register(username, email, password)
      localStorage.setItem('sessionID', JSON.stringify(response.data.sessionID))
      router.push('/')
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        duration: 5000,
        theme: 'colored'
      })
    }
  }

  const login = async (username, password) => {
    try {
      const response = await authStore.login(username, password)
      localStorage.setItem('sessionID', JSON.stringify(response.data.sessionID))
      router.push('/')
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        duration: 5000,
        theme: 'colored'
      })
    }
  }

  const logout = async () => {
    try {
      await authStore.logout()
      localStorage.removeItem('sessionID')
      router.push('/login')
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        duration: 5000,
        theme: 'colored'
      })
    }
  }

  const getCurrentUser = async () => {
    try {
      await authStore.getCurrentUser()
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        duration: 5000,
        theme: 'colored'
      })
    }
  }

  return {
    sessionID: authStore.sessionID,
    user: authStore.user,
    error,
    isLoading,
    register,
    login,
    logout,
    getCurrentUser
  }
}
