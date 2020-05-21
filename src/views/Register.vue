<template>
  <div class="register">
    <div class="logo"></div>
    <div
      class="register-div register-tip"
    >{{usertype == 'user' ? '用户注册' :usertype == 'store' ? '商家注册' :'管理员注册'}}</div>
    <div v-if="usertype == 'user'">
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="用户姓名" v-model="user.name">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="用户手机号" v-model="user.phone">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
      <div class="register-div">
        <RadioGroup v-model="user.sex">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
        </RadioGroup>
      </div>
    </div>
    <div v-if="usertype == 'store'">
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="商家姓名" v-model="store.store_name">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="商家手机号" v-model="store.store_phone">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="商家店铺名" v-model="store.shop_name">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
    </div>
    <div v-if="usertype == 'admin'">
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="管理员姓名" v-model="admin.admin_name">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
      <div class="register-div register-border">
        <Input ref="phone" class="register-input" placeholder="管理员手机号" v-model="admin.admin_phone">
          <span slot="prepend">
            <img src="~@/assets/img/name.png" />
          </span>
        </Input>
      </div>
    </div>

    <RadioGroup v-model="usertype">
      <Radio label="user">用户</Radio>
      <Radio label="store">商家</Radio>
      <Radio label="admin">管理员</Radio>
    </RadioGroup>
    <div class="register-button" @click="doregister">注册</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCode: true,
      hideCode: false,
      codeTime: 61,
      passwordType: "password",
      pwdImage:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYpJREFUSA3tUb1OAkEQntkrhMLCYGNhRWxUrrHQkIAUCAWJb4A2itHKTlsrNfYajRVUPgAFBwlwl5DYHmCjhsLCGO2Jxe24c3DkgAIf4C7Z22/m+9nNLEDwBRMIJjA1AaPZfjLMzsUUMaPBHvZOyoTXICKsmp1TCRRR+NBodnc9btbOWvawlzM4y/OMgNFoFwkozwQKPAYJ5yTgPpNYv0ZE6Rn8uwoShtU5U+wRCLgiSXeuH7CUScX2BnjoqFl22nGwJAQc7CRjZdN8WfoFp6hCogh4Sxo0wkTvLO8jRtGBlLrQibrOWwi1/WRy9bNqtnNSwqOmUT6d0GtjB3DRan2E4/HlPuOK1d1ER5YVfFBBi4igE+AKcwj0SgQ2Cu0HpCyQJnLZxNozc/4MrkdvwIUXzlgZL1VwBJGcbEovZLb1LQDq8WLMPUU5rGGt61G/sQxVjx3gieq9XggJvtRVv+fnwjdeHwg23DVsuJzSsJY9I91/gWXZC35tpWETL39vUuPnAhxMIJjAYAJ/7aex/g8IWvgAAAAASUVORK5CYII=",
      phoneError: false,
      pwdError: false,
      codeError: false,
      currentyear: "",
      usertype: "user",
      user: {
        name: "",
        phone: "",
        sex: "男"
      },
      store: {
        store_name: "",
        store_phone: "",
        shop_name: ""
      },
      admin: {
        admin_name: "",
        admin_phone: ""
      }
    };
  },
  methods: {
    doregister() {
      if (this.usertype == "user") {
        let data = {
          user_name: this.user.name,
          user_phone: this.user.phone,
          user_gender: this.user.sex
        };
        this.$http
          .post("kxlLogin/userRegister", data)
          .then(res => {
            if (res && res.data) {
              res = res.data;
              if (res.code == 101 && res.data == null) {
                localStorage.setItem("userphone", this.user.phone);
                this.$Message.success("用户注册成功");
              } else {
                this.$Message.error(res.message);
              }
            }
          })
          .then(res => {
            this.$router.push({ name: "Login" });
          });
      } else if (this.usertype == "store") {
        let data = {
          store_name: this.store.store_name,
          store_phone: this.store.store_phone,
          shop_name: this.store.shop_name
        };
        this.$http
          .post("kxlLogin/storeRegister", data)
          .then(res => {
            if (res && res.data) {
              res = res.data;
              if (res.code == 101 && res.data == null) {
                localStorage.setItem("userphone", this.store.store_phone);
                this.$Message.success("商家注册成功");
              } else {
                this.$Message.error(res.message);
              }
            }
          })
          .then(res => {
            this.$router.push({ name: "Login" });
          });
      } else if (this.usertype == "admin") {
        let data = {
          admin_name: this.admin.admin_name,
          admin_phone: this.admin.admin_phone
        };
        this.$http
          .post("kxlLogin/adminRegister", data)
          .then(res => {
            if (res && res.data) {
              res = res.data;
              if (res.code == 101 && res.data == null) {
                localStorage.setItem("userphone", this.admin.admin_phone);
                this.$Message.success("管理员注册成功");
              } else {
                this.$Message.error(res.message);
              }
            }
          })
          .then(res => {
            this.$router.push({ name: "Login" });
          });
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.register {
  margin: auto;
  width: 320px;
  height: 310px;
  padding-top: 10%;
  .logo {
    height: 44px;
    width: 320px;
    margin-bottom: 20px;
    background: url("~@/assets/img/logo.png") center no-repeat;
  }
  .register-border {
    border: 1px solid #dedede;
    border-radius: 2px;
  }
  .register-error-border {
    border: 1px solid red;
    border-radius: 2px;
  }
  .register-div {
    height: 44px;
    width: 320px;
    margin-bottom: 20px;
  }
  .register-code {
    width: 202px;
    float: left;
  }
  .code-button {
    float: right;
    margin-top: 6px;
    border-radius: 2px;
    background-color: #7d7d7d;
    color: white;
    width: 83px;
    height: 28px;
    font-size: 13px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
  }
  .register-button {
    cursor: pointer;
    margin-top: 18px;
    margin-bottom: 5px;
    width: 320px;
    height: 48px;
    background: url("~@/assets/img/btn1.png") center no-repeat;
    color: white;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
  }
  .register-button:hover {
    background: url("~@/assets/img/btn2.png") center no-repeat;
  }
  .register-tip {
    color: #999;
    text-align: center;
    font-size: 20px;
  }
}
.register-input input {
  height: 41px;
  width: 320px;
  border: none;
  font-size: 14px;
  outline: none;
}
.register-input input:focus {
  box-shadow: none;
}
.register-input .ivu-input-group-prepend {
  width: 35px;
  border: none;
  background-color: white;
}
.register-input .ivu-input-group-append {
  width: 35px;
  border: none;
  background-color: white;
}
</style>