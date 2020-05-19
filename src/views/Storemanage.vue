<template>
  <div class="storemanage">
    <div class="content">
      <div class="view_title">商家管理</div>
      <div class="storetable">
        <Table border :columns="columns12" :data="storelist" height="450">
          <template slot-scope="{ row }" slot="store_name">
            <strong>{{ row.store_name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="state" style="text-align:right;">
            <span>{{ row.state == 0 ? '待审核' : row.state == 1 ? '已通过' : row.state == 2 ? '未通过' :'已停用'}}</span>
            <Button type="info" size="small" style="float: right" @click="auditstoremodel.show = true;auditstoremodel.info = row;aduitstate = row.state">审核</Button>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="openeditaccountmodel(row)"
            >编辑</Button>
            <Button type="error" size="small" @click="opendeletestoremodel(row)">删除</Button>
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

    <!-- 编辑 商家 -->
    <Modal
      v-model="accountModal.show"
      :title="accountModal.type"
      width="500"
      class-name="accountmodel"
      @on-ok="editstore"
      ok-text="保存"
      @on-cancel="acountcancel"
    >
      <div class="row_box">
        <div class="row_tip">商家ID：</div>
        <Input class="row_input" v-model="store.id" placeholder="输入商家ID~" />
      </div>
      <div class="row_box">
        <div class="row_tip">姓名：</div>
        <Input class="row_input" v-model="store.name" placeholder="输入姓名~" />
      </div>
      <div class="row_box">
        <div class="row_tip">手机号：</div>
        <Input class="row_input" v-model="store.phone" placeholder="输入手机号~" />
      </div>
      <div class="row_box">
        <div class="row_tip">商铺名称：</div>
        <Input class="row_input" v-model="store.shop_name" placeholder="输入商铺名称~" />
      </div>
    </Modal>

    <!--  删除商家 -->
    <Modal
      v-model="deletestoremodel.show"
      title="删除商家"
      @on-ok="deletestore"
      @on-cancel="closedeletestoremodel"
    >
      <p>确定要删除该商家吗？</p>
    </Modal>

    <!-- 审核商家 -->
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      store: false,
      columns12: [
        {
          title: "商家ID",
          key: "store_id"
        },
        {
          title: "姓名",
          key: "store_name",
          slot: "store_name"
        },
        {
          title: "手机",
          key: "store_phone"
        },
        {
          title: "商铺名称",
          key: "shop_name"
        },
        {
          title: "审核状态",
          key: "state",
          slot: "state"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      storelist: [],
      // 分页
      tablecount: 10,
      currentPage: 1,
      pageSize: 10,

      accountModal: {
        show: false,
        type: "新增商家",
        info: {}
      },
      deletestoremodel: {
        show: false,
        info: {}
      },
      aduitstate:'',
      auditstoremodel: {
        show: false,
        info: {}
      },
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
          label:'未通过',
          value:2
        },
        {
          label:'已停用',
          value:3
        },
      ],
      store: {
        id: "",
        name: "",
        phone: "",
        shop_name: ""
      }
    };
  },
  watch: {},
  methods: {
    // 页码改变
    currpage_change(pagenum) {
      this.currentPage = pagenum;
      this.getstorelist();
    },
    pagesize_change(pagesize) {
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.getstorelist();
    },
    // 关闭审核商家
    closeauditstoremodel() {
      this.auditstoremodel.show = false;
    },
    // 审核商家
    auditstore() {
      let data = {
        store_id: this.auditstoremodel.info.store_id,
        state: this.aduitstate,
      };
      this.$http.post("kxlStore/updateStoreState", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("审核成功！");
          this.getstorelist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 关闭编辑商家框
    acountcancel() {
      this.accountModal.show = false;
    },
    // 打开商家编辑框
    openeditaccountmodel(row) {
      this.accountModal = {
        show: true,
        type: "编辑商家"
      };
      this.store = {
        id: row.store_id,
        name: row.store_name,
        phone: row.store_phone,
        shop_name: row.shop_name
      };
    },
    // 修改商家
    editstore() {
      let data = {
        store_id: this.store.id,
        store_name: this.store.name,
        store_phone: this.store.phone,
        shop_name: this.store.shop_name
      };
      this.$http.post("kxlStore/updateStore", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("更新成功！");
          this.getstorelist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getstorelist() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.$http.post("kxlStore/selectStore", data).then(res => {
        if (res.data.code == 101) {
          this.storelist = res.data.data.data;
          this.tablecount = res.data.data.count;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 点击提示是否确认删除
    opendeletestoremodel(row) {
      this.deletestoremodel.show = true;
      this.deletestoremodel.info = row;
    },
    // 关闭删除商家提示
    closedeletestoremodel() {
      this.deletestoremodel.show = false;
    },
    // 删除商家
    deletestore() {
      let data = {
        store_id: this.deletestoremodel.info.store_id
      };
      this.$http.post("kxlStore/deleteStore", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("删除成功！");
          this.getstorelist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.getstorelist();
  }
};
</script>
<style lang="less">
.storemanage {
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
    .storetable {
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
    .row_input {
      float: left;
      width: 300px;
    }
  }
}
</style>