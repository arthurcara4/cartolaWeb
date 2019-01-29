<template>
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
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>
	
<script>
	import Equipe from './services/equipes'
	
	export default{
	
		data(){
			return{
				equipe: {
					nome: '',
					id: ''
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
			}
		}
	}
	</script>