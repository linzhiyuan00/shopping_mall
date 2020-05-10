<template>
  <div class="addproduct">
    <div class="content">
      <div class="view_title">添加商品</div>
      <div class="user">
        <div class="company_logo clearfloat">
          <div class="add_img1">
            <input
              title="点击选择文件"
              class="upload_input"
              type="file"
              id="fileinput1"
              @change="changepic"
              accept=".jpg, .png"
            />
            <img class="add_pic" id="showimg" src="../assets/add_pic@2x.png" alt />
            <span>添加商品图片</span>
          </div>
        </div>
        <Form ref="goodsdata" :model="goodsdata" :rules="ruleValidate" :label-width="80">
          <FormItem label="商家id" prop="id">
            <Input v-model="goodsdata.id" placeholder="输入商家id"></Input>
          </FormItem>
          <FormItem label="商品名称" prop="name">
            <Input v-model="goodsdata.name" placeholder="输入商品名称"></Input>
          </FormItem>
          <FormItem label="商品价格" prop="price">
            <Input v-model="goodsdata.price" placeholder="输入商品价格"></Input>
          </FormItem>
          <FormItem label="商品品牌" prop="brand">
            <Input v-model="goodsdata.brand" placeholder="输入商品品牌"></Input>
          </FormItem>
          <FormItem label="商品简介" prop="sketch">
            <Input
              v-model="goodsdata.sketch"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入商品简介"
            ></Input>
          </FormItem>
          <FormItem label="商品详情" prop="detailed">
            <Input
              v-model="goodsdata.detailed"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入商品详情"
            ></Input>
          </FormItem>
          <FormItem label="商品类型" prop="classification">
            <Select v-model="goodsdata.classification" placeholder="选择商品类型">
              <Option
                v-for="classifyitem in product_typeList"
                :key="classifyitem.value"
                :value="classifyitem.value"
              >{{classifyitem.label}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('goodsdata')">提交</Button>
            <Button @click="handleReset('goodsdata')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
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
      product_txt: "",
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
      ],
      goodsdata: {
        id: "",
        name: "",
        price: "",
        brand: "",
        sketch: "",
        detailed: "",
        classification: ""
      },
      ruleValidate: {
        id: [
          {
            required: true,
            message: "商家id不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "商品价格不能为空",
            trigger: "blur"
          }
        ],
        brand: [
          {
            required: true,
            message: "商品品牌不能为空",
            trigger: "blur"
          }
        ],
        sketch: [
          {
            required: true,
            message: "商品简介不能为空",
            trigger: "blur"
          }
        ],
        detailed: [
          {
            required: true,
            message: "商品详情不能为空",
            trigger: "blur"
          }
        ],
        classification: [
          {
            required: true,
            message: "商品类型不能为空",
            trigger: "blur"
          }
        ]
      },
      image: {},
      logo: "",
      img_bg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAFcklEQVR4Xu2cMW5aQRCGZ3lygRCUmEfpxhdw6ygXiG/jJpGbKEqT2yQXiJQ2F3DjkmcoQRaFBRstEpatFKOJho0Zf1Qu9s14vvn082g2CR8IOBJIz2stFovLzWZzLSIXOefWsQ+lghFIKXUi8rtpmm/j8fjXfrwnoe7v7z/mnL/knF9IFowD4zgTSCltU0o3k8nkaym9k2c2m71LKf0sfw+Hw9Tv96XX6zm3plwkAtvtVtbrtaxWqywiuWma9yWpdkJ1Xfc95/xhNBrJYDCINDezHJjAw8ODLJdLSSn9aNv2ai/UrLwznZ6ekkwHXkC08iWp5vN5Eapr23a6/8orsSVty3t4tIXXmKfryvu5yHQ6TQhVg3jwHggVfMG1x0Oo2sSD90Oo4AuuPR5C1SYevB9CBV9w7fEQqjbx4P0QKviCa4+HULWJB++HUMEXXHs8hKpNPHg/hAq+4NrjIVRt4sH7IVTwBdceD6FqEw/eD6GCL7j2eAhVm3jwfggVfMG1x0Oo2sSD90Oo4AuuPR5C1SYevB9CBV9w7fEQqjbx4P0QKviCa4+HULWJB++HUMEXXHs8hKpNPHg/hAq+4NrjIVRt4sH7IVTwBdceD6FqEw/eD6GCL7j2eAhVm3jwfggVfMG1x0Oo2sSD90Mow4LLLbflUtLyKZfackvy3/AQyiDU3d2dPD4+7p44OTmRs7Mzw9Nv4yhCGfZ8e3v74vT5+bnh6bdxFKEMe0YoHRZC6YyeTiCUDguhdEYIZWCEUAZYJJQOC6F0RiSUgRFCGWCRUDoshNIZkVAGRghlgEVC6bAQSmdEQhkYIZQBFgmlw0IonREJZWCEUAZYJJQOC6F0RiSUgRFCGWCRUDoshNIZkVAGRghlgEVC6bAQSmdEQhkYIZQBFgmlw0IonREJZWCEUAZYJJQOC6F0RiSUgRFCGWCRUDoshNIZkVAGRghlgEVC6bAQSmdEQhkYIZQBFgmlw0IonREJZWB0lELtb0HZX1xhmPeoj5YLOl77rS9HKdTzW1CO2pB/+Odf+60vCPUPS/2fjyDUAejzlTc4AFWfkkeZUD6j26vwK09nhlA6I37lGRghlAEWCaXDQiidEQllYIRQBlgklA4LoXRGJJSBEUIZYJFQOiyE0hmRUAZGCGWARULpsBBKZ0RCGRghlAEWCaXDQiidEQllYIRQBlgklA4LoXRGJJSBEUIZYJFQOiyE0hmRUAZGCGWARULpsBBKZ0RCGRghlAEWCaXDQiidEQllYIRQBlgklA4LoXRGJJSBEUIZYJFQOiyE0hmRUAZGCGWARULpsBBKZ0RCGRghlAEWCaXDQiidEQllYIRQBljPrxF67begGMZyPYpQBpz7W1/KI6/94i/DWK5HEcoVJ8UQCgdcCSCUK06KIRQOuBJAKFecFEMoHHAlgFCuOCmGUDjgSgChXHFSDKFwwJUAQrnipBhC4YArAYRyxUkxhMIBVwII5YqTYgiFA64EEMoVJ8UQCgdcCSCUK06KIRQOuBJAKFecFEMoHHAlgFCuOCmGUDjgSgChXHFSDKFwwJUAQrnipBhC4YArAYRyxUkxhMIBVwII5YqTYgiFA64EEMoVJ8UQCgdcCSCUK06KIRQOuBL4S6iu62Y557ZcStrr9VybUSw2ge12K/P5XFJKXdu201TG7brue875w2g0ksFgEJsA07kSKLckL5fLItSPtm2vdkItFovLzWbzU0TScDhM/X6fpHLFHq9YSab1ei2r1SqLSG6a5v14PP61E6p8ZrPZp5TS55wz33nx9n+wiVJK25TSzWQy+VqaPAn1LKmuReSivFMd7L+g8NETKO9MIvK7aZpvJZn2A70Q6uinZID/TuAPJ9kg4ApUs5IAAAAASUVORK5CYII="
    };
  },
  methods: {
    changepic() {
      let that = this;
      let a = document.getElementById("fileinput1");
      let img = document.getElementById("showimg");
      let file = a.files[0];

      let type = file.name
        .toLowerCase()
        .split(".")
        .splice(-1)
        .join("");
      let imageformdata = {};
      let fileimage = new Promise((res, rej) => {
        if (type == "jpg" || type == "png") {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            imageformdata = new FormData();
            imageformdata.append("image", file);
            that.image = imageformdata;
            res(true);
          };
        } else {
          a.value = "";
          let img = document.getElementById("showimg");
          img.setAttribute("src", that.img_bg);
          that.$Message.error("图片格式错误,仅支持jpg,png格式");
          res(false);
        }
      });
      fileimage.then(res => {
        if (res) {
          that.$http_formdata.post("fastDfs/upload", that.image).then(res => {
            console.log(res);
            if (res.data.code == 101) {
              let img = document.getElementById("showimg");
              img.setAttribute("src", res.data.data);
              that.logo = res.data.data;
              that.$Message.success("图片上传成功！");
            } else {
              that.$Message.error(res.data.message);
            }
          });
        } else {
          console.log("111");
          return;
        }
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.image, Object.prototype.toString.call(this.image));
          if (Object.prototype.toString.call(this.image) == "[object Object]") {
            this.$Message.error("商品图片不能为空！");
          } else {
            let data = {
              store_id: this.goodsdata.id,
              classification: this.goodsdata.classification,
              goods_name: this.goodsdata.name,
              goods_price: this.goodsdata.price,
              goods_brand: this.goodsdata.brand,
              goods_sketch: this.goodsdata.sketch,
              goods_detailed: this.goodsdata.detailed,
              logo: this.logo
            };
            this.$http.post("kxlGoods/insertGoods", data).then(res => {
              if (res.data.code == 101) {
                this.$Message.success("商品添加成功！");
                this.handleReset();
              }
            });
          }
        } else {
          console.log(this.image, Object.prototype.toString.call(this.image));
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      let img = document.getElementById("showimg");
      img.setAttribute("src", this.img_bg);
    }
  },
  mounted() {}
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
      padding: 20px 200px;
      background-color: #fff;
      .company_logo {
        width: 100%;
        height: 150px;
        padding: 15px;
        font-size: 12px;
        .add_img1 {
          width: 92px;
          height: 92px;
          margin-left: 200px;
          border: solid 1px #e5e5e5;
        }
        .add_pic {
          width: 90px;
          height: 90px;
        }
        .ivu-switch-large.ivu-switch-checked:after {
          left: 50px;
        }
        .paytext {
          float: left;
          position: relative;
          left: 70px;
          top: 30px;
          color: #333333;
          line-height: 20px;
        }
        .payswitch {
          float: right;
          position: relative;
          top: 30px;
        }
        .upload_input {
          position: absolute;
          width: 90px;
          height: 90px;
          opacity: 0;
          cursor: pointer;
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