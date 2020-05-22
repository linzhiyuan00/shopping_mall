<template>
  <div class="topbar">
    <div class="logo">
      <img class="logo_img" src="../assets/img/logo.png" alt />
    </div>
    <div class="classify">
      <router-link class="classifyshop" to="/Home/index" :class="route_active == 0 ? 'active' :''">首页</router-link>
      <router-link class="classifyshop" to="/Home/Phone" :class="route_active == 1 ? 'active' :''">手机</router-link>
      <router-link class="classifyshop" to="/Home/Flat" :class="route_active == 2 ? 'active' :''">平板</router-link>
      <router-link class="classifyshop" to="/Home/NoteBook" :class="route_active == 3 ? 'active' :''">笔记本</router-link>
      <router-link class="classifyshop" to="/Home/Parts" :class="route_active == 4 ? 'active' :''">配件</router-link>
    </div>
    <div class="tologin" v-if="login == false">
      <router-link class="classifyshop" to="/Home/Login">登录</router-link>
    </div>
    <div class="userinfo" v-else>
      <Menu mode="horizontal" theme="light" active-name="1">
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-contact" />{{user_type == 'user' ? '用户' :user_type == 'store' ? '商家' :'管理员'}}
          </template>
          <MenuItem name="1">
            <router-link class="classifyshop" to="/Home/UserInfo">个人信息</router-link>
          </MenuItem>
          <MenuItem name="2" v-show="user_type == 'user'">
            <router-link class="classifyshop"  to="/Home/Cart">购物车</router-link>
          </MenuItem>
          <!-- <MenuItem name="3" v-show="admin == true">
            <router-link class="classifyshop" to="/Home/AddProduct">管理员添加商品</router-link>
          </MenuItem> -->
          <MenuItem name="4" v-show="user_type == 'admin'">
            <router-link class="classifyshop" to="/Home/Usermanage">用户管理</router-link>
          </MenuItem>
          <MenuItem name="5" v-show="user_type == 'admin'">
            <router-link class="classifyshop" to="/Home/Adminmanage">管理员管理</router-link>
          </MenuItem>
          <MenuItem name="6" v-show="user_type == 'admin'">
            <router-link class="classifyshop" to="/Home/Storemanage">商家管理</router-link>
          </MenuItem>
          <MenuItem name="7" v-show="user_type == 'store' || user_type == 'admin'">
            <router-link class="classifyshop" to="/Home/Goodsmanage">商品管理</router-link>
          </MenuItem>
          <MenuItem name="8" >
            <router-link class="classifyshop" to="/Home/Ordermanage">订单管理</router-link>
          </MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class="cart" @click="toCart" v-show="login == true && user_type == 'user'">
      <img style="width:40px;height:40px" src="../assets/img/cart.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: false,
      user_type:'user',
      route_active:0
    };
  },
  methods: {
    toCart(){
      this.$router.replace({name: 'Cart'})
    }
  },
  watch: {
    "$store.state.Login": function(data) {
      if (data == true) {
        this.login = true;
      } else {
        this.login = false;
      }
    },
    "$store.state.usertype": function(data) {
      this.user_type = data;
    },
    "$route":function(data){
      if(data.name == 'index'){
        this.route_active = 0;
      }else if(data.name == 'Phone'){
        this.route_active = 1;
      }else if(data.name == 'Flat'){
        this.route_active = 2;
      }else if(data.name == 'NoteBook'){
        this.route_active = 3;
      }else if(data.name == 'Parts'){
        this.route_active = 4;
      }
    }
  },
  mounted() {
    if (this.$store.state.Login == true) {
      this.login = true;
    } else {
      this.login = false;
    }
    this.user_type = this.$store.state.usertype;
  }
};
</script>
<style lang="less">
.topbar {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #f9f9f9;
  border-bottom: 2px solid #e5e5e5;
  &:after {
    content: "";
    display: table;
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
  }
  .logo {
    width: 180px;
    height: 80px;
    float: left;
    padding: 10px;
    .logo_img {
      width: 180px;
      height: 60px;
    }
  }
  .classify {
    float: left;
    width: calc(100vw - 500px);
    height: 80px;
    padding: 20px 0 0 0;
    .classifyshop {
      flex: 1;
      display: inline-block;
      font-size: 30px;
      line-height: 40px;
      height: 58px;
      padding: 0 20px;
      &:hover {
        border-bottom: 2px #337ab7 solid;
      }
      &.active {
        border-bottom: 2px #337ab7 solid;
      }
    }
  }
  .tologin {
    cursor: pointer;
    font-size: 20px;
    width: 100px;
    height: 80px;
    padding: 25px 0;
    margin-right: 20px;
    line-height: 26px;
    font-weight: 400;
    color: #8195e4;
    float: right;
  }
  .cart {
    cursor: pointer;
    font-size: 20px;
    width: 40px;
    height: 80px;
    padding: 20px 0;
    margin-right: 20px;
    line-height: 26px;
    font-weight: 400;
    color: #8195e4;
    float: right;
  }
  .userinfo {
    position: relative;
    bottom: 10px;
    cursor: pointer;
    font-size: 20px;
    width: 150px;
    height: 80px;
    padding: 25px 0;
    margin-right: 20px;
    line-height: 26px;
    font-weight: 400;
    color: #8195e4;
    float: right;
  }
}
</style>