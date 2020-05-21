<template>
  <div class="login">
    <div class="logo"></div>
    <div class="login-div login-border" v-bind:class="{'login-error-border' : phoneError}">
      <Input ref="phone" class="login-input" placeholder="手机号" v-model="user.phone">
        <span slot="prepend">
          <img src="~@/assets/img/name.png" />
        </span>
      </Input>
    </div>
    <div class="login-div">
      <div
        class="login-div login-border login-code"
        v-bind:class="{'login-error-border' : codeError}"
      >
        <Input
          ref="code"
          @on-change="recoveryBorder('codeError')"
          @on-enter="doLogin"
          v-model="user.msg"
          class="login-input"
          placeholder="验证码"
        >
          <span slot="prepend">
            <img src="~@/assets/img/password.png" />
          </span>
        </Input>
      </div>
      <div v-show="showCode" class="code-button" @click="getCode">点击获取</div>
      <div v-show="hideCode" class="code-button">{{codeTime}}</div>
    </div>
    <RadioGroup v-model="user.usertype">
      <Radio label="user">用户</Radio>
      <Radio label="store">商家</Radio>
      <Radio label="admin">管理员</Radio>
    </RadioGroup>
    <div class="login-button" @click="doLogin">登录</div>
    <div class="login-div login-tip" @click="toregister">没有账号? 点击注册！</div>
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
      user: {
        phone: "",
        msg: "",
        usertype: "user"
      }
    };
  },
  methods: {
    toregister() {
      this.$router.push({ name: "Register" });
    },
    recoveryBorder(type) {
      switch (type) {
        case "phoneError":
          this.phoneError = false;
          break;
        case "pwdError":
          this.pwdError = false;
          break;
        case "codeError":
          this.codeError = false;
          break;
      }
    },
    checkLogin() {
      let isAllok = true;
      if (!this.user.msg) {
        this.codeError = true;
        isAllok = false;
        this.$refs.code.focus();
        this.$Message.error("验证码不能为空");
      }
      if (!this.user.phone) {
        this.phoneError = true;
        isAllok = false;
        this.$refs.phone.focus();
        this.$Message.error("手机号不能为空");
      }
      return isAllok;
    },
    calcCodeTime() {
      let _this = this;
      this.showCode = false;
      this.hideCode = true;
      this.codeTime = this.codeTime - 1;
      if (this.codeTime < 1) {
        this.showCode = true;
        this.hideCode = false;
        this.codeTime = 61;
        return;
      }
      setTimeout(function() {
        _this.calcCodeTime();
      }, 1000);
    },
    doLogin() {
      let isAllok = this.checkLogin();
      if (!isAllok) {
        return;
      }
      let state = 0;
      let data = {
        mobiles: this.user.phone,
        msg: this.user.msg,
        role: this.user.usertype
      };
      this.$http
        .post("kxlLogin/kxlVerify", data)
        .then(res => {
          if (res && res.data) {
            res = res.data;
            if (res.code == 101) {
              this.$store.dispatch("update_loginstate", true);
              this.$store.dispatch("update_usertype", this.user.usertype);
              this.$store.dispatch("update_user", res.data);
              localStorage.setItem("userphone", this.user.phone);
              this.$Message.success("登录成功");
              this.$router.push({ name: "index" });
            } else {
              this.$Message.error(res.message);
            }
          }
        })
        .then(res => {
        });
    },
    getCode() {
      if (this.user.phone == "" || !this.user.phone) {
        this.$Message.error("请先输入手机号");
        this.phoneError = true;
        return;
      }
      if (this.showCode) {
        let data = {
          mobiles: this.user.phone,
          role: this.user.usertype
        };
        this.$http
          .post("kxlLogin/getMessage", data)
          .then(res => {
            if (res && res.data && res.data.code == 101) {
              this.$Message.success("短信已发送");
              this.calcCodeTime();
            } else {
              this.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            this.$Message.error("网络连接错误");
          });
      }
    }
  },
  mounted() {
    this.user.phone = localStorage.userphone;
  }
};
</script>
<style lang="less">
.login {
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
  .login-border {
    border: 1px solid #dedede;
    border-radius: 2px;
  }
  .login-error-border {
    border: 1px solid red;
    border-radius: 2px;
  }
  .login-div {
    height: 44px;
    width: 320px;
    margin-bottom: 20px;
  }
  .login-code {
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
  .login-button {
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
  .login-button:hover {
    background: url("~@/assets/img/btn2.png") center no-repeat;
  }
  .login-tip {
    color: #999;
    text-align: center;
    cursor: pointer;
  }
}
.login-input input {
  height: 41px;
  width: 320px;
  border: none;
  font-size: 14px;
  outline: none;
}
.login-input input:focus {
  box-shadow: none;
}
.login-input .ivu-input-group-prepend {
  width: 35px;
  border: none;
  background-color: white;
}
.login-input .ivu-input-group-append {
  width: 35px;
  border: none;
  background-color: white;
}
</style>