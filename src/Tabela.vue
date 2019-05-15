<template id="tabela">
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cartola Futmesa - Tabela</a>
      </div>
    </nav>

    <div class="container">
		
		<ul>
			<li v-for="(erro, index) of errors" :key="index">
				campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
			</li>
		</ul>
      <form @submit.prevent="salvar">

          <label>Data</label>
          <input type="text" placeholder="Data" v-model="rodada.dataRodada">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>RODADAS</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="rodada of rodadas" :key="rodada.id">

            <td style=width:100%> 
							
							<!--<router-link :to="{name: 'JogosRodada', params: { rodada: rodada }}"  tag="button" class="btn waves-effect waves-light">  {{ formatDataRodada(rodada.dataRodada) }} <i class="material-icons">send</i></router-link>-->
							<jogos-rodada :rodada="[rodada]" :equipes="[equipes]"></jogos-rodada>
						</td>
					</tr>
					

        </tbody>
      
      </table>


    </div>

  </div>
</template>
	
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
	
<script>
	
	import Rodada from './services/rodadas'
	import JogosRodada from './JogosRodada.vue'
	import Equipes from './services/equipes'
	
	function formatDataRodada(dtRodada){
				var dtRodada = String(dtRodada);
				return dtRodada.substring(8,10) + '/' + dtRodada.substring(5,7) + '/' + dtRodada.substring(0,4);
			}
	export default{
		
		components: {
			JogosRodada
		},
	
		data(){
			return{
				equipes: [],
				rodada: {
					id: '',
					dataRodada: '',
					show: 'false'
				},
				rodadas: [],
				errors: []
			}
		},
		mounted(){
			Rodada.listar().then(resposta => {
				this.rodadas = resposta.data;
			}),
			Equipes.listar().then(resposta => {
					this.equipes = resposta.data
				})
		},
	
		methods:{
	
			listar(){
				Rodada.listar().then(resposta => {
					this.rodadas = resposta.data
				})
			},

			listarEquipes(){
				Equipes.listar().then(resposta => {
					this.equipes = resposta.data
				})
			},

			formatDataRodada(dtRodada){
				var dtRodada = String(dtRodada);
				return dtRodada.substring(8,10) + '/' + dtRodada.substring(5,7) + '/' + dtRodada.substring(0,4);
			}
		
/*			salvar(){
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
			}*/
		}
	}
	</script>