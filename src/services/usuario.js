import {http} from './config'

export default {
    
    listar:()=>{
        return http.get('usuario')
    },

    salvar:(usuario) =>{
        return http.post('usuario',usuario)
    },

    atualizar:(usuario)=>{
        return http.put('usuario/'+usuario.id,usuario)
    },

    apagar:(usuario)=>{
        return http.delete('usuario/'+usuario.id)
    }
}