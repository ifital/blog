<template>
  <div class="post-card">
    <div v-if="post.image" class="post-image">
      <img :src="post.image" :alt="post.title" />
    </div>
    <div class="post-content">
      <h3 class="post-title">{{ post.title }}</h3>
      <p class="post-meta">Par {{ post.author }} • {{ formatDate(post.created_at) }}</p>
      <p class="post-excerpt">{{ truncateContent(post.content, 150) }}</p>
      <div class="post-actions">
        <router-link :to="`/post/${post.id}`" class="btn btn-primary">
          Lire la suite
        </router-link>
          <span class="comments-count" v-if="Array.isArray(post.comments)">
          {{ post.comments.length }} commentaire(s)
        </span>
        <span class="comments-count" v-else>
          0 commentaire
        </span>
      </div>
      <div class="post-actions mt-2">
        <button class="btn btn-danger" @click="deletePost">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts'

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const postsStore = usePostsStore()

    const deletePost = async () => {
      if (confirm('Es-tu sûr de vouloir supprimer ce post ?')) {
        try {
          await postsStore.deletePost(props.post.id)
        } catch (error) {
          console.error('Erreur lors de la suppression :', error)
        }
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('fr-FR')
    }

    const truncateContent = (content, length) => {
      return content.length > length
        ? content.substring(0, length) + '...'
        : content
    }

    return {
      deletePost,
      formatDate,
      truncateContent
    }
  }
}
</script>

<style scoped>
.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.post-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-content {
  padding: 20px;
}

.post-title {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.post-meta {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.post-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #b02a37;
}

.comments-count {
  color: #666;
  font-size: 0.9rem;
}
</style>
