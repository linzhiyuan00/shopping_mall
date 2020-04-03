<template>
  <div class="index">
    <div class="top">
      <div class="logo">
        <img class="logo_img" src="../assets/img/logo.png" alt />
      </div>
      <div class="tologin">
        <span>登录</span>
        <Divider type="vertical" />
        <span>注册</span>
      </div>
    </div>
    <div class="content">
      <div class="lunbotu">
        <Carousel v-model="value1" loop>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/tile_macos_large.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/iphone_square_large.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/22d94f6e50d98f6f68308814ff9795e2.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/macbookpro_large.jpg" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              <img class="demo-img" src="../assets/img/holiday_hero_subhead_2a_largetall.jpg" />
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
    <div class="footer">
      <p>啦啦啦啦 我是底部</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0
    };
  }
};
</script>
<style lang="less">
.index {
  .top {
    width: 100%;
    height: 80px;
    // &:after {
    //   content: "";
    //   display: table;
    //   clear: both;
    //   visibility: hidden;
    //   font-size: 0;
    //   height: 0;
    // }
    .logo {
      width: 180px;
      height: 80px;
      float: left;
      padding: 10px;
      .logo_img {
        width: 180px;
        height: 60px;
      }
    }
    .tologin {

      // display: inline-block;
      cursor: pointer;
      font-size: 20px;
      width: 100PX;
      height: 80px;
      padding: 25px 0;
      margin-right: 10px;
      line-height: 26px;
      font-weight: 400;
      color: #8195e4;
      float: right;
    }
  }
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
  }
  .footer {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0px;
  }
}
</style>