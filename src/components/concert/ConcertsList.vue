<template>
  <div class="container-fluid">
      <h1>List of Shows</h1>
    <div class="container">
      <div class="row">
        <div class="text-left px-5 mx-5 col-3">
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="All">All</b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Johnny Hallyday">Johnny Halliday</b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Frank Sinatra">Frank Sinatra</b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Edith Piaf">Edith Piaf</b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="2Pac">2Pac</b-form-radio>
            <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="Elvis Presley">Elvis Presley</b-form-radio>
        </div>
        <div class="text-left px-5 mx-5 col-3">
            <b-form-radio v-model="selectedGenre" :aria-describedby="ariaDescribedby" name="some-radiosbis" value="All">All</b-form-radio>
            <b-form-radio v-model="selectedGenre" :aria-describedby="ariaDescribedby" name="some-radiosbis" value="Rock">Rock</b-form-radio>
            <b-form-radio v-model="selectedGenre" :aria-describedby="ariaDescribedby" name="some-radiosbis" value="Jazz">Jazz</b-form-radio>
            <b-form-radio v-model="selectedGenre" :aria-describedby="ariaDescribedby" name="some-radiosbis" value="Chanson Française">Chanson Française</b-form-radio>
            <b-form-radio v-model="selectedGenre" :aria-describedby="ariaDescribedby" name="some-radiosbis" value="Rap">Rap</b-form-radio>
        </div>
        <div class= "col-3 my-auto">
                  <b-dropdown id="dropdown-1" text="Sort By" variant="outline-info mt-1" block menu-class="w-100">
                    <b-dropdown-item @click="fetchShowsByDate('dateAsc')">Nearest Show Date</b-dropdown-item>
                    <b-dropdown-item @click="fetchShowsByDate('dateDesc')">Furthest Show Date</b-dropdown-item>
                  </b-dropdown>
        </div>
      </div>
      <div v-if="shows.length === 0">
        <h2> No shows can be found at the moment </h2>
      </div>
    </div>
      <div class="container text-right">
        <div v-for="show in shows" :key="show._id">
          <div v-if="(show.artiste === selected || selected === 'All') && (show.genre === selectedGenre || selectedGenre === 'All')">
            <b-card
              class="m-3 px-5"
              overlay
              :img-src="getImg(show.artiste)"
              img-alt="Card Image"
              text-variant="white"
              :title="show.artiste"
            >
              <b-card-text>
                <h5 class="primary-text">
                  <b>"{{show.titre}}"</b>
                </h5>
                  Genre : {{ show.genre }}
                  <br> <br>
                  <h6> <i class="fas fa-calendar-day mx-1"> </i> {{ show.date }} <br> <i class="fas fa-map-marker-alt mx-1"></i> {{ show.lieu }} </h6>
                  <br>
                  <img src="../../assets/tickets.png" height="30px" alt=""> Tickets left : {{ show.tickets }}
                  <button class="btn btn-primary ml-3" @click="bookIt({'id' : show._id, 'tickets' : show.tickets})"> Book it </button>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </div>
    <div>

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
      shows: [],
      selected: 'All',
      selectedGenre: 'All'
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
    fetchShowsByDate (type) {
      axios.get(`${server.baseURL}/show/${type}`)
        .then(data => (this.shows = data.data))
    },
    deleteCustomer (id) {
      axios.delete(`${server.baseURL}/show/${id}`)
        .then(data => {
          console.log(data)
          window.location.reload()
        })
    },
    bookIt (data) {
      axios.put(`${server.baseURL}/show/update?concertID=${data.id}`,
        {
          tickets: data.tickets - 1
        }
      ).then(data => {
        this.fetchShows()
      })
    },
    getImg (artist) {
      if (artist === 'Johnny Hallyday') {
        return 'https://i.ibb.co/0mdM4mk/Johnny-Hallyday.png'
      } else if (artist === 'Frank Sinatra') {
        return 'https://i.ibb.co/XzPwD0g/Frank-Sinatra.png'
      } else if (artist === 'Elvis Presley') {
        return 'https://i.ibb.co/pZwYs63/Elvis-Presley.png'
      } else if (artist === 'Edith Piaf') {
        return 'https://i.ibb.co/rZzPQgm/Edith-Piaf.png'
      } else if (artist === '2Pac') {
        return 'https://i.ibb.co/jrjSR61/2PAC.png'
      }
    }
  }
}
</script>

<style scoped>

</style>
