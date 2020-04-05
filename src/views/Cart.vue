<template>
  <div class="cart">
    <div class="content">
      <div class="view_title">购物车</div>
      <div class="cartlist">
        <div
          class="kong"
          style="width:100%;height:200px;padding:50px;"
          v-if="cartlist.length == 0"
        >购物车现在是空的哦</div>
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
      cartlist: []
    };
  },
  methods: {}
};
</script>
<style lang="less">
.cart {
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
      margin: 20px;
    }
    .cartlist {
      width: 100%;
      min-height: 800px;
      background-color: #fff;
      font-size: 25px;
      color: darkcyan;
      line-height: 40px;
      margin-top: 50px;
      background-image: url("../assets/img/cart_kong.png");
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
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