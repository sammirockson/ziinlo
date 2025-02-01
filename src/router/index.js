import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllTaskboardsView from '@/views/AllBoardsView.vue'
import BoardView from '@/views/BoardView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUp.vue'
import CardPopupView from '@/components/CardPopupView.vue'
import InvitationView from '@/views/InvitationView.vue'
import LandingPageView from '@/views/LandingPageView.vue'

import PricingView from '@/views/PricingView.vue'
import FeaturesView from '@/components/FeaturesView.vue'
import TemplatesView from '@/components/TemplatesView.vue'
import AboutView from '@/components/AboutView.vue'
import PaymentView from '@/components/PaymentView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import ChatView from '@/views/ChatView.vue'
import NotFoundView from '@/components/NotFoundView.vue'
import TermView from '@/components/TermView.vue'

// Future features
import InvoiceView from '@/components/InvoiceCreator.vue'
import DrawingBoardView from '@/views/DrawingBoardView.vue'
import WhiteBoardView from '@/views/WhiteBoardView.vue'

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
    path: '/login/:subscription?',
    name: 'login',
    props: true, 
    component: LoginView
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: AttendanceView
  },
  {
    path: '/whiteboard',
    name: 'whiteboard',
    component: WhiteBoardView
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermView
  },
  // {
  //   path: '/invoice',
  //   name: 'invoice',
  //   component: InvoiceView
  // },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView
  },
  {
    path: '/signup/:subscription?',
    name: 'signup',
    props: true, 
    component: SignUpView
  },
  {
    path: '/boards',
    name: 'boards',
    component: AllTaskboardsView
  },
  {
    path: '/pricing',
    name: 'pricing',
    component: PricingView
  },
  {
    path: '/features',
    name: 'features',
    component: FeaturesView
  },
  {
    path: '/templates',
    name: 'templates',
    component: TemplatesView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/pay',
    name: 'pay',
    component: PaymentView
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
  { 
    path: '/:catchAll(.*)',
    name: "NotFound",  
    component: NotFoundView 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
