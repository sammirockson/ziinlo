import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllTaskboardsView from '@/views/AllTaskboardsView.vue'
import BoardView from '@/views/BoardView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUp.vue'
import CardPopupView from '@/components/CardPopupView.vue'
import InvitationView from '@/views/InvitationView.vue'
import InvoiceView from '@/components/InvoiceCreator.vue'
import LandingPageView from '@/views/LandingPageView.vue'
import PricingView from '@/views/PricingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    name: 'landing',
    component: LandingPageView
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: PricingView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/boards',
    name: 'boards',
    component: AllTaskboardsView
  },
  {
    path: '/b/:boardId',
    name: 'board',
    component: BoardView, 
    props: true, 
    children: [
      {
        path: "/b/:boardId/c/:cardId",
        component: CardPopupView
      }
    ]
  }, 
  {
    path: '/invitation/b/:boardId/i/:inviter',
    name: 'invitation',
    component: InvitationView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
