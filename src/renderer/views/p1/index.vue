<template>
  <div class="Box">
    <div class="box1">
      <canvas id="first" ></canvas>
    </div>
    <div class="box2">
      <canvas id="second"></canvas>
    </div>
    <div class="box3">
      <div class="box3-top">资产管理专用标签</div>
      <div class="box3-bottom">
        <div class="box3-bottom-left"></div>
        <div class="box3-bottom-right">
          <p>资产名称:春秋常服</p>
          <p>品种码:868749282</p>
          <p>单件码:100000000100000001000001</p>
          <p>管理部门:xxx</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script  lang="ts">
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
export default {
  data() {
    return {};
  },
  mounted() {
    this.createBarCode();
    this.createQrcode();
  },
  methods: {
    createBarCode() {
      JsBarcode("#first", "868749282", {
        background: "#fff",
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
  background: #eee;
  position: relative;
  .box1 {
    padding-top: 20px;
    margin-left: 50px;
    #first{
      width: 40mm;
      height: 15mm;
    }
  }
  .box2 {
    margin-top: 50px;
    margin-left: 50px;
  }
  .box3 {
    width: 70mm;
    height: 30mm;
    background: #fff;
    position: absolute;
    top: 50px;
    left: 300px;
    &-top {
      height: 6mm;
      font-size: 10pt;
      margin-top: 2mm;
      margin-left: 22mm;
      margin-bottom: 2mm;
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
        margin-left: 4mm;
        margin-top: -2mm;
      }
    }
  }
}
</style>