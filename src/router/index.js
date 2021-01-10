import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateConcert from '@/components/concert/CreateConcert'
import EditConcert from '@/components/concert/EditConcert'
import ConcertsList from '@/components/concert/ConcertsList'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'

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
    component: CreateConcert,
    meta: { authOnly: true }
  },
  {
    path: '/edit/:id',
    name: 'EditConcert',
    component: EditConcert,
    meta: { authOnly: true }
  },
  {
    path: '/concerts',
    name: 'ConcertsList',
    component: ConcertsList
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { authOnly: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guestOnly: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isLoggedIn () {
  return localStorage.getItem('connected')
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      },
      alert('Please login first'))
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: '/profile',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
