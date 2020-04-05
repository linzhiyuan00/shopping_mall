import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Login:true,
    isadmin:true
  },
  mutations: {
    LOGIN_STATE(state,login){
      state.Login = login;
    },
    ADMIN_STATE(state,admin){
      state.isadmin = admin;
    }
  },
  actions: {
    update_loginstate(context,login){
      context.commit('LOGIN_STATE',login);
    },
    update_isadmin(context,admin){
      context.commit('ADMIN_STATE',admin);
    }
  },
  modules: {}
});
