<template>
  <nav class="navbar navbar-expand navbar-dark">
    <div class="container">
      <div class="navbar-header">
          <b-navbar variant="faded" type="light">
            <b-navbar-brand :to="{ name: 'Home' }">
              <img src="../assets/immortals.png" height="30px" alt="LogoRiftSensei">
            </b-navbar-brand>
          </b-navbar>
      </div>
      <ul class="nav navbar-nav">
        <router-link
          class="nav-item nav-link"
          :to="{ name: 'Home' }"
        >
          Shows
        </router-link>
        <router-link
          class="nav-item nav-link"
          v-if="isLoggedIn"
          :to="{ name: 'Profile' }"
        >
          Profile
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Login' }"
        >
          Login
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Register' }"
        >
          Register
        </router-link>
        <router-link
          class="nav-item nav-link"
          v-if="authuser.includes('admin') === true && isLoggedIn"
          :to="{ name: 'EditConcert' }"
        >
          Edit Concert
        </router-link>
         <router-link
          class="nav-item nav-link"
          v-if="authuser.includes('admin') === true && isLoggedIn"
          :to="{ name: 'CreateConcert' }"
        >
          Create Concert
        </router-link>
        <a
          class="nav-item nav-link"
          v-if="isLoggedIn"
          @click.prevent="logout"
          href="#"
        >Logout</a
        >
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      isLoggedIn: false,
      authuser: ''
    }
  },
  mounted () {
    this.authuser = localStorage.getItem('connectedUser')
  },
  created () {
    this.isLoggedIn = !!localStorage.getItem('connected')
  },
  methods: {
    logout () {
      localStorage.removeItem('connected')
      this.isLoggedIn = false
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
.router-link-exact-active.nav-item {
  color: #00bbd1 !important;
  border-bottom: solid #00bbd1 2px;
  font-weight: 600;
}
.navbar {
  background-color: #1c2834;
}
</style>
