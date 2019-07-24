<template id="jogosRodada">
  <div id="app">

    <nav>
      <div class="nav-wrapper grey darken-1">
        <a href="#" class="brand-logo center" @click="showHideRodada">Rodada {{ rodada.id }}</a>
      </div>
    </nav>

    <div class="container" v-show="rodada.status">
		
		<ul>
			<li v-for="(erro, index) of errors" :key="index">
				campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
			</li>
		</ul>
<!--
      <form @submit.prevent="salvar">

          <label>Mandante</label>
          <input type="text" placeholder="Mandante" v-model="jogo.equipeMandante">
          <label>Visitante</label>
          <input type="text" placeholder="Visitante" v-model="jogo.equipeVisitante">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>
-->	  <div v-show="mostra">
      <table >
        <thead>
          <tr>
						<th>DATA - {{ formatDataRodada(rodada.dataRodada) }}</th>
            <th>JOGOS</th>
						<th></th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="jogo of jogos" :key="jogo.id">
						{{ indisponibiliza(jogo.equipeMandante) }}
						{{ indisponibiliza(jogo.equipeVisitante) }}
            <td v-if="!jogoEmEdicao(jogo)" width="20%">{{ jogo.equipeMandante.nome }}</td>
			<td v-if="!jogoEmEdicao(jogo)" width="5px"><input type="text" id="golsMan"></td>
			<td v-if="!jogoEmEdicao(jogo)" >X</td>
			<td v-if="!jogoEmEdicao(jogo)" width="5px"><input type="text" id="golsVis"></td>
			<td v-if="!jogoEmEdicao(jogo)" width="20%"> {{ jogo.equipeVisitante.nome }} </td>
            <td v-if="!jogoEmEdicao(jogo)"></td>
            <td v-if="!jogoEmEdicao(jogo)">
              <button @click="editar(jogo)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(jogo)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
		</tr>
	</tbody>
	</table>
	<table>
		<tbody>
		<tr>
			<td>
				<form @submit.prevent="salvarJogo">
						<td>
							<v-select id="mandante" :options="montaCombo()" :selected-value="jogo.equipeMandante" placeholder="Mandante" label="nome" v-model="jogo.equipeMandante"></v-select>
						<td>
							X
						</td>
						<td>
							<v-select id="visitante" :options="montaCombo()" placeholder="Visitante" label="nome" v-model="jogo.equipeVisitante"></v-select>
							<!--<combo-equipes :options="equipes" label="nome"></combo-equipes>-->
						</td>
						<td>
							<button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
						</td>
				</form>
			</td>
		</tr>
		<tr>
			<td>
				<button class="btn-small green darken-1"><i class="material-icons">add_circle_outline</i></button>
			</td>
		</tr>
        </tbody>
      </table>
	  </div>
    </div>
  </div>
</template>
	
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
	
