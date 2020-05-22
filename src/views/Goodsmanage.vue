<template>
  <div class="goodsmanage">
    <div class="content">
      <div class="view_title">商品管理</div>
      <div class="goodstable">
        <Button type="primary" @click="openaddgoodsmodel">添加商品</Button>
        <Table border :columns="columns12" :data="goodslist" height="450">
          <template slot-scope="{ row }" slot="logo">
            <img :src="row.logo" style="width:40px;height:40px;" alt />
          </template>
          <template slot-scope="{ row }" slot="classification">
            <span>{{row.classification == 1 ? '手机': row.classification == 2 ? '平板':row.classification == 3 ? '笔记本':'配件'}}</span>
          </template>
          <template slot-scope="{ row }" slot="state">
            <span>{{row.state == 0 ? '待审核': row.state == 1 ? '已通过':row.state == 2 ? '已驳回': '已下架' }}</span>
            <Button v-if="$store.state.usertype == 'admin'" type="info" size="small" style="float: right" @click="auditstoremodel.show = true;auditstoremodel.info = row;aduitstate = row.state">修改</Button>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="openeditaccountmodel(row)"
            >编辑</Button>
            <Button type="error" size="small" @click="opendeletegoodsmodel(row)">删除</Button>
          </template>
        </Table>
      </div>
      <Page
        :current="currentPage"
        :page-size="pageSize"
        :total="tablecount"
        show-total
        show-sizer
        @on-change="currpage_change"
        @on-page-size-change="pagesize_change"
        style="float:right;margin:10px"
      />
    </div>
    <!--  删除商品 -->
    <Modal
      v-model="deletegoodsmodel.show"
      title="删除商品"
      @on-ok="deletegoods"
      @on-cancel="closedeletegoodsmodel"
    >
      <p>确定要删除该商品吗？</p>
    </Modal>

    <!-- 修改商品状态 -->
    <Modal
      v-model="auditstoremodel.show"
      title="审核商家"
      @on-ok="auditstore"
      @on-cancel="closeauditstoremodel"
    >
      <Select v-model="aduitstate">
        <Option v-for="item in aduitstateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </Modal>

    <ProductDrawer
      @getproductmodalshow="getproductmodalshow"
      @getgoodslist="getgoodslist"
      :product_show="productmodal.show"
      :product_title="productmodal.title"
      :product_info="productmodal.info"
    ></ProductDrawer>
  </div>
</template>
<script>
import ProductDrawer from "../components/Product";
export default {
  components: {
    ProductDrawer
  },
  data() {
    return {
      admin: false,
      columns12: [
        {
          title: "商品图片",
          key: "logo",
          slot: "logo"
        },
        {
          title: "商品名称",
          key: "goods_name"
        },
        {
          title: "商品ID",
          key: "goods_id"
        },
        {
          title: "分类",
          key: "classification",
          slot: "classification"
        },
        {
          title: "商品价格",
          key: "goods_price"
        },
        {
          title: "商品品牌",
          key: "goods_brand"
        },
        {
          title: "商品简介",
          key: "goods_sketch"
        },
        {
          title: "商品详情",
          key: "goods_detailed"
        },
        {
          title: "商品状态",
          key: "state",
          slot: "state",
          width:120
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 200
        }
      ],
      aduitstate:"",
      aduitstateList:[
        {
          label:'待审核',
          value:0
        },
        {
          label:'已通过',
          value:1
        },
        {
          label:'已驳回',
          value:2
        },
        {
          label:'已下架',
          value:3
        },
      ],
      goodslist: [],
      // 分页
      tablecount: 10,
      currentPage: 1,
      pageSize: 10,

      auditstoremodel: {
        show: false,
        info: {}
      },
      productmodal: {
        show: false,
        title: "",
        info: {}
      },
      deletegoodsmodel: {
        show: false,
        info: {}
      },
      goods: {
        id: "",
        name: "张三",
        sex: "",
        phone: ""
      },
      currstoreid:""
    };
  },
  watch: {},
  methods: {
    getproductmodalshow(state) {
      this.productmodal.show = state;
    },
    // 关闭修改商品状态
    closeauditstoremodel() {
      this.auditstoremodel.show = false;
    },
    // 修改商品状态
    auditstore() {
      let data = {
        goods_id: this.auditstoremodel.info.goods_id,
        state: this.aduitstate,
      };
      this.$http.post("kxlGoods/updateGoodsState", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("审核成功！");
          this.getgoodslist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 页码改变
    currpage_change(pagenum) {
      this.currentPage = pagenum;
      this.getgoodslist();
    },
    pagesize_change(pagesize) {
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.getgoodslist();
    },
    // 打开添加商品框
     openaddgoodsmodel() {
      this.productmodal.show = true;
      this.productmodal.title = "添加商品";
      this.productmodal.info = {
        store_id:this.$store.state.user.store_id
      };
    },
    // 打开商品编辑框
    openeditaccountmodel(row) {
      this.productmodal.show = true;
      this.productmodal.title = "修改商品";
      this.productmodal.info = row;
    },
    getgoodslist() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        store_id:this.currstoreid == '' ? undefined :this.currstoreid
      };
      this.$http.post("kxlGoods/selectAllGoods", data).then(res => {
        if (res.data.code == 101) {
          this.goodslist = res.data.data.data;
          this.tablecount = res.data.data.count;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 点击提示是否确认删除
    opendeletegoodsmodel(row) {
      this.deletegoodsmodel.show = true;
      this.deletegoodsmodel.info = row;
    },
    // 关闭删除商品提示
    closedeletegoodsmodel() {
      this.deletegoodsmodel.show = false;
    },
    // 删除商品
    deletegoods() {
      let data = {
        goods_id: this.deletegoodsmodel.info.goods_id
      };
      this.$http.post("kxlGoods/deleteGoods", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("删除成功！");
          this.getgoodslist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    if(this.$store.state.usertype == 'store'){
      this.currstoreid = this.$store.state.user.store_id;
    }else{
      this.currstoreid = '';
    }
    this.getgoodslist();
  }
};
</script>
<style lang="less">
.goodsmanage {
  .content {
    width: 100%;
    margin: auto;
    background-color: #fff;
    .view_title {
      background-color: #e5e5e5;
      color: #f61700;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-top: 20px;
    }
    .goodstable {
      width: 100%;
      padding: 10px 20px 20px 20px;
      background-color: #fff;
    }
  }
}
.accountmodel {
  width: 100%;
  .row_box {
    height: 52px;
    width: 100%;
    padding: 10px 20px;
    &:after {
      content: "";
      display: table;
      clear: both;
      visibility: hidden;
      font-size: 0;
      height: 0;
    }
    .row_tip {
      float: left;
      width: 100px;
      text-align: right;
      font-size: 16px;
      line-height: 32px;
    }
    .row_input {
      float: left;
      width: 300px;
    }
  }
}
</style>