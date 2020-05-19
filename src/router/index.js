import Vue from "vue";
import VueRouter from "vue-router";
// 功能
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Login from "../views/Login.vue";
import UserInfo from "../views/UserInfo.vue";
import Usermanage from "../views/Usermanage.vue";
import Adminmanage from "../views/Adminmanage.vue";
import Storemanage from "../views/Storemanage.vue";
import Goodsmanage from "../views/Goodsmanage.vue";
import Ordermanage from "../views/Ordermanage.vue";

// 分类
import index from "../views/index.vue";
import Phone from "../views/Phone.vue";
import Flat from "../views/Flat.vue";
import NoteBook from "../views/NoteBook.vue";
import Parts from "../views/Parts.vue";
import AddProduct from "../views/AddProduct.vue";



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
        path:'/Home/Login',
        name: "Login",
        component: Login,
      },
      {
        path:'/Home/Phone',
        name: "Phone",
        component: Phone,
      },
      {
        path:'/Home/index',
        name: "index",
        component: index,
      },
      {
        path:'/Home/Flat',
        name: "Flat",
        component: Flat,
      },
      {
        path:'/Home/NoteBook',
        name: "NoteBook",
        component: NoteBook,
      },
      {
        path:'/Home/Cart',
        name: "Cart",
        component: Cart,
      },
      {
        path:'/Home/Parts',
        name: "Parts",
        component: Parts,
      },
      {
        path:'/Home/UserInfo',
        name: "UserInfo",
        component: UserInfo,
      },
      {
        path:'/Home/Usermanage',
        name: "Usermanage",
        component: Usermanage,
      },
      {
        path:'/Home/Adminmanage',
        name: "Adminmanage",
        component: Adminmanage,
      },
      {
        path:'/Home/Storemanage',
        name: "Storemanage",
        component: Storemanage,
      },
      {
        path:'/Home/Ordermanage',
        name: "Ordermanage",
        component: Ordermanage,
      },
      {
        path:'/Home/Goodsmanage',
        name: "Goodsmanage",
        component: Goodsmanage,
      },
      {
        path:'/Home/AddProduct',
        name: "AddProduct",
        component: AddProduct,
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
