const axios = require('axios')
const qs = require('qs')
const settings = require('~/modules/settings.js')
const { apiUrl } = settings

axios.create({
  crossorigin: true,
  baseURL: apiUrl,
  timeout: 1000,
  headers: {
    crossorigin: true
  }
})
const containersObj = {
  nuxt: function () {
    if (typeof $nuxt !== 'undefined') {
      return $nuxt
    } else {
      return null
    }
  },
  get: function (id) {
    if (typeof id === 'undefined') {
      return axios.get(`${apiUrl}/containers`, {
        crossdomain: true
      })
    }
    return axios.get(`${apiUrl}/containers/${id}`)
  },
  create: function () {
    return axios.get(`${apiUrl}/containers/create`)
  },
  stop: function (id) {
    return axios.get(`${apiUrl}/containers/${id}/stop`)
  },
  start: function (id) {
    return axios.get(`${apiUrl}/containers/${id}/start`)
  },
  logs: function (id) {
    return axios.get(`${apiUrl}/containers/${id}/logs`)
  },
  stats: function (id) {
    return axios.get(`${apiUrl}/containers/${id}/stats`)
  },
  delete: function (id) {
    return axios.get(`${apiUrl}/containers/${id}/delete`)
  }
}

module.exports = containersObj
