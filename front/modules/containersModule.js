const axios = require('axios')
const qs = require('qs')
const settings = require('~/modules/settings.js')
const { apiUrl } = settings

var JSON = require('babel-runtime/core-js/json/stringify')

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
    if (typeof id == 'undefined') return axios.get(`${apiUrl}/containers`, {
      crossdomain: true
    })
    return axios.get(`${apiUrl}/containers/${id}`)
  },
  stop: function () {
    
  }

}

module.exports = containersObj