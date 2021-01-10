<template>
  <div id="app">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: { Navbar },
  name: 'App'
}

</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.btn:hover{
    transform: scale(1.02);
    box-shadow:0px 11px 14px -11px rgba(0,0,0,0.5);
}

.btn-primary{
    border-color:  #00bbd1!important;
    background-color: #00bbd1!important;
}

.bg-light {
  background-color: #293a4b !important;
}

.card {
  background-color: transparent !important;
  border: none !important;
}

.primary-text {
  color: #00bbd1 !important ;
}

.primary-bg {
  background-color: #00bbd1 !important;
}

</style>
