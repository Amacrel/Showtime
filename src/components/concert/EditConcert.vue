<template>
  <div>
    <h4 class="text-center mt-20">
      <small>
        <button class="btn btn-success" v-on:click="navigate()"> All Shows </button>
      </small>
    </h4>
    <div class="col-md-12 form-wrapper">
      <h2> Edit a show </h2>
      {{this.show}}
      <form id="edit-show-form" @submit.prevent="editShow">
        <div class="form-group col-md-12">
          <label for="title"> Title </label>
          <input type="text" id="title" v-model="show.titre" name="title" class="form-control" placeholder="">
        </div>
        <div class="form-group col-md-12">
          <label for="artist"> Band / Artist  </label>
          <input type="text" id="artist" v-model="show.artiste" name="title" class="form-control" placeholder="">
        </div>
        <div class="form-group col-md-12">
          <label for="venue"> Venue </label>
          <input type="text" id="venue" v-model="show.lieu" name="venue" class="form-control" placeholder="">
        </div>
        <div class="form-group col-md-12">
          <label for="date"> Date </label>
          <input type="text" id="date" v-model="show.date" name="date" class="form-control" placeholder="">
        </div>
        <div class="form-group col-md-12">
          <label for="genre"> Music's Style </label>
          <input type="text" id="genre" v-model="show.genre" name="genre" class="form-control" placeholder="">
        </div>
        <div class="form-group col-md-12">
          <label for="tickets"> Number of tickets </label>
          <input type="text" id="tickets" v-model="show.tickets" name="tickets" class="form-control" placeholder="">
        </div>
        <div class="form-group col-md-4 pull-right">
          <button class="btn btn-success" type="submit"> Validate </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { server } from '../../helper.js'
import router from '../../router'

export default {
  data () {
    return {
      id: 0,
      show: {}
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getShow()
  },
  methods: {
    editShow () {
      const showData = {
        titre: this.show.titre,
        artiste: this.show.artiste,
        lieu: this.show.lieu,
        date: this.show.date,
        genre: this.show.genre,
        tickets: this.show.tickets
      }
      axios.put(`${server.baseURL}/show/update?concertID=${this.id}`,
        showData
      ).then(data => {
        router.push({ name: 'ConcertsList' })
        console.log(data)
      })
    },
    getShow () {
      axios.get(`${server.baseURL}/show/${this.id}`)
        .then(data => (this.show = data.data))
    },
    navigate () {
      router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
