import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    errors: {}
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    hasErrors: (state) => Object.keys(state.errors).length > 0
  },

  actions: {
    // Initialiser le CSRF token
    async initCSRF() {
      try {
        await api.get('/sanctum/csrf-cookie')
      } catch (error) {
        console.error('Erreur CSRF:', error)
      }
    },

    // Vérifier l'authentification
    async checkAuth() {
      try {
        this.loading = true
        const response = await api.get('/api/check-auth')

        if (response.data.authenticated) {
          this.user = response.data.user
          this.isAuthenticated = true
        } else {
          this.user = null
          this.isAuthenticated = false
        }
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        console.error('Erreur de vérification auth:', error)
      } finally {
        this.loading = false
      }
    },

    // Connexion
    async login(credentials) {
      try {
        this.loading = true
        this.errors = {}

        // Initialiser CSRF
        await this.initCSRF()

        const response = await api.post('/api/login', credentials)

        this.user = response.data.user
        this.isAuthenticated = true

        return { success: true, message: response.data.message }
      } catch (error) {
        this.isAuthenticated = false
        this.user = null

        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors
        } else {
          this.errors = { general: ['Une erreur est survenue'] }
        }

        return {
          success: false,
          message: error.response?.data?.message || 'Erreur de connexion'
        }
      } finally {
        this.loading = false
      }
    },

    // Inscription
    async register(userData) {
      try {
        this.loading = true
        this.errors = {}

        // Initialiser CSRF
        await this.initCSRF()

        const response = await api.post('/api/register', userData)

        this.user = response.data.user
        this.isAuthenticated = true

        return { success: true, message: response.data.message }
      } catch (error) {
        this.isAuthenticated = false
        this.user = null

        if (error.response?.data?.errors) {
          this.errors = error.response.data.errors
        } else {
          this.errors = { general: ['Une erreur est survenue'] }
        }

        return {
          success: false,
          message: error.response?.data?.message || 'Erreur d\'inscription'
        }
      } finally {
        this.loading = false
      }
    },

    // Déconnexion
    async logout() {
      try {
        this.loading = true
        await api.post('/api/logout')
      } catch (error) {
        console.error('Erreur de déconnexion:', error)
      } finally {
        this.user = null
        this.isAuthenticated = false
        this.loading = false
        this.errors = {}

        // Rediriger vers la page de connexion
        window.location.href = '/'
      }
    },

    // Nettoyer les erreurs
    clearErrors() {
      this.errors = {}
    }
  }
})