<script>
	
	import Jogo from './services/jogos'
	import Equipes from './services/equipes'
	import ComboEquipes from './components/ComboEquipes.vue'
	
	
	
	export default{

		components: {
			ComboEquipes
		}, 
	
		data(){
			return{
				mostra: '',
				exibeJogo: 'show',
				jogo: {
          id: '',
					equipeMandante: '',
          equipeVisitante: '',
          pontuacaoMandante: '',
          pontuacaoVisitante: '',
          rodada: '',
					show: ''
				},
				jogos: [],
				errors: [],
				equipes: [],
				exibe: '',
				equipesIndisponiveis: [],
				equipesDisponiveis: [],
				jogosEmEdicao: [],
				rodada: {
										id: this.$attrs.rodada[0].id,
										dataRodada: this.$attrs.rodada[0].dataRodada,
										status: 'false' 
				},
			}
		},
		created(){
			this.equipes = this.$attrs.equipes[0];
		},
		mounted(){
			var rodada = this.$attrs.rodada[0].id;
			
			
			Jogo.listarPorRodada(this.$attrs.rodada[0]).then(resposta => {
				this.jogos = resposta.data;

				/*this.equipesIndisponiveis = [];
				for(var i=0; i<this.jogos.length; i++){
					let jogo = this.jogos[i];
					this.equipesIndisponiveis.push(jogo.equipeMandante);
					this.equipesIndisponiveis.push(jogo.equipeVisitante);
				}
				this.equipesDisponiveis = [];
				for(var j=0; j<this.equipes.length; j++){
					var eq = this.equipes[j];
					if(!this.equipesIndisponiveis.includes(eq)){
						this.equipesDisponiveis.push(eq);
					}
				}*/
				/*let equipesDisp = this.equipes;
				for(var i=0; i<this.jogos.length; i++){
					let jogoRodada = this.jogos[i];
					let mandante = jogoRodada.equipeMandante;
					let visitante = jogoRodada.equipeVisitante;
					if(this.equipesDisp.includes(mandante)){
						this.equipesDisp.splice(equipesDisp.indexOf(mandante),1);
					}
					if(this.equipesDisp.includes(visitante)){
						this.equipesDisp.splice(equipesDisp.indexOf(visitante),1);
					}
				}*/
			})
		},

		methods:{

			jogoEmEdicao(jogo){
				if(this.jogosEmEdicao.includes(jogo)){
					return 'true'
				}else{
					return ''
				}
			},

			montaCombo(){
				
				var ind = this.equipesIndisponiveis;
				var disp = this.$attrs.equipes[0];
				this.equipesDisponiveis = [];
				var arrIndId = [];
				for(var b=0; b<ind.length; b++){
						arrIndId.push(ind[b].id)
					}
				for(var a = 0; a<disp.length; a++){
					var dispid = disp[a].id;
					if(!arrIndId.includes(dispid)){
						this.equipesDisponiveis.push(disp[a]);
					}
				}
				if(this.jogo.equipeMandante != null && this.jogo.equipeMandante.id != ''){
					this.equipesDisponiveis.push(this.jogo.equipeMandante);
				}
				if(this.jogo.equipeVisitante != null && this.jogo.equipeVisitante.id != ''){
					this.equipesDisponiveis.push(this.jogo.equipeVisitante);
				}
				return this.equipesDisponiveis;
			},

			indisponibiliza(time){
				if(!this.equipesIndisponiveis.includes(time)){
					this.equipesIndisponiveis.push(time);
				}
			},
			showHideRodada(){
				if(this.mostra){
					this.mostra = ''
				}else{
					this.mostra = 'show';
				}
			},

			formatDataRodada(dtRodada){
				var dtRodada = String(dtRodada);
				return dtRodada.substring(8,10) + '/' + dtRodada.substring(5,7) + '/' + dtRodada.substring(0,4);
			},
	
			listar(){
				Rodada.listar().then(resposta => {
					this.rodadas = resposta.data
				})
			},
			listarPorRodada(){
				Jogo.listarPorRodada(this.rodada).then(resposta => {
					this.jogos = resposta.data
				})
      },
		
			salvarJogo(){
				
				if(!this.jogo.id){
					this.jogo.rodada = this.rodada;
					Jogo.salvar(this.jogo).then(resposta => {
						this.jogo = {}
						alert('Salvo com sucesso!')
						
						this.listarPorRodada()
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}else{
					Jogo.atualizar(this.jogo).then(resposta => {
						this.jogo = {}
						alert('Atualizado com sucesso!')
						this.listarPorRodada()
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}
				
			},
			
			editar(jogo){
				this.jogosEmEdicao = [];
				this.jogosEmEdicao.push(jogo);
				this.jogo = jogo
			},
	
			remover(jogo){	
				if(confirm('Deseja excluir a equipe?')){
					Jogo.apagar(jogo).then(resposta => {
						this.listarPorRodada()
						this.errors = {}
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}				
			}
		}
	}
	</script>