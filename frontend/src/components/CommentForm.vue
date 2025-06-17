<template>
  <div class="comment-form">
    <h4>Ajouter un commentaire</h4>
    <form @submit.prevent="submitComment">
      <div class="form-group">
        <label for="author">Nom :</label>
        <input
          type="text"
          id="author"
          v-model="form.author"
          required
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="content">Commentaire :</label>
        <textarea
          id="content"
          v-model="form.content"
          required
          class="form-control"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Envoi...' : 'Publier' }}
      </button>
    </form>
  </div>
</template>

<script>
import { useCommentsStore } from '@/stores/comments'

export default {
  name: 'CommentForm',
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: {
        author: '',
        content: ''
      },
      loading: false
    }
  },
  setup() {
    const commentsStore = useCommentsStore()
    return { commentsStore }
  },
  methods: {
    async submitComment() {
      this.loading = true
      try {
        const commentData = {
          post_id: this.postId,
          author: this.form.author,
          content: this.form.content
        }

        await this.commentsStore.addComment(commentData)
        this.form.author = ''
        this.form.content = ''
        this.$emit('comment-added')
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.comment-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
