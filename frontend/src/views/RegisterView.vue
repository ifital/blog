<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Inscription</h2>
    <form @submit.prevent="handleRegister" novalidate>
      <div class="mb-4">
        <label class="block mb-1" for="name">Nom</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="w-full border px-3 py-2 rounded"
          required
          autocomplete="name"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="w-full border px-3 py-2 rounded"
          required
          autocomplete="email"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="password">Mot de passe</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          class="w-full border px-3 py-2 rounded"
          required
          autocomplete="new-password"
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1" for="password_confirmation">Confirmer le mot de passe</label>
        <input
          id="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          class="w-full border px-3 py-2 rounded"
          required
          autocomplete="new-password"
        />
      </div>

      <!-- Affichage erreurs côté client -->
      <div v-if="passwordMismatch" class="mb-4 text-red-600">
        Les mots de passe ne correspondent pas.
      </div>

      <!-- Affichage erreurs côté serveur -->
      <div v-if="hasErrors" class="mb-4 text-red-600">
        <p v-for="(messages, field) in errors" :key="field">
          <span v-for="(msg, idx) in messages" :key="idx">{{ msg }}</span>
        </p>
      </div>

      <button
        :disabled="loading || passwordMismatch"
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {{ loading ? 'Inscription...' : 'S’inscrire' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { register, errors, loading, hasErrors } = useAuth()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const passwordMismatch = computed(() => form.password !== form.password_confirmation)

const handleRegister = async () => {
  if (passwordMismatch.value) {
    return
  }
  const result = await register(form)
  if (result.success) {
    router.push('/')
  }
}
</script>
