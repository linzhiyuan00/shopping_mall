<template>
  <div class="productinfo">
    <div class="content">
      <div class="view_title">商品详情</div>
      <div class="product clearfloat">
        <div class="product_logo">
          <img :src="productinfo.logo" style="width:300px;height:350px;" />
        </div>
        <div class="product_info">
          <div class="info_row">
            <span class="info_title">商品id：</span>
            <span class="info_content">{{productinfo.goods_id}}</span>
          </div>
          <div class="info_row">
            <span class="info_title">商品名称：</span>
            <span class="info_content">{{productinfo.goods_name}}</span>
          </div>
          <div class="info_row">
            <span class="info_title">价格￥：</span>
            <span class="info_content">{{productinfo.goods_price}}</span>
          </div>
          <div class="info_row">
            <span class="info_title">分类：</span>
            <span
              class="info_content"
            >{{productinfo.classification == 1 ? '手机' : productinfo.classification == 2 ? '平板' : productinfo.classification == 3 ? '笔记本' :'配件'}}</span>
          </div>
          <div class="info_row">
            <span class="info_title">品牌：</span>
            <span class="info_content">{{productinfo.goods_brand}}</span>
          </div>
          <div class="info_row">
            <span class="info_title">商品简介：</span>
            <span class="info_content">{{productinfo.goods_sketch}}</span>
          </div>
          <div class="info_row">
            <span class="info_title">商品详情：</span>
            <span class="info_content">{{productinfo.goods_detailed}}</span>
          </div>
          <!-- <div class="info_row">
            <span class="info_title">商家id：</span>
            <span class="info_content">{{productinfo.store_id}}</span>
          </div> -->
        </div>
      </div>
      <div v-show="$store.state.usertype == 'user'">
        <Button type="primary" style="margin-right:10px;margin-top:30px;" @click="add_cart">加入购物车</Button>
      </div>
      <!-- <div class="index_footer">
        <span>我是有底线的</span>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productid: "",
      productinfo: {
        goods_id: "",
        goods_name: "",
        goods_price: "",
        classification: "",
        goods_brand: "",
        goods_sketch: "",
        goods_detailed: "",
        store_id: "",

        logo:
          "http://fastdfs.71baomu.com/g1/M00/00/79/euJUJV63_gyARkY1AACaD1CL9Gw726.jpg"
      }
    };
  },
  methods: {
    // 加入购物车
    add_cart() {
      if (this.$store.state.Login == false) {
        this.$Message.error("请先登录！");
        return;
      }
      let data = {
        user_id:
          this.$store.state.user.user_id ||
          this.$store.state.user.store_id ||
          this.$store.state.user.admin_id,
        goods_id: this.productid
      };
      this.$http.post("shoppingCart/addCart", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("添加购物车成功！");
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 获取商品详情
    getproductinfo() {
      let data = {
        goods_id: this.productid
      };
      this.$http.post("kxlGoods/selectGoodsByGoodsId", data).then(res => {
        if (res.data.code == 101) {
          this.productinfo = res.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.productid = this.$route.params.id;
    this.getproductinfo();
  }
};
</script>
<style lang="less">
.productinfo {
  .content {
    width: 1000px;
    margin: auto;
    .view_title {
      color: #f61700;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-top: 20px;
    }
    .product {
      width: 100%;
      padding: 10px;
      background-color: #fff;
      .product_logo {
        float: left;
        width: 300px;
        height: 350px;
        border: solid 1px #e5e5e5;
      }
      .product_info {
        float: left;
        width: calc(100% - 300px);
        height: 300px;
        padding: 20px;
        line-height: 40px;
        font-size: 20px;
        color: #f61700;
        .info_row {
          height: 40px;
          line-height: 40px;
          text-align: left;
          .info_title {
            display: inline-block;
            width: 120px;
          }
          .info_content {
            color: #2d8cf0;
          }
        }
      }
    }

    .index_footer {
      margin-top: 20px;
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