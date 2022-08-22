import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//实例化
const store = new Vuex.Store({
    //state
    state: {
        token:'asdf6a9sdfa9dsfa9dsfa9d'
    },
    //actions
    actions: {
        aa() {
          //  commit('AA',2222)
         }
    },
    //mutations
    mutations: {
        
      //  AA() { }
    },
    //getters
    getters:{},
    //modules
    modules:{}
})


//抛出vuex

export default store