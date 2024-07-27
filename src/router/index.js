import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllTaskboardsView from '@/views/AllTaskboardsView.vue'
import BoardView from '@/views/BoardView.vue'
import CardDetailView from '@/views/CardDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // Landing page
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView // All boards
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView // All boards
  },
  {
    path: '/boards',
    name: 'boards',
    component: AllTaskboardsView // All boards
  },
  {
    path: '/board/:id',
    name: 'board',
    component: BoardView, 
    props: true
  },
  {
    path: '/b/:id',
    name: 'cardDetail',
    component: CardDetailView,
    props: { board: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
