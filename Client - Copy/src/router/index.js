import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/library',
    alias: '/',
    name: 'library',
    component: () => import('../views/LibraryView.vue'),
    // meta: { requiresAuth: true }
    children: [
      {
        path: '/library/home',
        name: 'home',
        alias: '/library',
        component: () => import('../views/library/HomeView.vue')
      },
      {
        path: '/library/about-us',
        name: 'about-us',
        component: () => import('../views/library/AboutView.vue')
      },
      {
        path: '/library/books',
        name: 'books',
        component: () => import('../views/library/ListBooksView.vue')
      },
      {
        path: '/library/my-book',
        name: 'my-book',
        component: () => import('../views/library/MyBooksView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
