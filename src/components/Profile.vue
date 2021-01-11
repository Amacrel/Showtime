<template>
<div class="container mt-5">
    <div class="row">
        <div class="col-12 col-md-6 mx-auto">
            <div class="card profileCard">
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 col-lg-8 col-md-6">
                            <h3 class="mb-0 text-truncated"> {{ authuser.username }}</h3>
                            <p class="lead">{{ authuser.email }}</p>

                            <div v-if="authuser.admin">
                                <p> <span class="badge badge-danger tags">admin</span>
                                </p>
                            </div>
                            <div v-else>
                                <p> <span class="badge badge-info tags">user</span>
                                </p>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4 col-md-6 text-center mb-5">
                            <img class="rounded" src="../assets/user.svg" width=100 height=100 alt="">
                            <br>

                        </div>

                                <div>
                                  <b-button v-b-toggle.collapse-1 variant="primary">My Booked shows</b-button>
                                </div>

                            <div class="col-6 col-lg-6" v-if="authuser.admin">
                                    <a class="btn btn-outline-danger" href='dashboardAdmin.php'><span class="fa fa-user"></span> Admin Dashboard</a>

                            </div>

                        <!--/col-->
                    </div>
                    <!--/row-->
                </div>
                <!--/card-block-->
            </div>
        </div>
    </div>
        <b-collapse id="collapse-1" class="mt-2">
          <div class="container text-right">
            <div v-for="show in shows" :key="show._id">
              <div v-if="(authuser.booked_shows.includes(show._id))">
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
                      <img src="../assets/tickets.png" height="30px" alt=""> Tickets left : {{ show.tickets }}
                  </b-card-text>
                </b-card>
              </div>
            </div>
          </div>
        </b-collapse>
</div>

</template>

<script>
import axios from 'axios'
import { server } from '../helper'
export default {
  data () {
    return {
      authuser: '',
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
  },
  mounted () {
    this.authuser = JSON.parse(localStorage.getItem('connectedUser'))
    console.log(this.authuser)
  }
}
</script>

<style>

</style>
