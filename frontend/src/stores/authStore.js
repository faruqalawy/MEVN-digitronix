import { defineStore } from "pinia";
import { ref } from "vue";
import authService from "../services/authService";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const sessionID = ref(null);  // Pastikan hanya dikelola di store
    const error = ref(null);
    const isLoading = ref(false);

    const register = async (username, email, password) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await authService.register(username, email, password);
            sessionID.value = response.data.sessionID;
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
            sessionID.value = response.data.sessionID;
            return response;
        } catch (error) {
            error.value = error.message;
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const logout = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            await authService.logout();
            sessionID.value = null;
            user.value = null;  // Pastikan user juga dihapus
        } catch (error) {
            error.value = error.message;
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const getCurrentUser = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) {
                user.value = currentUser;
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
        sessionID,
        error,
        isLoading,
        register,
        login,
        logout,
        getCurrentUser
    }
})
