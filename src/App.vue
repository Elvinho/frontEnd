<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Usuarios Front</a>
      </div>
    </nav>

    <div class="container">
      
      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="usuario.nome" required>
          <label>Email</label>
          <input type="text" placeholder="email" v-model="usuario.email">
          <label>Senha</label>
          <input type="password" placeholder="senha" v-model="usuario.password" required>
           <label>Fone</label>
          <input type="text" placeholder="fone" v-model="usuario.phone" required>
           <label>Imagem</label>
          <input type="text" placeholder="img" v-model="usuario.img" required>
          <br>
          <br>
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>SENHA</th>
            <th>PHONE</th>
            <th>IMAGEM</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="usuario of usuarios" :key="usuario.id">

            <td>{{usuario.nome}}</td>
            <td>{{usuario.email}}</td>
            <td>{{usuario.password}}</td>
            <td>{{usuario.phone}}</td>
            <td>{{usuario.img}}</td>
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

<script>

  import Usuario from './services/usuario'

  export default {

    data(){
      return {
        usuario:{
          id:'',
          nome:'',
          email:'',
          password:'',
          phone:''
        },
        usuarios:[]
      }
    },
    mounted(){
      this.listar()
     
    },
    
    methods:{

     listar(){
          Usuario.listar().then(resposta =>{
        this.usuarios = resposta.data
      })
     },
      salvar(){
       if(!this.usuario.id)
       {
          Usuario.salvar(this.usuario).then(resposta =>{
            this.usuario = {}
            alert('Salvo com sucesso!')
            console.log(resposta)
            this.listar()
          }).catch(e =>{
            console.log(e.response)
          })
       }
       else
       {
         Usuario.atualizar(this.usuario).then(resposta =>{
            this.usuario = {}
            alert('Atualizado com sucesso!')
            console.log(resposta)
            this.listar()
          }).catch(e =>{
            console.log(e.response)
          })
       }
        
      },

      editar(usuario){
        this.usuario = usuario
      },

      remover(usuario){
       if( confirm('tem certeza que desja remove?'))
        {
            Usuario.apagar(usuario).then(resposta => {
            console.log(resposta)
            alert('Deletado com sucesso!')
            this.listar()
          }).catch(e =>{
              console.log(e.response)
          })
        }
      }
    }
  }
</script>

<style>

</style>
