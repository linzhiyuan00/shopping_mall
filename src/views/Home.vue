<template>
  <div class="home">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from '@/components/TopBar'
export default {
  name: "Home",
  components: {
   TopBar
  },
};
</script>
<style lang="less">

</style>
