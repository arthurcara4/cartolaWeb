import { http } from './config'

export default {

	listar:() => {
		return http.get('jogadores')
	},
    
    listarPorEquipe:(equipe) => {
		return http.get('equipe/' + equipe.id + '/jogadores')
    },
    
	salvar:(jogador) => {
		return http.post('jogador', jogador)
	},
	
	atualizar:(jogador) => {
		return http.put('jogador', jogador)
	},
	
	apagar:(jogador) => {
		return http.delete('jogador', { data: jogador })
	}
	
}