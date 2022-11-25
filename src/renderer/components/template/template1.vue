<template>
  <div class="tempate-box" :style="{'width':calcStyle()}">
    <canvas id="barCode" style="width:30mm; height: 10mm;"></canvas>
    <div class="text">{{templateData.A002}}</div>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
  name: 'Template1',
  props: {
    templateData: {
      type: Object,
      default() {
        return {};
      },
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      boxStyle: {
        width: '80mm',
        height: '30px'
      }
    }
  },
  mounted() {
    this.createBarCode()
  },
  methods: {
    calcStyle() {
      return `80mm`
    },
    createBarCode() {
      console.log(this.templateData)
      JsBarcode("#barCode", this.templateData.A002, {
        margin: 0,
        width: 1.5,
        height: this.$mmToPx(10),
        displayValue: false
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.tempate-box {
  width: 40mm;
  height: 15mm;
  border: 1px solid #000;
  padding-top: 2.5mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    height: 2.5mm;
    font-size: 6pt;
    font-family: "黑体";
  }
}
</style>
