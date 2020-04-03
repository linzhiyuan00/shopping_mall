import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    willaduitsum:0,
    Login:false
  },
  mutations: {
    WILLADUITSUM(state,sum){
      state.willaduitsum = sum;
    },
    LOGIN_STATE(state,login){
      state.Login = login;
    }
  },
  actions: {
    update_willaduitsum(context,sum){
      context.commit('WILLADUITSUM',sum);
    },
    update_loginstate(context,login){
      context.commit('LOGIN_STATE',login);
    }
  },
  modules: {}
});
