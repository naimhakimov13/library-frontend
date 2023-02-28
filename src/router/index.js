import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login.vue"
import ne from "vue-select";
import re from "vue-select";
import de from "vue-select";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '', redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {layout: 'empty'},
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/Users.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/Category/index.vue'),
      meta: {layout: 'main', auth: true},
      children: [
        {
          path: '',
          component: () => import('@/views/Category/CategoryList.vue'),
        },
        {
          path: 'create',
          component: () => import('@/views/Category/CreateCategory.vue'),
        },
        {
          path: 'edit/:id',
          component: () => import('@/views/Category/CreateCategory.vue'),
        }
      ]
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/views/Books/index.vue'),
      meta: {layout: 'main', auth: true},
      children: [
        {
          path: '',
          component: () => import('@/views/Books/BookList.vue'),
        },
        {
          path: 'create',
          name: 'create-book',
          component: () => import('@/views/Books/CreateBook.vue'),
        },
        {
          path: 'edit/:id',
          name: 'edit-book',
          component: () => import('@/views/Books/CreateBook.vue'),
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requireAuth = to.matched.some(record => record.meta?.auth)
  if (!token && requireAuth) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default router
