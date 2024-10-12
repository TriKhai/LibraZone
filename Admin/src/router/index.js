import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoardView from '../views/DashBoardView.vue'
import BooksView from '@/views/BooksView.vue'
import UsersView from '@/views/UsersView.vue'
import TableView from '@/views/TableView.vue'
// import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import AuthorView from '@/views/AuthorView.vue'
import PublisherView from '@/views/PublisherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dash-board',
      name: 'dashBoard',
      component: DashBoardView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: LogIn
    },
    {
      path: '/author',
      name: 'author',
      component: AuthorView
    },
    {
      path: '/publisher',
      name: 'publisher',
      component: PublisherView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
