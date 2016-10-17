import Vue from 'vue'
import Horizon from '../../index'
import App from './App.vue'

import 'bulma/css/bulma.css'

Vue.use(Horizon, {
  host: '127.0.0.1:8181',
  models: ['messages']
})

new Vue({
  el: '#app',
  render: h => h(App)
})
