<template>
  <div class="ordermanage">
    <div class="content">
      <div class="view_title">订单管理</div>
      <div class="ordertable">
        <Table border :columns="columns12" :data="orderlist" height="450">
          <template slot-scope="{ row }" slot="order_name">
            <strong>{{ row.order_name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="payment_state">
            <strong>{{ row.payment_state == 0 ? '待支付' :'已支付' }}</strong>
            <Button type="info" size="small" style="float: right" @click="openeditpayeordermodel(row)">修改</Button>
          </template>
          <template slot-scope="{ row }" slot="operation_state">
            <strong>{{ row.operation_state == 0 ? '已下单' : row.operation_state == 1 ? '已发货' :'交易完成'}}</strong>
            <Button type="info" size="small" style="float: right" @click="openeditoperateordermodel(row)" >修改</Button>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="openeditaccountmodel(row)"
            >订单详情</Button>
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
        style="float:right;margin:20px"
      />
    </div>

    <!-- 订单详情 -->
    <Modal
      v-model="accountModal.show"
      :title="accountModal.type"
      width="500"
      footer-hide
      class-name="accountmodel"
      ok-text="保存"
      @on-cancel="acountcancel"
    >
      <div class="row_box">
        <div class="row_tip">订单ID：</div>
        <span class="row_content">{{accountModal.info.order_id}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">顾客id：</div>
        <span class="row_content">{{accountModal.info.user_id}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">商家id：</div>
        <span class="row_content">{{accountModal.info.store_id}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">支付价格：</div>
        <span class="row_content">{{accountModal.info.payment_amount}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">收货人：</div>
        <span class="row_content">{{accountModal.info.order_id}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">收货地址：</div>
        <span class="row_content">{{accountModal.info.receiving_address}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">支付状态：</div>
        <span class="row_content">{{accountModal.info.payment_state == 0 ? '待支付' :'已支付'}}</span>
      </div>
      <div class="row_box">
        <div class="row_tip">操作状态：</div>
        <span class="row_content">{{accountModal.info.operation_state == 0 ? '已下单' : accountModal.info.operation_state == 1 ? '已发货' :'交易完成'}}</span>
      </div>
    </Modal>

    <!--  修改订单支付状态 -->
    <Modal
      v-model="editpayeordermodel.show"
      title="修改订单支付状态订单"
      @on-ok="editpayeorder"
      @on-cancel="closeeditpayeordermodel"
    >
      <RadioGroup v-model="editpayeordermodel.value">
        <Radio :label="0">待支付</Radio>
        <Radio :label="1">已支付</Radio>
    </RadioGroup>
    </Modal>

    <!--  修改订单操作状态 -->
    <Modal
      v-model="editoperateordermodel.show"
      title="修改订单支付状态订单"
      @on-ok="editoperateorder"
      @on-cancel="closeeditoperateordermodel"
    >
      <RadioGroup v-model="editoperateordermodel.value">
        <Radio :label="0">已下单</Radio>
        <Radio :label="1">已发货</Radio>
        <Radio :label="2">交易完成</Radio>
    </RadioGroup>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        {
          title: "订单ID",
          key: "order_id"
        },
        {
          title: "顾客id",
          key: "user_id"
        },
        {
          title: "商家id",
          key: "store_id"
        },
        {
          title: "支付价格",
          key: "payment_amount"
        },
        {
          title: "收货人",
          key: "receiving_name"
        },
        {
          title: "收货地址",
          key: "receiving_address"
        },
        {
          title: "支付状态",
          key: "payment_state",
          slot: "payment_state",
          width: 150
        },
        {
          title: "操作状态",
          key: "operation_state",
          slot: "operation_state",
          width: 150
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 200
        }
      ],
      orderlist: [],
      // 分页
      tablecount: 10,
      currentPage: 1,
      pageSize: 10,

      accountModal: {
        show: false,
        type: "订单详情",
        info: {}
      },
      editpayeordermodel: {
        show: false,
        value:0,
        info: {}
      },
      editoperateordermodel: {
        show: false,
        value:0,
        info: {}
      },
      order: {
        id: "",
        name: "张三",
        sex: "",
        phone: ""
      },
      currstoreid:"",
      curruserid:"",
    };
  },
  watch: {
  },
  methods: {
    // 页码改变
    currpage_change(pagenum) {
      this.currentPage = pagenum;
      this.getorderlist();
    },
    pagesize_change(pagesize) {
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.getorderlist();
    },
    // 关闭编辑订单框
    acountcancel() {
      this.accountModal.show = false;
    },
    // 打开订单详情框
    openeditaccountmodel(row) {
      this.accountModal.info = row;
      this.accountModal.show = true;
      // let data = {
      //   order_id: row.order_id
      // };
      // this.$http.post("kxlOrder/selectOrderContent", data).then(res => {
      //   if (res.data.code == 101) {
      //     this.accountModal.info = res.data.data;
      //     this.accountModal.show = true;
      //   } else {
      //     this.$Message.error(res.data.message);
      //   }
      // });
    },
    // 修改订单
    // editorder() {
    //   let data = {
    //     order_id: this.order.id,
    //     order_name: this.order.name,
    //     order_phone: this.order.phone,
    //     order_gender: this.order.sex
    //   };
    //   this.$http.post("kxlorder/updateorder", data).then(res => {
    //     if (res.data.code == 101) {
    //       this.$Message.success("更新成功！");
    //       this.getorderlist();
    //     } else {
    //       this.$Message.error(res.data.message);
    //     }
    //   });
    // },
    getorderlist() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        store_id:this.currstoreid == "" ? undefined :this.currstoreid,
        user_id:this.curruserid == "" ? undefined :this.curruserid
      };
      this.$http.post("kxlOrder/selectOrder", data).then(res => {
        if (res.data.code == 101) {
          this.orderlist = res.data.data.data;
          this.tablecount = res.data.data.count;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 点击提示是否确认修改订单支付状态
    openeditpayeordermodel(row) {
      this.editpayeordermodel.show = true;
      this.editpayeordermodel.value = row.payment_state;
      this.editpayeordermodel.info = row;
    },
    // 关闭修改订单支付状态订单提示
    closeeditpayeordermodel() {
      this.editpayeordermodel.show = false;
    },
    // 修改订单支付状态订单
    editpayeorder() {
      let data = {
        order_id: this.editpayeordermodel.info.order_id,
        payment_state:this.editpayeordermodel.value
      };
      this.$http.post("kxlOrder/updatePaymentState", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("修改订单支付状态成功！");
          this.getorderlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
     // 点击提示是否确认修改订单操作状态
    openeditoperateordermodel(row) {
      this.editoperateordermodel.show = true;
      this.editoperateordermodel.value = row.payment_state;
      this.editoperateordermodel.info = row;
    },
    // 关闭修改订单操作状态订单提示
    closeeditoperateordermodel() {
      this.editoperateordermodel.show = false;
    },
    // 修改订单操作状态订单
    editoperateorder() {
      let data = {
        order_id: this.editoperateordermodel.info.order_id,
        operation_state:this.editoperateordermodel.value
      };
      this.$http.post("kxlOrder/updateOperationState", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("修改订单操作状态成功！");
          this.getorderlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
  },
  mounted() {
    if(this.$store.state.usertype == 'store'){
      this.currstoreid =  this.$store.state.user.store_id;
      this.curruserid = "";
    }else if(this.$store.state.usertype == 'user'){
      this.curruserid = this.$store.state.user.user_id;
      this.currstoreid = "";
    }
    else{
      this.curruserid = "";
      this.currstoreid = "";
    }
    this.getorderlist();
  }
};
</script>
<style lang="less">
.ordermanage {
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
    .ordertable {
      width: 100%;
      padding: 20px;
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
    .row_content{
      float: left;
      color: #f61700;
      font-size: 14px;
      line-height: 32px;
    }
    .row_input {
      float: left;
      width: 300px;
    }
  }
}
</style>