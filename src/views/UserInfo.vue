<template>
  <div class="userinfo">
    <div class="content">
      <div class="view_title">个人信息</div>
      <div class="user" v-show="user_type == 'user'">
        <div class="info_box">用户名：{{userinfo.user_name}}</div>
        <div class="info_box">用户id：{{userinfo.user_id}}</div>
        <div class="info_box">用户手机号：{{userinfo.user_phone}}</div>
        <div class="info_box">用户性别：{{userinfo.user_gender}}</div>
        <div class="info_box">身份：普通用户</div>
      </div>
      <div class="user" v-show="user_type == 'store'">
        <div class="info_box">商家名：{{userinfo.store_name}}</div>
        <div class="info_box">商家id：{{userinfo.store_id}}</div>
        <div class="info_box">商家手机号：{{userinfo.store_phone}}</div>
        <div class="info_box">店铺名：{{userinfo.shop_name}}</div>
        <div class="info_box">身份：商家</div>
      </div>
      <div class="user" v-show="user_type == 'admin'">
        <div class="info_box">管理员名：{{userinfo.admin_name}}</div>
        <div class="info_box">管理员id：{{userinfo.admin_id}}</div>
        <div class="info_box">管理员手机号：{{userinfo.admin_phone}}</div>
        <div class="info_box">身份：管理员</div>
      </div>
      <div class="user">
        <Button type="primary" @click="() =>{useroutmodel.show = true;}">退出</Button>
      </div>
      <div class="index_footer">
        <span>我是有底线的</span>
      </div>
    </div>

    <!--  退出 -->
    <Modal
      v-model="useroutmodel.show"
      title="用户退出"
      @on-ok="userout"
      @on-cancel="() =>{useroutmodel.show = false}"
    >
      <p>确认退出吗？</p>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userinfo: {},
      user_type: "user",
      useroutmodel: {
        show: false,
        info: {}
      }
    };
  },
  watch: {
    "$store.state.user": function(data) {
      this.userinfo = data;
    },
    "$store.state.usertype": function(data) {
      this.user_type = data;
    }
  },
  methods: {
    userout() {
      let data = {};
      if (this.user_type == "user") {
         data = {
          role: "user",
          id: this.userinfo.user_id
        };
      }else if(this.user_type == "store"){
         data = {
          role: "store",
          id: this.userinfo.store_id
        };
      }else if(this.user_type == "admin"){
         data = {
          role: "admin",
          id: this.userinfo.admin_id
        };
      }
      this.$http.post("kxlLogin/signOut", data).then(res => {
          if (res.data.code == 101) {
            this.$Message.success("退出成功！");
            localStorage.setItem("userphone", '');
            localStorage.setItem("userinfo", '');
            this.$store.dispatch("update_loginstate", false);
            this.$store.dispatch("update_user", '');
            this.$store.dispatch("update_usertype", '');
            this.$router.push({ name: "Login" });
            
          } else {
            this.$Message.error(res.data.message);
          }
        });
    }
  },
  mounted() {
    this.userinfo = this.$store.state.user;
    this.user_type = this.$store.state.usertype;
  }
};
</script>
<style lang="less">
.userinfo {
  .content {
    width: 1000px;
    margin: auto;
    background-color: #e5e5e5;
    .view_title {
      color: #f61700;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-top: 20px;
    }
    .user {
      width: 100%;
      padding: 10px;
      background-color: #fff;
      .info_box {
        width: 100%;
        height: 60px;
        padding: 10px;
        line-height: 40px;
        font-size: 20px;
        color: #f61700;
      }
    }

    .index_footer {
      width: 100%;
      height: 80px;
      background-color: #333333;
      font-size: 20px;
      line-height: 80px;
      color: #686868;
      text-align: center;
    }
  }
}
</style>