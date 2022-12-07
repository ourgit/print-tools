<template>
  <div :class="['tempate-box', {isEdit}]" style="display: flex;box-sizing: border-box;flex-direction: column;align-items: center;overflow: hidden;" :style="{'width':$calcStyle(50,templateData.ratio,'mm'),'height':$calcStyle(50,templateData.ratio,'mm'),'paddingTop':$calcStyle(8,templateData.ratio,'mm')}">
    <img :src="qrCodeUrl" :style="{'width':$calcStyle(34,templateData.ratio,'mm'),'height':$calcStyle(34,templateData.ratio,'mm')}">
    <div style="font-family: '黑体';display: flex;box-sizing: border-box;align-items: center;" :style="{'height':$calcStyle(8,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}">
      <span style="margin-right:10px" @click="updateItem('A002')">{{ templateData.showA002 ?  templateData.A002Label + ':' + templateData.A002 : ''}}</span>
      <span @click="updateItem('A007')">{{ templateData.showA007 ? templateData.A007Label + ':' + templateData.A007 : ''}}</span>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template6',
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
      const codeWidth = this.$calcRatio(34, this.templateData.ratio)
      const codeContent = '\u001E07\u001DA002' + this.templateData.A002 + '\u001DA007' + this.templateData.A007 + '\u001E\u0004'
      QRCode.toDataURL(codeContent, {
        margin: 0,
        width: this.$mmToPx(codeWidth)
      }).then(res => {
        this.qrCodeUrl = res
      })
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
  &.isEdit {
    border: 1px solid #000;
  }
}
</style>
