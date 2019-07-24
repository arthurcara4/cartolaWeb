import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import SubRota from '../components/SubRota.vue'
import Equipes from '../Equipes.vue'
import Usuarios from '../Usuarios.vue'
import Jogadores from '../Jogadores.vue'
import Tabela from '../Tabela.vue'
import JogosRodada from '../JogosRodada.vue'
import vSelect from 'vue-select'

export const http = axios.create({
	baseURL: 'http://localhost:8080/cartola'
})

Vue.use(Router)
Vue.component('v-select', vSelect)

const newLocal = 'SubRota';
const jogos = 'JogosRodada';

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
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios
    },
    {
      path: '/jogadores',
      name: 'jogadores',
      component: Jogadores
    },
    {
      path: '/tabela',
      name: 'tabela',
      component: Tabela,
      children: [
        { path: ':name', name: jogos, component: JogosRodada },
      ]
    }
  ]
})

