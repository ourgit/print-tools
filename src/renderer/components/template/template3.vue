<template>
  <div :class="['tempate-box', {isEdit}]" style="display: flex;box-sizing: border-box;flex-direction: column;justify-content: center;align-items: center;overflow: hidden;" :style="{'width':$calcStyle(15,templateData.ratio,'mm'),'height':$calcStyle(15,templateData.ratio,'mm')}">
    <img :src="qrCodeUrl" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(10,templateData.ratio,'mm')}">
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template3',
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
  data() {
    return {
      qrCodeUrl: ''
    };
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
      const codeWidth = this.$calcRatio(30, this.templateData.ratio)
      const codeContent = '\u001E07\u001DA002' + this.templateData.A002 + '\u001DA003' + this.templateData.A003 + '\u001E\u0004'
      QRCode.toDataURL(codeContent, {
        errorCorrectionLevel: 'L',
        margin: 0,
        width: this.$mmToPx(codeWidth)
      }).then(res => {
        this.qrCodeUrl = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tempate-box {
  &.isEdit {
    border: 1px solid #000;
  }
}
</style>
