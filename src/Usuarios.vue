<template id="usuarios">
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Cartola Futmesa - Cadastro de Usuarios</a>
      </div>
    </nav>

    <div class="container">
		
		<ul>
			<li v-for="(erro, index) of errors" :key="index">
				campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
			</li>
		</ul>
      <form @submit.prevent="salvar">

          <label>Login</label>
          <input type="text" placeholder="Login" v-model="usuario.login">
          <label>Time</label>
          <input type="text" placeholder="Time" v-model="usuario.nome_time">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>USUARIO</th>
            <th>TIME</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="usuario of usuarios" :key="usuario.id">

            <td>{{ usuario.login }}</td>
            <td>{{ usuario.nome_time }}</td>
            <td>
              <button @click="editar(usuario)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(usuario)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>


    </div>

  </div>
</template>
	
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
	
<script>
	
	import Usuario from './services/usuarios'
	
	
	export default{
	
		
	
		components: {
		},
	
		data(){
			return{
				usuario: {
                    id: '',
                    login: '',
                    nome_time: '',
					show: 'false'
				},
				usuarios: [],
				errors: []
			}
		},
		mounted(){
			Usuario.listar().then(resposta => {
				this.usuarios = resposta.data;
			})
		},
	
		methods:{
	
			listar(){
				Usuario.listar().then(resposta => {
					this.usuarios = resposta.data
				})
			},
		
			salvar(){
                debugger;
				if(!this.usuario.id){
					Usuario.salvar(this.usuario).then(resposta => {
						this.usuario = {}
						alert('Salvo com sucesso!')
						this.listar()
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}else{
					Usuario.atualizar(this.usuario).then(resposta => {
						this.usuario = {}
						alert('Atualizado com sucesso!')
						this.listar()
					}).catch(e => {
						this.errors = e.response.data.errors
					})
				}
				
			},
			
			editar(usuario){
				this.usuario = usuario
			},
	
			remover(usuario){
	
				if(confirm('Deseja excluir o usuario?')){
					Usuario.apagar(usuario).then(resposta => {
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