import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue'),
    alias: '/',
    children: [
      {
        path: '/auth/login',
        alias: '/auth',
        name: 'login',
        component: () => import('../components/auth/LogIn.vue')
      },
      {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('../components/auth/SignUp.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '/dashboard/users',
        name: 'user-table',
        component: () => import('../views/management/UsersView.vue')
      },
      {
        path: '/dashboard/books',
        name: 'book-table',
        component: () => import('../views/management/BooksView.vue')
      },
      {
        path: '/dashboard/authors',
        name: 'author-table',
        component: () => import('../views/management/AuthorView.vue')
      },
      {
        path: '/dashboard/publishers',
        name: 'publisher-table',
        component: () => import('../views/management/PublisherView.vue')
      }
    ]
  },
  {
    path: '/library',
    alias: '',
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
        path: '/library/books/:id',
        name: 'bookDeital',
        component: () => import('../views/library/BookDetailView.vue')
      },
      {
        path: '/library/my-book',
        name: 'my-book',
        component: () => import('../views/library/MyBooksView.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
