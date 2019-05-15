<template id="jogadores">
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cartola Futmesa - Jogadores - {{ this.$route.params.equipe.nome }}</a>
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
          <input type="text" placeholder="Nome" v-model="jogador.nome">
          <label>Preço</label>
          <input type="text" placeholder="Preço" v-model="jogador.preco">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>PREÇO</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="jogador of jogadores" :key="jogador.id">

            <td>{{ jogador.nome }}</td>
            <td>{{ jogador.preco }}</td>
            <td>
              <button @click="editar(jogador)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(jogador)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>


  </div>
  
</template>
	
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
	
<script>
	
	import Jogador from './services/jogadores'
	
	
	export default{
	
		data(){
			return{
				jogador: {
					nome: '',
                    id: '',
                    preco: '',
                    equipe: this.$route.params.equipe,
					show: 'false'
				},
				jogadores: [],
				errors: []
			}
		},
		mounted(){
            debugger;
			Jogador.listarPorEquipe(this.$route.params.equipe).then(resposta => {
				this.jogadores = resposta.data;
			})
		},
	
		methods:{
            listarPorEquipe(){
                debugger;
				Jogador.listarPorEquipe(this.$route.params.equipe).then(resposta => {
					this.jogadores = resposta.data
				})
            },
		
			salvar(){
                debugger
				if(!this.jogador.id){
          this.jogador.equipe = this.$route.params.equipe;
					Jogador.salvar(this.jogador).then(resposta => {
						this.jogador = {}
						alert('Salvo com sucesso!')
						this.listarPorEquipe(this.jogador.equipe)
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}else{
					Jogador.atualizar(this.jogador).then(resposta => {
						this.jogador = {}
						alert('Atualizado com sucesso!')
						this.listarPorEquipe(this.$route.params.equipe)
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}
				
			},
			
			editar(jogador){
				this.jogador = jogador
			},
	
			remover(jogador){
	
				if(confirm('Deseja excluir o jogador?')){
					Jogador.apagar(jogador).then(resposta => {
						this.listarPorEquipe(this.$route.params.equipe)
						this.errors = {}
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}				
			}
		}
	}
	</script>