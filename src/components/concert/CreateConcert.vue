<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2> Post a new Show </h2>
      <form id="create-show-form" @submit.prevent="createShow">
        <div class="form-group col-md-12">
          <label for="title"> Title </label>
          <input type="text" id="title" v-model="titre" name="title" class="form-control" placeholder="Enter the title of the show">
        </div>
        <div class="form-group col-md-12">
          <label for="artist"> Band / Artist </label>
          <input type="text" id="artist" v-model="artiste" name="artist" class="form-control" placeholder="Enter the name of the artist(s)">
        </div>
        <div class="form-group col-md-12">
          <label for="venue"> Venue </label>
          <input type="text" id="venue" v-model="lieu" name="venue" class="form-control" placeholder="Enter the name of the venue">
        </div>
        <div class="form-group col-md-12">
          <label for="date"> Date of the show </label>
          <input type="text" id="date" v-model="date" name="date" class="form-control" placeholder="Enter the date of the show">
        </div>
        <div class="form-group col-md-12">
          <label for="genre"> Music's Style </label>
          <input type="text" id="genre" v-model="genre" name="genre" class="form-control" placeholder="Enter the music genre">
        </div>
        <div class="form-group col-md-12">
          <label for="tickets"> Number of tickets </label>
          <input type="text" id="tickets" v-model="tickets" name="tickets" class="form-control" placeholder="Enter the number of tickets">
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
import router from '../../router'
import { server } from '../../helper'

export default {
  data () {
    return {
      titre: '',
      artiste: '',
      lieu: '',
      date: '',
      genre: '',
      tickets: ''
    }
  },
  methods: {
    createShow () {
      const showData = {
        titre: this.titre,
        artiste: this.artiste,
        lieu: this.lieu,
        date: this.date,
        genre: this.genre,
        tickets: this.tickets
      }
      this.__submitToServer(showData)
    },
    __submitToServer (data) {
      axios.post(`${server.baseURL}/show`, data)
        .then(data => {
          router.push({ name: 'ConcertsList' })
          console.log(data)
        })
    }
  }
}
</script>

<style scoped>

</style>
