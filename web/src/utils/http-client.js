import axios from 'axios'
import Vue from 'vue'

const config = {
  baseURL: '/api',
  headers: {
    "Content-Type": 'application/json'
  }
}

const httpClient = axios.create(config)

Vue.prototype.$http = httpClient