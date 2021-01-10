<template>
  <h1>Hello {{ authuser }}</h1>

</template>

<script>
export default {
  data () {
    return {
      authuser: ''
    }
  },
  mounted () {
    this.authuser = localStorage.getItem('connectedUser')
  }
}
</script>

<style>

</style>
