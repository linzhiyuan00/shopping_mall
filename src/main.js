import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入ui
import iview from 'iview'
import 'iview/dist/styles/iview.css'

// 引入home组件的全局less
import '@/common/homeCommon.less'


import {instance,instance_formdata, axios, clearRequest} from './common/http';

// 添加响应拦截器(当响应回复回登陆页时跳转)
instance.interceptors.response.use(function (response) {
  // 是否返回登陆页
  let origin = window.location.origin;
  if (response.data.code == '201') {
    if(window.location.href.includes('53kf')){
      window.location.href =
      "https://usermanagement.53kf.com/#/?url=" + 'https://callcenter.53kf.com/#/home/WillAudit';
    }else{
      window.location.href =
      "https://usermanagement.71baomu.com/#/?url=" + 'https://callcenter.71baomu.com/#/home/WillAudit';
    }
   
    return new Promise(() => {})// 不进入请求返回层，防止弹出提示
  }

  return response
}, function (error) {
  if (error.message === 'canel-request') return new Promise(() => {})
  return Promise.reject(error)
})
instance_formdata.interceptors.response.use(function (response) {
  // 是否返回登陆页
  let origin = window.location.origin;
  if (response.data.code == '201') {
    if(window.location.href.includes('53kf')){
      window.location.href =
      "https://usermanagement.53kf.com/#/?url=" + 'https://callcenter.53kf.com/#/home/WillAudit';
    }else{
      window.location.href =
      "https://usermanagement.71baomu.com/#/?url=" + 'https://callcenter.71baomu.com/#/home/WillAudit';
    }
   
    return new Promise(() => {})// 不进入请求返回层，防止弹出提示
  }

  return response
}, function (error) {
  if (error.message === 'canel-request') return new Promise(() => {})
  return Promise.reject(error)
})

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})

Vue.prototype.$http = instance
Vue.prototype.$http_formdata = instance_formdata
Vue.config.productionTip = false
Vue.use(iview)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
