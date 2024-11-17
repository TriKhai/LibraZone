import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'vue-cookies'
import { useUserStore } from '@/stores/user.store'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue'),
    children: [
      {
        path: '/',
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
    meta: { requiresAuth: true, requireAdmin: true },
    redirect: '/dashboard/users',
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
      },
      {
        path: '/dashboard/borrow',
        name: 'borrow-book',
        component: () => import('../views/management/TrackbookView.vue')
      }
    ]
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('../views/LibraryView.vue'),
    meta: { requiresAuth: true },
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
        name: 'bookDetail',
        component: () => import('../views/library/BookDetailView.vue')
      },
      {
        path: '/library/my-book',
        name: 'my-book',
        component: () => import('../views/library/MyBooksView.vue')
      },
      {
        path: '/library/profile',
        name: 'profile',
        component: () => import('../views/library/ProfileView.vue'),
        children: [
          {
            path: '/library/profile/user',
            name: 'profile-user',
            alias: '/library/profile',
            component: () => import('../components/profile/ProfileUser.vue')
          },
          {
            path: '/library/profile/history',
            name: 'profile-history',
            component: () => import('../components/profile/HistoryBorrow.vue')
          },
          {
            path: '/library/profile/review',
            name: 'profile-review',
            component: () => import('../components/profile/ReviewProfile.vue')
          },
          {
            path: '/library/profile/change-password',
            name: 'change-password',
            component: () => import('../components/profile/ChangePassword.vue')
          }
        ]
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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requireLogin = to.matched.some((record) => record.meta.requiresAuth)
  const requireAdmin = to.matched.some((record) => record.meta.requiresAdmin)
  if (requireLogin) {
    const accessToken = Cookies.get('accessToken')
    console.log(requireLogin)
    if (!accessToken) {
      next({ name: 'login' })
    } else {
      // If authenticated, check if admin access is required
      if (requireAdmin) {
        // If admin access is required, check if user is admin
        const isAdmin = await userStore.isAdmin()
        console.log(isAdmin)
        // If user is admin, allow access
        if (isAdmin) {
          next()
        } else {
          // If not admin, redirect to error view
          next({ name: 'NotFound' })
        }
      } else {
        // If admin access is not required, allow access
        next()
      }
    }
  } else {
    next()
  }
})

export default router
