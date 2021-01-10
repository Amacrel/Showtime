<template>
  <div class="container">
    <b-form-group
      id="fieldset-1"
      label="Enter your username"
      label-for="input-1"
      valid-feedback="Thank you!"
      :invalid-feedback="invalidFeedback"
      :state="state"
    >
      <b-form-input id="input-1" v-model="form.username" :state="state" trim></b-form-input>
    </b-form-group>
    <b-form-group
      id="fieldset-2"
      type="password"
      label="Enter your password"
      label-for="input-2"
      valid-feedback="Thank you!"
      :invalid-feedback="invalidFeedback2"
      :state="state2"
    >
      <b-form-input id="input-2" v-model="form.password" :state="state2" trim></b-form-input>
    </b-form-group>
    <div v-if="errors.length > 0">
        <b-alert variant="danger" show>{{ errors }}</b-alert>
    </div>
    <button @click="login(form)"> Login </button>

  </div>
</template>

<script>
import axios from 'axios'
import { server } from '../helper'
export default {
  computed: {
    state () {
      return this.form.username.length >= 4
    },
    invalidFeedback () {
      if (this.form.username.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    },
    state2 () {
      return this.form.password.length >= 8
    },
    invalidFeedback2 () {
      if (this.form.password.length > 0) {
        return 'Enter at least 8 characters.'
      }
      return 'Please enter something.'
    }

  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      errors: []
    }
  },
  methods: {
    login (data) {
      axios.post(`${server.baseURL}/auth/login`, {
        username: data.username,
        password: data.password
      })
        .then(
          data => (localStorage.setItem('token', data.data.access_token))
        )
        .then(() => {
          this.getProfile()
        }
        )
        .catch(error => {
          if (error.response.status === 401) {
            this.errors = 'Password does not match'
          } else {
            this.errors = error.response.data.message
          }
        })
    },
    getProfile () {
      axios.get(`${server.baseURL}/profile`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(data => (localStorage.setItem('connectedUser', JSON.stringify(data.data))))
        .then(localStorage.setItem('connected', 'True'))
        .then(this.$router.push('/Profile'))
        .then(location.reload())
    }

  }
}
</script>
