import { http } from './config'

export default {

	listar:() => {
		return http.get('jogos')
	},
    
    listarPorRodada:(rodada) => {
		return http.get('rodada/' + rodada.id + '/jogos')
    },
    
	salvar:(jogo) => {
		return http.post('jogo', jogo)
	},
	
	atualizar:(jogo) => {
		return http.put('jogo', jogo)
	},
	
	apagar:(jogo) => {
		return http.delete('jogo', { data: jogo })
	}
	
}