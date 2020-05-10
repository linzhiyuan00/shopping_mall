<template>
  <div class="NoteBook">
    <div class="content">
      <div class="view_title">笔记本专区</div>
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
         <div class="product_box" v-for=" item of notebookList" :key="item.goods_id">
          <Card class="product_card">
            <div style="width:380px;height:300px">
              <img style="width:380px;height:300px" :src="item.logo" alt @click="lll" />
            </div>
            <div class="describe">
              <div class="price">{{item.goods_name}}</div>
              <div class="price">
                ￥
                <span style="color:#f61700">{{item.goods_price}}</span>
              </div>
              <Button style="margin-right:20px" type="primary">添加购物车</Button>
              <Button type="error">直接购买</Button>
            </div>
          </Card>
        </div>
      </div>
      <Page
        :current="currentPage"
        :page-size="pageSize"
        :total="tablecount"
        show-total
        show-sizer
        @on-change="currpage_change"
        @on-page-size-change="pagesize_change"
        style="float:right;margin:20px"
      />
      <!-- <div class="index_footer">
        <span>我是有底线的</span>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 3,
      notebookList: [],
      // 分页
      tablecount: 10,
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
     // 页码改变
    currpage_change(pagenum){
      this.currentPage = currpage;
      this.getnotebook();
    },
    pagesize_change(pagesize){
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.getnotebook();
    },
    lll() {
      console.log("111");
    },
    getnotebook() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        classification: 3
      };
      this.$http.post("kxlGoods/selectAllGoods", data).then(res => {
        if (res.data.code == 101) {
          this.notebookList = res.data.data.data;
          this.tablecount = res.data.data.count;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
  },
  mounted() {
    this.getnotebook();
  },
};
</script>
<style lang="less">
.NoteBook {
  .content {
    width: 1000px;
    margin: auto;
    background-color: #e5e5e5;
    .view_title{
      color:#f61700;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin: 20px;
    }
    .lunbotu {
      width: 100%;
      height: 400px;
      .demo-img {
        width: 100%;
        height: 400px;
      }
    }
    .shops_body {
      width: 100%;
      padding: 20px 50px;
      margin: auto;
      &:after {
        content: "";
        display: table;
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
      }
      .product_box {
        width: 400px;
        height: 450px;
        float: left;
        background-color: antiquewhite;
        margin: 20px 25px;
        .product_card {
          width: 100%;
          height: 100%;
          padding: 10px;
          .describe {
            width: 100%;
            height: 130px;
            background-color: #e5e5e5;
            .price {
              font-size: 20px;
              padding: 10px;
              width: 100%;
              height: 40px;
              line-height: 20px;
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