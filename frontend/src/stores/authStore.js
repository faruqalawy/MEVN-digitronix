import { defineStore } from "pinia";
import { ref } from "vue";
import authService from "../services/authService";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const error = ref(null);
    const isLoading = ref(false);

    const register = async (username, email, password) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await authService.register(username, email, password);
            user.value = response.data.user;
            return response;
        } catch (error) {
            error.value = error.message;
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const login = async (username, password) => {
        isLoading.value = true;
        error.value = null;
        try {
          const response = await authService.login(username, password);
          user.value = response.data.user;
          return response;
        } catch (error) {
          error.value = error.message; // Ambil pesan dari error
          throw error; // Tetap melempar error agar bisa ditangani di composable
        } finally {
          isLoading.value = false;
        }
      };
      
    

    const logout = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            await authService.logout();
            return user.value = null;
        } catch (error) {
            error.value = error.message;
            throw error; // Tetap melempar error agar bisa ditangani di composable
        } finally {
            isLoading.value = false;
        }
    }

    const getCurrentUser = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const user = await authService.getCurrentUser();
            if (user) {
                return this.user.value = user;
            }
        } catch (error) {
            error.value = error.message;
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        user,
        error,
        isLoading,
        register,
        login,
        logout,
        getCurrentUser
    }
})