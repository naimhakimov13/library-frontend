import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/views/Login.vue"

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
      meta: {layout: 'empty', auth: false},
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
      component: () => import('@/views/Users/index.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/users/create',
      name: 'create',
      component: () => import('@/views/Users/CreateUser.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/users/edit/:id',
      name: 'edit',
      component: () => import('@/views/Users/CreateUser.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/category',
      component: () => import('@/views/Category/index.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/category/create',
      component: () => import('@/views/Category/CreateCategory.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/category/edit/:id',
      component: () => import('@/views/Category/CreateCategory.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/views/Books/index.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/books/create',
      name: 'create-book',
      component: () => import('@/views/Books/CreateBook.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: '/books/edit/:id',
      name: 'edit-book',
      component: () => import('@/views/Books/CreateBook.vue'),
      meta: {layout: 'main', auth: true},
    },
    {
      path: "/:catchAll(.*)", redirect: '/dashboard'
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
