import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    loading: false,
    error: null
  }),

  actions: {
    async addComment(commentData) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('api/comments', commentData)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteComment(id) {
      try {
        await api.delete(`api/comments/${id}`)
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
})
