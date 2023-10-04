import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutPage.vue')
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: () => import('../views/BookmarksPage.vue')
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: () => import('../views/MovieDetailPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token

  if (isAuthenticated && (to.path === '/login' || to.path === '/register')){
    next({name: 'Home'})
  } else {
    next()
  }
})

export default router
