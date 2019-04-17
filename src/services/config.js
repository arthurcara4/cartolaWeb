import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import SubRota from '../components/SubRota.vue'
import Equipes from '../Equipes.vue'

export const http = axios.create({
	baseURL: 'http://localhost:8080/cartola'
})

Vue.use(Router)

const newLocal = 'SubRota';
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        { path: ':name', name: newLocal, component: SubRota },
      ]
    },
    {
      path: '/equipes',
      name: 'Equipes',
      component: Equipes
    },
    {
      path: '/jogadores',
      name: 'jogadores',
      component: Equipes
    }
  ]
})
