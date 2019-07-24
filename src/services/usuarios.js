import { http } from './config'

export default {

	listar:() => {
		return http.get('usuarios')
	},
	
	salvar:(usuario) => {
		return http.post('usuario', usuario)
	},
	
	atualizar:(usuario) => {
		return http.put('usuario', usuario)
	},
	
	apagar:(usuario) => {
		return http.delete('usuario', { data: usuario })
	}
	
}