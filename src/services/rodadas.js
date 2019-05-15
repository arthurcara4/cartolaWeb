import { http } from './config'

export default {

	listar:() => {
		return http.get('rodadas')
	},
	
	salvar:(rodada) => {
		return http.post('rodada', rodada)
	},
	
	atualizar:(rodada) => {
		return http.put('rodada', rodada)
	},
	
	apagar:(rodada) => {
		debugger;
		return http.delete('rodada', { data: rodada })
	}
	
}