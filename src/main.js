import Vue from 'vue'
import Index from './Index'
import router from '../src/services/config.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(Index)
})


