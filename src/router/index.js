import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Login from "../views/Login.vue";
import index from "../views/index.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    hasChildren: true,
    redirect: {
      name: 'index'
    },
    children: [
      {
        path:'/Home/index',
        name: "index",
        component: index,
      },
      {
        path:'/Home/Cart',
        name: "Cart",
        component: Cart,
      },
      {
        path:'/Home/Login',
        name: "Login",
        component: Login,
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
