import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateConcert from '@/components/concert/CreateConcert'
import EditConcert from '@/components/concert/EditConcert'
import ConcertsList from '@/components/concert/ConcertsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
