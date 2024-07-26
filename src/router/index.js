import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllTaskboardsView from '@/views/AllTaskboardsView.vue'
import BoardView from '@/views/BoardView.vue'
import CardDetailView from '@/views/Card.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView // Landing page
  },
  {
    path: '/boards',
    name: 'boards',
    component: AllTaskboardsView // All boards
  },
  {
    path: '/board/:id',
    name: 'board',
    component: BoardView // Selected board
  },
  {
    path: '/:id/c/:id',
    name: 'cardDetail',
    component: CardDetailView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
