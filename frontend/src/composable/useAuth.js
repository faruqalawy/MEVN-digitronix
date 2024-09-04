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
  const initializeUser = () => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      authStore.user = JSON.parse(storedUser)
    }
  }

  initializeUser();

  const register = async (username, email, password) => {
    try {
      const response = await authStore.register(username, email, password)
      localStorage.setItem('currentUser', JSON.stringify(response.data.user))
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
      localStorage.setItem('currentUser', JSON.stringify(response.data.user))
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
      localStorage.removeItem('currentUser')
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
    user: authStore.user,
    error,
    isLoading,
    register,
    login,
    logout,
    getCurrentUser
  }
}
