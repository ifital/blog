<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block mb-1">Email</label>
        <input v-model="form.email" type="email" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Mot de passe</label>
        <input v-model="form.password" type="password" class="w-full border px-3 py-2 rounded" required />
      </div>
      <div v-if="hasErrors" class="mb-4 text-red-500">
        <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
      </div>
      <button :disabled="loading" type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>
    <router-link to="/register" class="text-blue-600 hover:underline mt-4 inline-block">
      Pas encore inscrit ? Créez un compte
    </router-link>
     </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const { login, errors, loading, hasErrors } = useAuth()
const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  const success = await login(form)
  if (success) {
    router.push('/home')
  }
}
</script>
