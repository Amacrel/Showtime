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
          :to="{ name: 'Profile' }"
        >
          Profile
        </router-link>
        <router-link
          class="nav-item nav-link"
          :to="{ name: 'Home' }"
        >
          Login
        </router-link>
        <router-link
          class="nav-item nav-link"
          :to="{ name: 'EditConcert' }"
        >
          Edit Concert
        </router-link>
         <router-link
          class="nav-item nav-link"
          :to="{ name: 'CreateConcert' }"
        >
          Create Concert
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>

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
