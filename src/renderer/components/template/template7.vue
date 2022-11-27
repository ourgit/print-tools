<template>
  <div :class="['tempate-box', {isEdit}]" :style="{'width':$calcStyle(50,templateData.ratio,'mm'),'height':$calcStyle(50,templateData.ratio,'mm'),'paddingTop':$calcStyle(6,templateData.ratio,'mm')}">
    <canvas id="qrcode"></canvas>
    <div class="text" :style="{'fontSize':$calcStyle(7,templateData.ratio,'pt')}">
      <div class="text-item" :style="{'paddingTop':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A003')">{{ templateData.showA003 ? templateData.A003 : ''}}</div>
      <div class="text-item" :style="{'paddingTop':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A007')">{{ templateData.showA007 ? templateData.A007Label + ':' + templateData.A007 : ''}}</div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template7',
  props: {
    templateData: {
      type: Object,
      default() {
        return {};
      },
    },
    ratio: {
      type: Number,
      default: 100
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    ratio: {
      handler(e) {
        this.createQrcode()
      }
    }
  },
  mounted() {
    this.createQrcode()
  },
  methods: {
    createQrcode() {
      const codeWidth = this.$calcRatio(34, this.templateData.ratio)
      QRCode.toCanvas(document.getElementById("qrcode"), this.templateData.A002, {
        margin: 0,
        width: this.$mmToPx(codeWidth)
      });
    },
    updateItem(e) {
      if (!this.isEdit) return
      this.$emit('updateItem', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.tempate-box {
  width: 50mm;
  height: 50mm;
  padding-top: 6mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  &.isEdit {
    border: 1px solid #000;
  }
  .text {
    font-size: 7pt;
    font-family: SimHei;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text-item {
      padding-top: 1mm;
    }
  }
}
</style>
