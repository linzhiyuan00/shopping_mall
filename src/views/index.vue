<template>
  <div class="index">
    <div class="content">
      <div class="lunbotu">
        <Carousel v-model="value1" loop autoplay :autoplay-speed="3000">
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/index_lunbo1.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/index_lunbo2.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/index_lunbo3.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/index_lunbo4.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/index_lunbo5.jpg" />
            </div>
          </CarouselItem>
        </Carousel>
      </div>
      <div class="shops_body">
        <div class="classify_mod">
          <div class="mod_title">手机</div>
          <div class="mod_productshow">
            <Card class="product_box" v-for="(item) in phonedata" :key="item.goods_id">
              <div class="tip">{{item.goods_name}}</div>
              <img style="width:200px;height:160px" :src="item.logo" alt @click="lll" />
            </Card>
            <Card class="Jumptip">
              <router-link class="classifyjump" to="/Home/Phone">手机专区</router-link>
            </Card>
          </div>
        </div>
        <div class="classify_mod">
          <div class="mod_title">平板</div>
          <div class="mod_productshow">
            <Card class="product_box" v-for="(item) in notebookdata" :key="item.goods_id">
              <div class="tip">{{item.goods_name}}</div>
              <img style="width:200px;height:160px" :src="item.logo" alt @click="lll" />
            </Card>
            <Card class="Jumptip">
              <router-link class="classifyjump" to="/Home/Flat">平板专区</router-link>
            </Card>
          </div>
        </div>
        <div class="classify_mod">
          <div class="mod_title">笔记本</div>
          <div class="mod_productshow">
            <Card class="product_box" v-for="(item) in flatdata" :key="item.goods_id">
              <div class="tip">{{item.goods_name}}</div>
              <img style="width:200px;height:160px" :src="item.logo" alt @click="lll" />
            </Card>
            <Card class="Jumptip">
              <router-link class="classifyjump" to="/Home/NoteBook">笔记本专区</router-link>
            </Card>
          </div>
        </div>
        <div class="classify_mod">
          <div class="mod_title">配件</div>
          <div class="mod_productshow">
            <Card class="product_box" v-for="(item) in partsdata" :key="item.goods_id">
              <div class="tip">{{item.goods_name}}</div>
              <img style="width:200px;height:160px" :src="item.logo" alt @click="lll" />
            </Card>
            <Card class="Jumptip">
              <router-link class="classifyjump" to="/Home/Parts">配件专区</router-link>
            </Card>
          </div>
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
      value1: 0,
      phonedata: [],
      notebookdata: [],
      flatdata: [],
      partsdata: []
    };
  },
  methods: {
    lll() {
      console.log("111");
    },
    getphone() {
      let data = {
        currentPage: 1,
        pageSize: 4,
        classification: 1
      };
      this.$http.post("kxlGoods/selectAllGoods", data).then(res => {
        if (res.data.code == 101) {
          this.phonedata = res.data.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getflatdata() {
      let data = {
        currentPage: 1,
        pageSize: 4,
        classification: 2
      };
      this.$http.post("kxlGoods/selectAllGoods", data).then(res => {
        if (res.data.code == 101) {
          this.flatdata = res.data.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getnotebook() {
      let data = {
        currentPage: 1,
        pageSize: 4,
        classification: 3
      };
      this.$http.post("kxlGoods/selectAllGoods", data).then(res => {
        if (res.data.code == 101) {
          this.notebookdata = res.data.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getparts() {
      let data = {
        currentPage: 1,
        pageSize: 4,
        classification: 4
      };
      this.$http.post("kxlGoods/selectAllGoods", data).then(res => {
        if (res.data.code == 101) {
          this.partsdata = res.data.data.data;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    // 获取首页商品数据
    this.getphone();
    this.getparts();
    this.getnotebook();
    this.getflatdata();
  }
};
</script>
<style lang="less">
.index {
  .content {
    width: 100%;
    .lunbotu {
      width: 100%;
      height: 400px;
      .demo-img {
        width: 100%;
        height: 400px;
      }
    }
    .shops_body {
      width: 1200px;
      padding: 20px 30px;
      margin: auto;
      .classify_mod {
        width: 100%;
        height: 305px;
        margin: 10px;
        .mod_title {
          padding-left: 30px;
          color: #aeaeae;
          width: 100%;
          height: 50px;
          font-size: 30px;
          line-height: 40px;
        }
        .mod_productshow {
          width: 100%;
          height: 250px;
          padding: 20px;
          &:after {
            content: "";
            display: table;
            clear: both;
            visibility: hidden;
            font-size: 0;
            height: 0;
          }
          .product_box {
            text-align: center;
            // display: inline-block;
            // background-color: #ffbd34;
            border: solid 1px #ffbd34;
            margin-right: 20px;
            float: left;
            width: 200px;
            height: 200px;
            .tip {
              background-color: #fff;
              height: 40px;
              width: 100%;
              font-size: 15px;
              line-height: 40px;
              color: cadetblue;
              border-bottom: solid 1px #ffbd34;
            }
          }
          .Jumptip {
            width: 100px;
            height: 200px;
            background-color: #ffbd34;
            float: left;
            .classifyjump {
              display: inline-block;
              width: 100px;
              height: 200px;
              padding: 50px 20px;
              font-size: 20px;
              line-height: 40px;
            }
          }
        }
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