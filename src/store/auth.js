import axios from 'axios'
import router from '../router/index'

export default{
    namespaced: true,
    state: {
        user: null,
    },

    getters: {
      authenticated(state){
        return state.user
    },
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_USER (state, data){
            state.user = data 
          },     
    },
    actions: {
     async signIn({ commit }, credrentials){
          let username = credrentials.username
          let password = credrentials.password
          const BASE_ENDPOINT = "http://localhost:3001/user?"
          const REQ_ENDPOINT = `${BASE_ENDPOINT}LoginName=${username}&password=${password}`
          try{
            const res = await axios.get(REQ_ENDPOINT);
            if( res.status == 200){
                  console.log(res.data)
                  router.push('/product')
                  commit('SET_USER', res.data)
              }  
              } catch (err){
                console.log(err)
              }   
      },
      logout({commit}){
        commit('SET_USER', 'null')
        router.push('/')
      }
    }
  
}