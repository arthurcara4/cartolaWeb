import { http } from './config'

export default {

	listar:() => {
		return http.get('equipes')
	},
	
	salvar:(equipe) => {
		return http.post('equipe', equipe)
	},
	
	atualizar:(equipe) => {
		return http.put('equipe', equipe)
	},
	
	apagar:(equipe) => {
		return http.delete('equipe', { data: equipe })
	}
	
}