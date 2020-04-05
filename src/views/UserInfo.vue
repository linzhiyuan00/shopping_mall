<template>
  <div class="userinfo">
    <div class="content">
      <div class="view_title">个人信息</div>
      <div class="user">
        <div class="info_box">用户名：张三</div>
        <div class="info_box">
          <Button type="primary" @click="admintype">切换身份</Button>
          <span>{{admin == true ? '管理员' : '普通用户'}}</span>
        </div>
      </div>
      <div class="index_footer">
        <span>我是有底线的</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: false
    };
  },
  watch: {
    "$store.state.isadmin": function(data) {
      if (data == true) {
        this.admin = true;
      } else {
        this.admin = false;
      }
    }
  },
  methods: {
    admintype() {
      if (this.admin == true) {
        this.$store.dispatch("update_isadmin", false);
      } else {
        this.$store.dispatch("update_isadmin", true);
      }
    }
  },
  mounted() {
    if (this.$store.state.isadmin == true) {
      this.admin = true;
    } else {
      this.admin = false;
    }
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