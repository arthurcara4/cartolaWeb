<template id="equipes">
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cartola Futmesa - Cadastro de Equipes</a>
      </div>
    </nav>

    <div class="container">
		
		<ul>
			<li v-for="(erro, index) of errors" :key="index">
				campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
			</li>
		</ul>
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="equipe.nome">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="equipe of equipes" :key="equipe.id">

            <td>{{ equipe.nome }}</td>
            <td>
              <button @click="editar(equipe)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(equipe)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
							<router-link :to="{name: 'jogadores', params: { equipe: equipe }}"  tag="button" class="waves-effect btn-small green darken-1"><i class="material-icons">person</i></router-link>
            </td>

          </tr>

        </tbody>
      
      </table>
			<router-link :to="{ name: 'HelloWorld' }">HelloWorld</router-link>


    </div>

  </div>
</template>
	
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
	
<script>
	
	import Equipe from './services/equipes'
	import HelloWorld from './components/HelloWorld.vue'
	import Jogadores from './Jogadores.vue'
	
	
	export default{
	
		
	
		components: {
			HelloWorld,
			Jogadores
		},
	
		data(){
			return{
				equipe: {
					nome: '',
					id: '',
					show: 'false'
				},
				equipes: [],
				errors: []
			}
		},
		mounted(){
			Equipe.listar().then(resposta => {
				this.equipes = resposta.data;
			})
		},
	
		methods:{
	
			listar(){
				Equipe.listar().then(resposta => {
					this.equipes = resposta.data
				})
			},
		
			salvar(){
				if(!this.equipe.id){
					Equipe.salvar(this.equipe).then(resposta => {
						this.equipe = {}
						alert('Salvo com sucesso!')
						this.listar()
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}else{
					Equipe.atualizar(this.equipe).then(resposta => {
						this.equipe = {}
						alert('Atualizado com sucesso!')
						this.listar()
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}
				
			},
			
			editar(equipe){
				this.equipe = equipe
			},
	
			remover(equipe){
	
				if(confirm('Deseja excluir a equipe?')){
					Equipe.apagar(equipe).then(resposta => {
						this.listar()
						this.errors = {}
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}				
			}
		}
	}
	</script>