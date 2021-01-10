import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateConcert from '@/components/concert/CreateConcert'
import EditConcert from '@/components/concert/EditConcert'
import ConcertsList from '@/components/concert/ConcertsList'
import Profile from '@/components/Profile'
import Login from '@/components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ConcertsList
  },
  {
    path: '/create',
    name: 'CreateConcert',
    component: CreateConcert
  },
  {
    path: '/edit/:id',
    name: 'EditConcert',
    component: EditConcert
  },
  {
    path: '/concerts',
    name: 'ConcertsList',
    component: ConcertsList
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
