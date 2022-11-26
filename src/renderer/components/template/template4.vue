<template>
  <div :class="['tempate-box', {isEdit}]" :style="{'width':$calcStyle(15,templateData.ratio,'mm'),'height':$calcStyle(15,templateData.ratio,'mm')}">
    <canvas id="qrcode"></canvas>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template1',
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
      const codeWidth = this.$calcRatio(10, this.templateData.ratio)
      QRCode.toCanvas(document.getElementById("qrcode"), this.templateData.A003, {
        margin: 0,
        width: this.$mmToPx(codeWidth)
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.tempate-box {
  width: 15mm;
  height: 15mm;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.isEdit {
    border: 1px solid #000;
  }
}
</style>
