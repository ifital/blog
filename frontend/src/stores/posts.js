import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null
  }),

  getters: {
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === parseInt(id))
    }
  },

  actions: {
    async fetchPosts() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/posts')
        this.posts = response.data
      } catch (error) {
        this.error = error.message
        console.error('Erreur lors du chargement des posts:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchPost(id) {
      this.loading = true
      this.error = null
      try {
        const response = await api.get(`/posts/${id}`)
        this.currentPost = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Erreur lors du chargement du post:', error)
      } finally {
        this.loading = false
      }
    },

    async createPost(postData) {
      try {
        const response = await api.post('/posts', postData)
        this.posts.unshift(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async updatePost(id, postData) {
      try {
        const response = await api.put(`/posts/${id}`, postData)
        const index = this.posts.findIndex(post => post.id === id)
        if (index !== -1) {
          this.posts[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async deletePost(id) {
      try {
        await api.delete(`/posts/${id}`)
        this.posts = this.posts.filter(post => post.id !== id)
      } catch (error) {
        this.error = error.message
        throw error
      }
    }
  }
})
