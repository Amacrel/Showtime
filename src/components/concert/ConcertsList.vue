<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>List of Shows</h1>
      <div v-if="shows.length === 0">
        <h2> No shows can be found at the moment </h2>
      </div>
    </div>

    <div class="">
      <table class="table table-bordered">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Artist</th>
          <th scope="col">Venue</th>
          <th scope="col">Date</th>
          <th scope="col">Genre</th>
          <th scope="col">Tickets</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="show in shows" :key="show._id">
          <td>{{ show.titre }}</td>
          <td>{{ show.artiste }}</td>
          <td>{{ show.lieu }}</td>
          <td>{{ show.date }}</td>
          <td>{{ show.genre }}</td>
          <td>{{ show.tickets }}</td>
          <td>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group" style="margin-bottom: 20px;">
                <router-link :to="{name: 'EditConcert', params: {id: show._id}}" class="btn btn-sm btn-outline-secondary">Edit the show </router-link>
                <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteCustomer(show._id)">Delete this show</button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <router-link :to="{name: 'CreateConcert'}">Post a show</router-link>
  </div>
</template>

<script>
import axios from 'axios'
import { server } from '../../helper'

export default {
  data () {
    return {
      shows: []
    }
  },
  created () {
    this.fetchShows()
  },
  methods: {
    fetchShows () {
      axios.get(`${server.baseURL}/show`)
        .then(data => (this.shows = data.data))
    },
    deleteCustomer (id) {
      axios.delete(`${server.baseURL}/show/${id}`)
        .then(data => {
          console.log(data)
          window.location.reload()
        })
    }
  }
}
</script>

<style scoped>

</style>
