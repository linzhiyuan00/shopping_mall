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
        <div class="list" v-else>
          <div class="product_box clearfloat" v-for="(item,idx) in cartlist" :key="idx">
            <div class="logo" style="float:left;width:60px;height:80px;margin-right:20px;">
              <img :src="item.kxlGoods.logo" alt style="width:60px;height:80px;" />
            </div>
            <div
              class="name"
              style="float:left;height:100%;width:200px;font-size:14px;line-height:80px;"
            >{{item.kxlGoods.goods_name}}</div>
            <div
              class="price"
              style="float:left;height:100%;width:200px;font-size:14px;line-height:80px;color:#f61700"
            >￥:{{item.kxlGoods.goods_price}}</div>
            <Checkbox v-model="item.kxlGoods.check" style="margin-top:10px;">选中下单</Checkbox>
            <Button
              type="error"
              style="margin-right:10px;float:right;margin-top:25px;"
              @click="deleteproduct(item.kxlGoods)"
            >删除</Button>
          </div>
          <Button type="primary" style="margin-right:10px;" @click="create_order">生成订单</Button>
        </div>
      </div>
      <!-- <div class="index_footer">
        <span>我是有底线的</span>
      </div>-->
    </div>

    <Modal
      v-model="create_ordermodal.show"
      title="生成订单"
      @on-ok="create_orderok"
      @on-cancel="close_order"
    >
      <div class="input_box clearfloat">
        <div class="input_title">收货人姓名：</div>
        <Input
          v-model="create_ordermodal.shouhuo_name"
          placeholder="输入收货人姓名："
          style="width: 300px"
        />
      </div>
      <div class="input_box clearfloat">
        <div class="input_title">收货人号码：</div>
        <Input
          v-model="create_ordermodal.shouhuo_phone"
          placeholder="输入收货人号码："
          style="width: 300px"
        />
      </div>
      <div class="input_box clearfloat">
        <div class="input_title">收货地址：</div>
        <Input
          v-model="create_ordermodal.shouhuo_address"
          placeholder="输入收货地址："
          style="width: 300px"
        />
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartlist: [],
      orderlist: [],
      create_ordermodal: {
        show: false,
        info: {},
        shouhuo_name: "",
        shouhuo_phone: "",
        shouhuo_address: ""
      }
    };
  },
  methods: {
    close_order() {
      this.create_ordermodal.show = false;
    },
    create_order() {
      this.orderlist = [];
      for (let i of this.cartlist) {
        if (i.kxlGoods.check == true) {
          this.orderlist.push(i.kxlGoods);
        }
      }
      if (this.orderlist.length > 0 && this.orderlist.length == 1) {
        this.create_ordermodal.show = true;
      } else if (this.orderlist.length > 1) {
        this.$Message.error("下单时只能选择一件商品！");
        return;
      } else {
        this.$Message.error("请选择商品！");
        return;
      }
    },
    create_orderok() {
      if (this.create_ordermodal.shouhuo_name == "") {
        this.$Message.error("收货人姓名不能为空！");
        return;
      }
      if (this.create_ordermodal.shouhuo_phone == "") {
        this.$Message.error("收货人号码不能为空！");
        return;
      }
      if (this.create_ordermodal.shouhuo_address == "") {
        this.$Message.error("收货地址不能为空！");
        return;
      }
      let data = {
        store_id: this.orderlist[0].store_id
      };
      this.$http.post("kxlStore/selectStoreByStoreId", data).then(res => {
        if (res.data.code == 101) {
          let goodsnumber = [
            {
              number: "1",
              goodsId: this.orderlist[0].goods_id.toString()
            }
          ];
          let data = {
            user_id: this.$store.state.user.user_id,
            user_name: this.$store.state.user.user_name,
            store_id: res.data.data.store_id,
            store_name: res.data.data.store_name,
            receiving_name: this.create_ordermodal.shouhuo_name,
            receiving_number: this.create_ordermodal.shouhuo_phone,
            receiving_address: this.create_ordermodal.shouhuo_address,
            goodsId_number: JSON.stringify(goodsnumber)
          };
          this.$http.post("kxlOrder/insertOrder", data).then(res => {
            if (res.data.code == 101) {
              this.$Message.success('下单成功！')
              this.getcartlist();
            } else {
              this.$Message.error(res.data.message);
            }
          });
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getcartlist() {
      let data = {
        user_id: this.$store.state.user.user_id
      };
      this.$http.post("shoppingCart/selectCart", data).then(res => {
        if (res.data.code == 101) {
          this.cartlist = res.data.data;
          for (let i of this.cartlist) {
            i.kxlGoods.check = false;
          }
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },

    deleteproduct(item) {
      let data = {
        user_id: this.$store.state.user.user_id,
        goods_id: item.goods_id
      };
      this.$http.post("shoppingCart/deleteCart", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("删除成功！");
        } else {
          this.$Message.error(res.data.message);
        }
        this.getcartlist();
      });
    }
  },
  mounted() {
    this.getcartlist();
  }
};
</script>
<style lang="less">
.input_box {
  width: 100%;
  height: 50px;
  padding: 9px 10px;
  .input_title {
    float: left;
    width: 100px;
    line-height: 32px;
    text-align: right;
  }
}
.cart {
  .content {
    width: 1000px;
    margin: auto;
    .view_title {
      color: #f61700;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 20px;
      background-color: #e5e5e5;
    }
    .cartlist {
      width: 100%;
      background-color: #fff;
      font-size: 25px;
      color: darkcyan;
      line-height: 40px;
      background-image: url("../assets/img/cart_kong.png");
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
      padding: 20px 50px;
      .product_box {
        margin: 20px 0;
        padding: 10px 20px;
        width: 100%;
        height: 100px;
        border: solid 1px #e5e5e5;
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