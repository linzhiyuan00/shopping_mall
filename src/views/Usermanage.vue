<template>
  <div class="usermanage">
    <div class="content">
      <div class="view_title">用户管理</div>
      <div class="usertable">
        <Table border :columns="columns12" :data="userlist" height="450">
          <template slot-scope="{ row }" slot="user_name">
            <strong>{{ row.user_name }}</strong>
          </template>
          <template slot-scope="{ row }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="openeditaccountmodel(row)"
            >编辑</Button>
            <Button type="error" size="small" @click="opendeleteusermodel(row)">删除</Button>
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

    <!-- 编辑 新增用户 -->
    <Modal
      v-model="accountModal.show"
      :title="accountModal.type"
      width="500"
      class-name="accountmodel"
      @on-ok="edituser"
      ok-text="保存"
      @on-cancel="acountcancel"
    >
      <div class="row_box">
        <div class="row_tip">用户ID：</div>
        <Input class="row_input" v-model="user.id" placeholder="输入用户ID~" />
      </div>
      <div class="row_box">
        <div class="row_tip">姓名：</div>
        <Input class="row_input" v-model="user.name" placeholder="输入姓名~" />
      </div>
      <div class="row_box">
        <div class="row_tip">性别：</div>
        <RadioGroup v-model="user.sex" style="float:left">
          <Radio label="男"></Radio>
          <Radio label="女"></Radio>
        </RadioGroup>
      </div>
      <!-- <div class="row_box">
        <div class="row_tip">权限：</div>
        <Select v-model="user.permission" style="width:300px;float:left;">
          <Option
            v-for="item in permissionlist"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>-->
      <div class="row_box">
        <div class="row_tip">手机号：</div>
        <Input class="row_input" v-model="user.phone" placeholder="输入手机号~" />
      </div>
    </Modal>

    <!--  删除用户 -->
    <Modal
      v-model="deleteusermodel.show"
      title="删除用户"
      @on-ok="deleteuser"
      @on-cancel="closedeleteusermodel"
    >
      <p>确定要删除该用户吗？</p>
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
          title: "用户ID",
          key: "user_id"
        },
        {
          title: "姓名",
          key: "user_name",
          slot: "user_name"
        },
        {
          title: "性别",
          key: "user_gender"
        },
        {
          title: "手机",
          key: "user_phone"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      userlist: [],
      // 分页
      tablecount: 10,
      currentPage: 1,
      pageSize: 10,

      accountModal: {
        show: false,
        type: "新增用户",
        info: {}
      },
      deleteusermodel: {
        show: false,
        info: {}
      },
      user: {
        id: "",
        name: "张三",
        sex: "",
        phone: ""
      }
    };
  },
  watch: {},
  methods: {
    // 页码改变
    currpage_change(pagenum){
      this.currentPage = currpage;
      this.getuserlist();
    },
    pagesize_change(pagesize){
      this.pageSize = pagesize;
      this.currentPage = 1;
      this.getuserlist();
    },
    // 关闭编辑用户框
    acountcancel() {
      this.accountModal.show = false;
    },
    // 打开用户编辑框
    openeditaccountmodel(row) {
      this.accountModal = {
        show: true,
        type: "编辑用户"
      };
      this.user = {
        id: row.user_id,
        name: row.user_name,
        sex: row.user_gender,
        phone: row.user_phone
      };
    },
    // 修改用户
    edituser() {
      let data = {
        user_id: this.user.id,
        user_name: this.user.name,
        user_phone: this.user.phone,
        user_gender: this.user.sex
      };
      this.$http.post("kxlUser/updateUser", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("更新成功！");
          this.getuserlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    getuserlist() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.$http.post("kxlUser/selectUser", data).then(res => {
        if (res.data.code == 101) {
          this.userlist = res.data.data.data;
          this.tablecount = res.data.data.count;
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    // 点击提示是否确认删除
    opendeleteusermodel(row) {
      this.deleteusermodel.show = true;
      this.deleteusermodel.info = row;
    },
    // 关闭删除用户提示
    closedeleteusermodel() {
      this.deleteusermodel.show = false;
    },
    // 删除用户
    deleteuser() {
      let data = {
        user_id: this.deleteusermodel.info.user_id
      };
      this.$http.post("kxlUser/deleteUser", data).then(res => {
        if (res.data.code == 101) {
          this.$Message.success("删除成功！");
          this.getuserlist();
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  },
  mounted() {
    this.getuserlist();
  }
};
</script>
<style lang="less">
.usermanage {
  .content {
    width: 1000px;
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
    .usertable {
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