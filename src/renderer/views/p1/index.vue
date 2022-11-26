<template>
  <div class="Box">
    <router-link to="/">首页</router-link>
    <div class="box1" v-for="(item, index) in firstItem" :key="index">
      <canvas :id="`first_${index}`" style="width:40mm; height: 15mm;border: 1px solid black;"></canvas>
    </div>
    <p>图1</p>
    <div class="box2" v-for="(item, index) in secondItem" :key="index">
      <canvas :id="`second_${index}`"></canvas>
      <p>{{item.number}}</p>
    </div>
    <p>图2</p>
    <div class="box3" v-for="(item, index) in thirdItem" :key="index">
      <canvas :id="`third_${index}`"></canvas>
    </div>
    <p>图3</p>
    <div class="box4">
      <div class="box4-top">资产管理专用标签</div>
      <div class="box4-bottom">
        <canvas id="fourth"></canvas>
        <table class="box4-bottom-right">
          <tr>
            <td style="width: 11mm;">资产名称:</td>
            <td>春秋常服</td>
          </tr>
          <tr>
            <td style="width: 11mm">品 种 码:</td>
            <td>868749282</td>
          </tr>
          <tr>
            <td style="width: 11mm; ">单 件 码:</td>
            <td>1000000001000000010000001</td>
          </tr>
          <tr>
            <td style="width: 11mm">管理部门:</td>
            <td>xxx</td>
          </tr>

        </table>
      </div>
    </div>
    <p>图4</p>
    <div class="box6">
      <canvas id="sixth"></canvas>
      <p>品种码:868749282 零部件名:1/5</p>
    </div>
    <p>图6</p>
    <div class="box7">
      <canvas id="seventh" style="margin-left:8mm"></canvas>
      <p class="box7-p1">1000000001000000010000001</p>
      <p class="box7-p2">零部件名:1/5</p>
    </div>
    <p>图7</p>
  </div>
</template>
<script  lang="ts">
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
export default {
  data() {
    return {
      firstItem: ["81234567", "82345678", "83456789", "845678912", "856789123"],
      secondItem: [
        {
          msg: '11',
          number: '1000000001000000010000001'
        },
        {
          msg: '22',
          number: '1000000001000000010000002'
        },
        {
          msg: '33',
          number: '1000000001000000010000003'
        },
        {
          msg: '44',
          number: '1000000001000000010000004'
        },
        {
          msg: '55',
          number: '1000000001000000010000005'
        }],
      thirdItem: ["111", "222", "333", "444", "555"]
    }
  },
  mounted() {
    this.firstItem.forEach((val, index) => {
      this.createBarCode(index, val)
      console.log(index, val)
    })
    this.secondItem.forEach((val, index) => {
      console.log(index, val.msg,val.number)
      this.createQrcode(index, val)
    })
    this.thirdItem.forEach((val, index) => {
      console.log(index, val)
      this.createQrcode(index, val)
    })
  },
  methods: {
    createBarCode(index, number) {
      JsBarcode("#first_" + index, number, {
        background: "#fff",
        marginTop: this.$mmToPx(5),
        marginLeft: this.$mmToPx(5),
        marginRight: this.$mmToPx(5),
      });
    },
    createQrcode(id, val) {
      QRCode.toCanvas(document.getElementById("second_"+id), val.msg, {
        margin: 0,
        width: this.$mmToPx(34),
        height: this.$mmToPx(34),
      });
      QRCode.toCanvas(document.getElementById("third_" + id), val, {
        margin: 0,
        width: this.$mmToPx(10),
        height: this.$mmToPx(10),
      });
      QRCode.toCanvas(document.getElementById("fourth"), "123456", {
        margin: 0,
        width: this.$mmToPx(18),
        height: this.$mmToPx(18),
      });
      QRCode.toCanvas(document.getElementById("sixth"), "123456", {
        margin: 0,
        width: this.$mmToPx(34),
        height: this.$mmToPx(34),
      });
      QRCode.toCanvas(document.getElementById("seventh"), "123456", {
        margin: 0,
        width: this.$mmToPx(34),
        height: this.$mmToPx(34),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Box {
  margin-left: 100px;

  .box2 {
    width: 50mm;
    height: 50mm;
    border: 1px solid black;
    padding: 8mm;
    margin-top: 20px;

    p {
      font-size: 8pt;
      font-family: '黑体';
    }
  }

  .box3 {
    width: 15mm;
    height: 15mm;
    border: 1px solid black;
    padding: 2.5mm;
    margin-top: 20px;
  }

  .box4 {
    width: 70mm;
    height: 30mm;
    background: #fff;
    border: 1px solid black;

    &-top {
      height: 6mm;
      font-size: 10pt;
      font-family: '黑体';
      margin-top: 2mm;
      margin-left: 22mm;
    }

    &-bottom {
      display: flex;
      flex: row;
      padding-left: 2mm;

      &-right {
        width: 46mm;
        height: 18mm;
        font-size: 6pt;
        font-family: '黑体';
        margin-left: 4mm;
      }
    }
  }

  .box6 {
    width: 50mm;
    height: 50mm;
    border: 1px solid black;
    padding-left: 8mm;
    padding-top: 8mm;

    p {
      font-size: 6pt;
      font-family: '黑体';
    }
  }

  .box7 {
    width: 50mm;
    height: 50mm;
    border: 1px solid black;
    padding-top: 6mm;

    p {
      font-size: 6pt;
      font-family: '黑体';
      text-align: center;
    }

    &-p2 {
      margin-top: -2mm;
      text-align: center;

    }
  }
}
</style>