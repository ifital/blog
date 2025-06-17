import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreatePostView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditPostView.vue')
    }
  ]
})

export default router
