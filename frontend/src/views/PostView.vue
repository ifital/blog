<template>
  <div class="post-view">
    <div v-if="postsStore.loading" class="loading-card">
      <div class="loading-spinner">
        <svg class="spinner" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12A9 9 0 1 1 12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <p>Chargement de l'article...</p>
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div v-else-if="postsStore.error" class="error-card">
      <div class="error-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <h3>Article introuvable</h3>
      <p>{{ postsStore.error }}</p>
      <router-link to="/" class="btn btn-outline">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Retour à l'accueil
      </router-link>
    </div>

    <div v-else-if="post" class="post-detail">
      <!-- Post Header -->
      <div class="post-header">
        <div class="breadcrumb">
          <router-link to="/" class="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Accueil
          </router-link>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9,18 15,12 9,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Article</span>
        </div>

        <h1 class="post-title">{{ post.title }}</h1>

        <div class="post-meta">
          <div class="author-info">
            <div class="author-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="author-name">{{ post.author }}</span>
          </div>
          <div class="post-date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {{ formatDate(post.created_at) }}
          </div>
        </div>
      </div>

      <!-- Post Image -->
      <div v-if="post.image" class="post-image">
        <img :src="post.image" :alt="post.title" />
        <div class="image-overlay"></div>
      </div>

      <!-- Post Content -->
      <div class="post-content-wrapper">
        <div class="post-content">
          <div class="content-text">{{ post.content }}</div>
        </div>

        <!-- Post Actions -->
        <div class="post-actions">
          <router-link to="/" class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Retour aux articles
          </router-link>
          <router-link :to="`/edit/${post.id}`" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Modifier
          </router-link>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="comments-section">
        <div class="comments-header">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Commentaires
          </h3>
          <div class="comments-count">
            {{ post.comments.length }} commentaire{{ post.comments.length > 1 ? 's' : '' }}
          </div>
        </div>

        <div v-if="post.comments.length > 0" class="comments-list">
          <div
            v-for="(comment, index) in post.comments"
            :key="comment.id"
            class="comment"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="comment-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="comment-body">
              <div class="comment-header">
                <strong class="comment-author">{{ comment.author }}</strong>
                <span class="comment-date">{{ formatDate(comment.created_at) }}</span>
              </div>
              <p class="comment-content">{{ comment.content }}</p>
            </div>
          </div>
        </div>

        <div v-else class="no-comments">
          <div class="no-comments-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 9h8M8 13h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <p>Aucun commentaire pour le moment.</p>
          <span>Soyez le premier à partager votre avis !</span>
        </div>

        <div class="comment-form-wrapper">
          <CommentForm :post-id="post.id" @comment-added="refreshPost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts'
import CommentForm from '@/components/CommentForm.vue'

export default {
  name: 'PostView',
  components: {
    CommentForm
  },
  setup() {
    const postsStore = usePostsStore()
    return { postsStore }
  },
  computed: {
    post() {
      return this.postsStore.currentPost
    }
  },
  async mounted() {
    await this.postsStore.fetchPost(this.$route.params.id)
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    async refreshPost() {
      await this.postsStore.fetchPost(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
.post-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}

.loading-card, .error-card {
  max-width: 600px;
  margin: 0 auto;
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
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
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

.post-detail {
  max-width: 900px;
  margin: 0 auto;
}

.post-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #64748b;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: #764ba2;
}

.post-title {
  margin: 0 0 1.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.author-name {
  font-weight: 600;
  color: #374151;
}

.post-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.post-image {
  position: relative;
  margin-bottom: 2rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.post-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 60%, rgba(0, 0, 0, 0.1));
}

.post-content-wrapper {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.post-content {
  margin-bottom: 2rem;
}

.content-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  white-space: pre-wrap;
}

.post-actions {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
  flex-wrap: wrap;
}

.comments-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.comments-header h3 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
}

.comments-count {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.comments-list {
  margin-bottom: 2rem;
}

.comment {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  flex-shrink: 0;
}

.comment-body {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.comment-author {
  color: #374151;
  font-size: 0.875rem;
}

.comment-date {
  color: #64748b;
  font-size: 0.75rem;
}

.comment-content {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
  font-size: 0.875rem;
}

.no-comments {
  text-align: center;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
}

.no-comments-icon {
  color: #9ca3af;
  margin-bottom: 1rem;
}

.no-comments p {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  color: #6b7280;
  font-weight: 500;
}

.no-comments span {
  color: #9ca3af;
  font-size: 0.875rem;
}

.comment-form-wrapper {
  border-top: 2px solid #e5e7eb;
  padding-top: 2rem;
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

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
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

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .post-view {
    padding: 1rem;
  }

  .post-header, .post-content-wrapper, .comments-section {
    padding: 1.5rem;
  }

  .post-title {
    font-size: 2rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .post-image img {
    height: 250px;
  }

  .post-actions {
    flex-direction: column;
  }

  .comments-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .comment {
    padding: 1rem;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .post-title {
    font-size: 1.75rem;
  }

  .post-header, .post-content-wrapper, .comments-section {
    padding: 1rem;
  }

  .loading-card, .error-card {
    padding: 3rem 1.5rem;
  }
}
</style>
