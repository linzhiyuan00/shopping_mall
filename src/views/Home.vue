<template>
  <div class="home">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/TopBar";
export default {
  name: "Home",
  components: {
    TopBar
  },
  data() {
    return {};
  },
  mounted() {
    let info;
    console.log(localStorage.userinfo);
    if (localStorage.userinfo == undefined || localStorage.userinfo == "") {
      info = "";
    } else {
      info = JSON.parse(localStorage.userinfo);
    }
    if (info !== "") {
      this.$store.dispatch("update_loginstate", true);
      this.$store.dispatch("update_user", info);
      this.$store.dispatch("update_usertype", localStorage.usertype);
      console.log(info, info.user_id);
      // this.$store.dispatch("update_usertype", this.user.usertype);
    }
  }
};
</script>
<style lang="less">
</style>
