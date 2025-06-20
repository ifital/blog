import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export function useAuth() {
  const authStore = useAuthStore()

  const {
    user,
    isAuthenticated,
    loading,
    errors
  } = storeToRefs(authStore)

  return {
    // State
    user,
    isAuthenticated,
    loading,
    errors,

    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    checkAuth: authStore.checkAuth,
    clearErrors: authStore.clearErrors,

    // Getters
    isLoggedIn: authStore.isLoggedIn,
    hasErrors: authStore.hasErrors
  }
}
