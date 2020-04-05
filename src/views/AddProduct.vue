<template>
  <div class="addproduct">
    <div class="content">
      <div class="view_title">添加商品</div>
      <div class="user">
        <Button style="margin:20px" type="primary">添加商品</Button>
        <div class="add">
          <div class="table_head">
            <div class="col col1">商品ID</div>
            <div class="col col2">商品名称</div>
            <div class="col col3">商品价格(￥)</div>
            <div class="col col4">商品描述</div>
            <div class="col col5">商品图片</div>
            <div class="col col6">商品类型</div>
          </div>
          <div class="table_body">
            <div class="row col1">
              <Input v-model="product_id" placeholder="商品ID" size="large" style="width:90px" />
            </div>
            <div class="row col2">
              <Input v-model="product_name" placeholder="商品名称" size="large" style="width:90px" />
            </div>
            <div class="row col3">
              <Input v-model="product_price" placeholder="商品价格(￥)" size="large" style="width:90px" />
            </div>
            <div class="row col4">
              <Input
                v-model="product_txt"
                type="textarea"
                placeholder="商品描述"
                size="large"
                :autosize="{minRows: 3,maxRows: 5}"
                style="width:180px"
              />
            </div>
            <div class="row col5">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">点击上传图片</Button>
              </Upload>
            </div>
            <div class="row col6">
              <Select v-model="product_type" style="width:150px">
                <Option
                  v-for="item in product_typeList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
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
      product_id: "",
      product_name: "",
      product_price: "",
      product_txt:"",
      product_type: "",
      product_typeList: [
        {
          value: "1",
          label: "手机"
        },
        {
          value: "2",
          label: "平板"
        },
        {
          value: "3",
          label: "笔记本"
        },
        {
          value: "4",
          label: "配件"
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="less">
.addproduct {
  .content {
    width: 1000px;
    margin: auto;
    background-color: #e5e5e5;
    .view_title {
      color: #f61700;
      font-size: 25px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      margin-top: 20px;
    }
    .user {
      width: 100%;
      padding: 10px;
      background-color: #fff;
      .add {
        width: 100%;
        height: 300px;
        .table_head {
          background: rgba(89, 92, 99, 1);
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          &:after {
            content: "";
            display: table;
            clear: both;
            visibility: hidden;
            font-size: 0;
            height: 0;
          }
        }
        .table_body {
          font-size: 14px;
          line-height: 40px;
          &:after {
            content: "";
            display: table;
            clear: both;
            visibility: hidden;
            font-size: 0;
            height: 0;
          }
        }
        .col {
          height: 40px;
          line-height: 40px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          float: left;
        }
        .row {
          height: 100px;
          line-height: 40px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          float: left;
        }
        .col1 {
          width: 10%;
          text-align: center;
        }
        .col2 {
          width: 10%;
          text-align: center;
        }
        .col3 {
          width: 10%;
          text-align: center;
        }
        .col4 {
          width: 20%;
          text-align: center;
        }
        .col5 {
          width: 30%;
          text-align: center;
        }
        .col6 {
          width: 20%;
          text-align: center;
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