import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Login:false,
    usertype:'user',
    user:{}
  },
  mutations: {
    LOGIN_STATE(state,login){
      state.Login = login;
    },
    USER_TYPE(state,usertype){
      state.usertype = usertype;
    },
    USER(state,user){
      state.user = user;
    },
  },
  actions: {
    update_loginstate(context,login){
      context.commit('LOGIN_STATE',login);
    },
    update_usertype(context,usertype){
      context.commit('USER_TYPE',usertype);
    },
    update_user(context,user){
      context.commit('USER',user);
    }
  },
  modules: {}
});
