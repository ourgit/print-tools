<template>
  <div class="tempate-box" :style="{'width':$calcStyle(40,templateData.ratio,'mm'),'height':$calcStyle(15,templateData.ratio,'mm'),'paddingTop':$calcStyle(2.5,templateData.ratio,'mm')}">
    <canvas id="barCode" :style="{'width':$calcStyle(30,templateData.ratio,'mm'),'height':$calcStyle(10,templateData.ratio,'mm')}"></canvas>
    <div class="text" :style="{'height':$calcStyle(2.5,templateData.ratio,'mm'),'fontSize':$calcStyle(6,templateData.ratio,'pt')}">{{templateData.A002}}</div>
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

    }
  },
  mounted() {
    this.createBarCode()
  },
  methods: {
    createBarCode() {
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
  padding-top: 2.5mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    height: 2.5mm;
    font-size: 6pt;
    font-family: SimHei;
  }
}
</style>
