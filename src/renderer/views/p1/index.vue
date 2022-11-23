<template>
  <div class="Box">
    <div class="box1">
      <canvas id="first" style="width:40mm; height: 15mm;border: 1px solid black;"></canvas>
    </div>
    <p>图1</p>
    <div class="box2">
      <div class="box2-canvas"></div>
      <p>1000000001000000010000001</p>
    </div>
    <p>图2</p>
    <div class="box3">
      <div class="box3-canvas"></div>
    </div>
    <p>图3</p>
    <div class="box4">
      <div class="box4-top">资产管理专用标签</div>
      <div class="box4-bottom">
        <div class="box4-bottom-left"></div>
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
      <div class="box6-canvas"></div>
      <p>品种码:868749282 零部件名:1/5</p>
    </div>
    <p>图6</p>
    <div class="box7">
      <div class="box7-canvas"></div>
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
    return {}
  },
  mounted() {
    this.createBarCode();
    this.createQrcode();
  },
  methods: {
    createBarCode() {
      JsBarcode("#first", "868749282", {
        background: "#fff",
        marginTop:this.$mmToPx(5),
        marginLeft:this.$mmToPx(5),
        marginRight:this.$mmToPx(5),
      });
    },
    createQrcode() {
      QRCode.toCanvas(document.getElementById("second"), "111", {
        margin: 4,
        color: {
          light: "#fff",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Box {
  margin-left: 100px;
  .box2 {
    width:50mm;
    height: 50mm;
    border: 1px solid black;
    padding: 8mm;
    &-canvas{
      width: 34mm;
      height: 34mm;
      background: black;
    }
    p{
      font-size: 8pt;
      font-family: '黑体';
    }
  }
  .box3{
    width: 15mm;
    height: 15mm;
    border: 1px solid black;
    &-canvas{
      width: 10mm;
      height: 10mm;
      background: black;
      margin: 2.5mm;
    }
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
      &-left {
        width: 18mm;
        height: 18mm;
        background: black;
        margin-left: 2mm;
      }
      &-right {
        width: 46mm;
        height: 18mm;
        font-size: 6pt;
        font-family: '黑体';
        margin-left: 4mm;
      }
    }
  }
  .box6{
    width: 50mm;
    height: 50mm;
    border: 1px solid black;
    padding-left:8mm;
    padding-top: 8mm;
    &-canvas{
      width: 34mm;
      height: 34mm;
      background: black;
    }
    p{
      font-size: 6pt;
      font-family: '黑体';
    }
  }
  .box7{
    width: 50mm;
    height: 50mm;
    border: 1px solid black;
    padding-top: 6mm;
    &-canvas{
      width: 34mm;
      height: 34mm;
      background: black;
      margin-left: 8mm;
    }
    p{
      font-size: 6pt;
      font-family: '黑体';
      text-align: center;
    }
    &-p2{
      text-align: center;
      margin-top: -2mm;
      
    }
  }
}
</style>