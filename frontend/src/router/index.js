import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import('../views/PostView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreatePostView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditPostView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 🔒 Middleware global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Vérifie l'état auth s'il est inconnu
  if (!authStore.user && !authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  // Route protégée et utilisateur non connecté
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  // Route réservée aux invités mais utilisateur connecté
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'home' })
  }

  next()
})

export default router
