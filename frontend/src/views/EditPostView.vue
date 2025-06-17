<template>
  <div class="edit-post">
    <div class="header">
      <div class="header-content">
        <div class="header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="header-text">
          <h1>Modifier l'article</h1>
          <p>Apportez vos modifications et améliorations</p>
        </div>
      </div>
      <router-link :to="`/post/${$route.params.id}`" class="btn btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Retour à l'article
      </router-link>
    </div>

    <div class="content-wrapper">
      <div v-if="loading" class="loading-card">
        <div class="loading-spinner">
          <svg class="spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12A9 9 0 1 1 12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <p>Chargement de l'article...</p>
      </div>

      <form v-else @submit.prevent="updatePost" class="post-form">
        <div class="form-header">
          <h2>Modifier les détails</h2>
          <p>Mettez à jour les informations de votre article</p>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label for="title">
              <span class="label-text">Titre de l'article</span>
              <span class="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              v-model="form.title"
              required
              class="form-control"
              placeholder="Titre de votre article"
            >
          </div>

          <div class="form-group">
            <label for="author">
              <span class="label-text">Auteur</span>
              <span class="required">*</span>
            </label>
            <input
              type="text"
              id="author"
              v-model="form.author"
              required
              class="form-control"
              placeholder="Nom de l'auteur"
            >
          </div>

          <div class="form-group full-width">
            <label for="image">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="label-text">Image de couverture (URL)</span>
            </label>
            <input
              type="url"
              id="image"
              v-model="form.image"
              class="form-control"
              placeholder="https://exemple.com/image.jpg"
            >
            <div v-if="form.image" class="image-preview">
              <img :src="form.image" alt="Aperçu" />
              <div class="image-overlay">
                <span>Aperçu de l'image</span>
              </div>
            </div>
          </div>

          <div class="form-group full-width">
            <label for="content">
              <span class="label-text">Contenu de l'article</span>
              <span class="required">*</span>
            </label>
            <textarea
              id="content"
              v-model="form.content"
              required
              class="form-control textarea"
              rows="12"
              placeholder="Contenu de votre article..."
            ></textarea>
            <div class="character-count">
              {{ form.content.length }} caractères
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <svg v-if="loading" class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12A9 9 0 1 1 12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ loading ? 'Mise à jour...' : 'Mettre à jour' }}
          </button>

          <button type="button" @click="deletePost" class="btn btn-danger" :disabled="loading">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Supprimer
          </button>

          <router-link :to="`/post/${$route.params.id}`" class="btn btn-outline">
            Annuler
          </router-link>
        </div>

        <div v-if="error" class="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts'
import { useRouter } from 'vue-router'

export default {
  name: 'EditPostView',
  setup() {
    const postsStore = usePostsStore()
    const router = useRouter()
    return { postsStore, router }
  },
  data() {
    return {
      form: {
        title: '',
        author: '',
        content: '',
        image: ''
      },
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadPost()
  },
  methods: {
    async loadPost() {
      this.loading = true
      try {
        const post = await this.postsStore.fetchPost(this.$route.params.id)
        if (post) {
          this.form = {
            title: post.title,
            author: post.author,
            content: post.content,
            image: post.image || ''
          }
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement de l\'article'
      } finally {
        this.loading = false
      }
    },

    async updatePost() {
      this.loading = true
      this.error = null

      try {
        await this.postsStore.updatePost(this.$route.params.id, this.form)
        this.$router.push(`/post/${this.$route.params.id}`)
        alert('Article mis à jour avec succès !')
      } catch (error) {
        this.error = 'Erreur lors de la mise à jour de l\'article'
      } finally {
        this.loading = false
      }
    },

    async deletePost() {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
        try {
          await this.postsStore.deletePost(this.$route.params.id)
          this.$router.push('/')
          alert('Article supprimé avec succès !')
        } catch (error) {
          this.error = 'Erreur lors de la suppression de l\'article'
        }
      }
    }
  }
}
</script>

<style scoped>
.edit-post {
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 2rem 1rem;
}

.header {
  max-width: 1000px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.header-text h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.2;
}

.header-text p {
  margin: 0.25rem 0 0;
  color: #64748b;
  font-size: 0.875rem;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.loading-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.loading-spinner {
  margin-bottom: 1rem;
}

.loading-card p {
  margin: 0;
  font-size: 1.125rem;
  color: #64748b;
  font-weight: 500;
}

.post-form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-header h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
}

.form-header p {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.label-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.required {
  color: #ef4444;
}

.form-control {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

.form-control:focus {
  outline: none;
  border-color: #f093fb;
  box-shadow: 0 0 0 4px rgba(240, 147, 251, 0.1);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.form-control::placeholder {
  color: #9ca3af;
}

.textarea {
  resize: vertical;
  min-height: 200px;
  line-height: 1.6;
  font-family: inherit;
}

.character-count {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
  text-align: right;
}

.image-preview {
  margin-top: 1rem;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-preview img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 140px;
  justify-content: center;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(240, 147, 251, 0.5);
}

.btn-danger {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #374151;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary:hover {
  background: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-outline {
  background: transparent;
  color: #6b7280;
  border: 2px solid #d1d5db;
}

.btn-outline:hover {
  background: rgba(107, 114, 128, 0.1);
  border-color: #9ca3af;
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  border: 1px solid #fca5a5;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .edit-post {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 1.5rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .post-form {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    justify-content: center;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .header-text h1 {
    font-size: 1.5rem;
  }

  .form-header h2 {
    font-size: 1.25rem;
  }

  .post-form {
    padding: 1rem;
  }

  .loading-card {
    padding: 3rem 1.5rem;
  }
}
</style>
