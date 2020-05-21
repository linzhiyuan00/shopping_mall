<template>
  <div class="adminmanage">
    <div class="content">
      <div class="view_title">管理员管理</div>
      <div class="admintable">
        <Table border :columns="columns12" :data="adminlist" height="450">
          <template slot-scope="{ row }" slot="admin_name">
            <strong>{{ row.admin_name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="openeditaccountmodel(row)"
            >编辑</Button>
            <Button type="error" size="small" @click="opendeleteadminmodel(row)">删除</Button>
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

    <!-- 编辑 新增管理员 -->
    <Modal
      v-model="accountModal.show"
      :title="accountModal.type"
      width="500"
      class-name="accountmodel"
      @on-ok="editadmin"
      ok-text="保存"
      @on-cancel="acountcancel"
    >
      <div class="row_box">
        <div class="row_tip">管理员ID：</div>
        <Input class="row_input" v-model="admin.id" placeholder="输入管理员ID~" />
      </div>
      <div class="row_box">
        <div class="row_tip">姓名：</div>
        <Input class="row_input" v-model="admin.name" placeholder="输入姓名~" />
      </div>
      <!-- <div class="row_box">
        <div class="row_tip">权限：</div>
        <Select v-model="admin.permission" style="width:300px;float:left;">
          <Option
            v-for="item in permissionlist"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>-->
      <div class="row_box">
        <div class="row_tip">手机号：</div>
        <Input class="row_input" v-model="admin.phone" placeholder="输入手机号~" />
      </div>
    </Modal>

    <!--  删除管理员 -->
    <Modal
      v-model="deleteadminmodel.show"
      title="删除管理员"
      @on-ok="deleteadmin"
      @on-cancel="closedeleteadminmodel"
    >
      <p>确定要删除该管理员吗？</p>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: false,
      columns12: [
        {
          title: "管理员ID",
          key: "admin_id"
        },
        {
          title: "姓名",
          key: "admin_name",
          slot: "admin_name"
        },
        {
          title: "手机",
          key: "admin_phone"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      adminlist: [],
      // 分页
      tablecount: 10,
      currentPage: 1,
      pageSize: 10,

      accountModal: {
        show: false,
        type: "新增管理员",
        info: {}
      },
      deleteadminmodel: {
        show: false,
        info: {}
      },
      admin: {
        id: "",
        name: "张三",
        phone: ""
      }
    };
  },
  watch: {},
  methods: {
    // 页码改变
    currpage_change(pagenum){
      this.currentPage = pagenum;
      this.getadminlist();
    },
    pagesize_change(pagesize){
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.getadminlist();
    },
    // 关闭编辑管理员框
    acountcancel() {
      this.accountModal.show = false;
    },
    // 打开管理员编辑框
    openeditaccountmodel(row) {
      this.accountModal = {
        show: true,
        type: "编辑管理员"
      };
      this.admin = {
        id: row.admin_id,
        name: row.admin_name,
        phone: row.admin_phone
      };
    },
    // 修改管理员
    editadmin() {
      let data = {
        admin_id: this.admin.id,
        admin_name: this.admin.name,
        admin_phone: this.admin.phone,
      };
      this.$http.post("kxlAdmin/updateAdmin", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("更新成功！");
          this.getadminlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getadminlist() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.$http.post("kxlAdmin/selectAdmin", data).then(res => {
        if (res.data.code == 101) {
          this.adminlist = res.data.data.data;
          this.tablecount = res.data.data.count;
        } else {
          this.$Message.error(res.data.message);
        }
      })
      .catch(err =>{
        console.log(err)
      })
    },
    // 点击提示是否确认删除
    opendeleteadminmodel(row) {
      this.deleteadminmodel.show = true;
      this.deleteadminmodel.info = row;
    },
    // 关闭删除管理员提示
    closedeleteadminmodel() {
      this.deleteadminmodel.show = false;
    },
    // 删除管理员
    deleteadmin() {
      let data = {
        admin_id: this.deleteadminmodel.info.admin_id
      };
      this.$http.post("kxlAdmin/deleteAdmin", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("删除成功！");
          this.getadminlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.getadminlist();
  }
};
</script>
<style lang="less">
.adminmanage {
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
    .admintable {
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