<template>
  <div class="home col-5 mx-auto py-5 mt-5">
    <h1 class="text-center">Register</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="name">Username:</label>
          <input
            type="text"
            v-model="form.username"
            class="form-control"
            id="name"
          />
          <span class="text-success" v-if="(this.form.username.length < 4)">
            Enter at least 4 characters
          </span>
          <span class="text-danger" v-if="errors.username">
            {{ errors.username[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="email"
          />
          <span class="text-success" v-if="ValidateEmail(this.form.email) === false">
            Enter a valid email address
          </span>
          <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="password"
          />
          <span class="text-success" v-if="(this.form.password.length < 8)">
            Enter a valid password (min 8 characters)
          </span>
          <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            v-model="form.password_confirmation"
            class="form-control"
            id="password_confirmation"
          />
          <span class="text-danger" v-if="errors.password_confirmation">
            {{ errors.password_confirmation[0] }}
          </span>
        </div>
        <button
          type="submit"
          @click.prevent="register(form)"
          class="btn btn-primary btn-block"
        >
          Register
        </button>
        <br>
        <div>
          <router-link to="/login">
            <input type="button"
                   class="btn btn-info btn-block"
                   value="Already registered ?"/>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { server } from '@/helper'

export default {
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: []
    }
  },
  methods: {
    register (data) {
      axios.post(`${server.baseURL}/user`, {
        username: data.username,
        email: data.email,
        password: data.password
      })
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        })
    },
    ValidateEmail (mail) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
      }
      return (false)
    }
  }
}
</script>
