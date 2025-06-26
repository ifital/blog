<template>
  <div class="home">
    <!-- HEADER -->
    <div class="header">
      <div class="header-content">
        <div class="header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="header-text">
          <h1>Mon Blog</h1>
          <p>Découvrez mes derniers articles et réflexions</p>
        </div>
      </div>
      <router-link to="/create" class="btn btn-success">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Créer un article
      </router-link>
      <button @click="logout" class="btn btn-outline ml-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 4H9V20H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Déconnexion
      </button>
    </div>
          <input type="text" class="search-input" v-model='postsStore.searchQuery' placeholder='cherche un post' @input='searchPosts'>
    <!-- CONTENT -->
    <div class="content-wrapper">
      <!-- Loading -->
      <div v-if="postsStore.loading" class="loading-card">
        <div class="loading-spinner">
          <svg class="spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12A9 9 0 1 1 12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <p>Chargement des articles...</p>
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="postsStore.error" class="error-card">
        <div class="error-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Oups ! Une erreur s'est produite</h3>
        <p>{{ postsStore.error }}</p>
        <button @click="retryLoading" class="btn btn-outline">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="23,4 23,10 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 15A9 9 0 1 1 5.64 5.64L23 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Réessayer
        </button>
      </div>

      <!-- Empty -->
      <div v-else-if="postsStore.posts.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Aucun article pour le moment</h3>
        <p>Commencez par créer votre premier article pour partager vos idées avec le monde.</p>
        <router-link to="/create" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Créer mon premier article
        </router-link>
      </div>

      <!-- Posts List -->
      <div v-else class="posts-container">
        <div class="posts-header">
          <h2>Articles récents</h2>
          <div class="posts-count">
            {{ postsStore.total }} article{{ postsStore.total > 1 ? 's' : '' }}
          </div>
        </div>
        <div class="posts-list">
          <PostCard
            v-for="post in postsStore.posts"
            :key="post.id"
            :post="post"
            class="post-card-animated"
          />
        </div>

        <!-- PAGINATION -->
        <div class="pagination-controls mt-8 flex justify-center items-center gap-4">
          <button
            class="btn btn-outline"
            :disabled="postsStore.currentPage === 1"
            @click="changePage(postsStore.currentPage - 1)"
          >
            ← Précédent
          </button>

          <span class="text-gray-700 font-semibold">
            Page {{ postsStore.currentPage }} sur {{ postsStore.lastPage }}
          </span>

          <button
            class="btn btn-outline"
            :disabled="postsStore.currentPage === postsStore.lastPage"
            @click="changePage(postsStore.currentPage + 1)"
          >
            Suivant →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts'
import { useAuthStore } from '@/stores/auth'
import PostCard from '@/components/PostCard.vue'

export default {
  name: 'HomeView',
  components: {
    PostCard
  },
  setup() {
    const postsStore = usePostsStore()
    const authStore = useAuthStore()
    return { postsStore, authStore }
  },
  async mounted() {
    await this.postsStore.fetchPosts()
  },
  methods: {
    async retryLoading() {
      await this.postsStore.fetchPosts()
    },
    logout() {
      this.authStore.logout()
    },
    async changePage(page) {
      if (page >= 1 && page <= this.postsStore.lastPage) {
        await this.postsStore.fetchPosts(page)
      }
    },
    async searchPosts() {
      await this.postsStore.fetchPosts(1, this.postsStore.searchQuery);
    }
  }
}
</script>


<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.header {
  max-width: 1200px;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
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
  max-width: 1200px;
  margin: 0 auto;
}

.loading-card, .error-card, .empty-state {
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
  margin: 0 0 1rem;
  font-size: 1.125rem;
  color: #64748b;
  font-weight: 500;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1);
  }
}

.error-card {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  border: 1px solid #fca5a5;
}

.error-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1.5rem;
}

.error-card h3 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #dc2626;
}

.error-card p {
  margin: 0 0 2rem;
  color: #7f1d1d;
  font-size: 1rem;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  margin-left: 1rem;
  min-width: 250px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #667eea;
  outline: none;
}


.empty-state {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
}

.empty-icon {
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.empty-state h3 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
}

.empty-state p {
  margin: 0 0 2rem;
  color: #6b7280;
  font-size: 1rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.posts-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);


}
.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.posts-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
}

.posts-count {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.post-card-animated {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.post-card-animated:nth-child(1) { animation-delay: 0.1s; }
.post-card-animated:nth-child(2) { animation-delay: 0.2s; }
.post-card-animated:nth-child(3) { animation-delay: 0.3s; }
.post-card-animated:nth-child(4) { animation-delay: 0.4s; }
.post-card-animated:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
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

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */

@media (max-width: 1024px) {
  .posts-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .posts-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home {
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

  .posts-container {
    padding: 1.5rem;
  }

  .posts-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .loading-card, .error-card, .empty-state {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-text h1 {
    font-size: 1.5rem;
  }

  .posts-header h2 {
    font-size: 1.25rem;
  }

  .posts-container {
    padding: 1rem;
  }
}
</style>
