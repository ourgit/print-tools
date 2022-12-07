<template>
  <div :class="['tempate-box', {isEdit}]" style="display: flex;flex-direction: column;box-sizing: border-box;align-items: center;overflow: hidden;" :style="{'width':$calcStyle(40,templateData.ratio,'mm'),'height':$calcStyle(15,templateData.ratio,'mm'),'paddingTop':$calcStyle(2.5,templateData.ratio,'mm')}">
    <canvas id="barCode" :style="{'width':$calcStyle(30,templateData.ratio,'mm'),'height':$calcStyle(10,templateData.ratio,'mm')}"></canvas>
    <div style="font-family: '黑体'" :style="{'height':$calcStyle(2.5,templateData.ratio,'mm'),'fontSize':$calcStyle(6,templateData.ratio,'pt')}" @click="updateItem('A002')">
      {{ templateData.showA002 ? templateData.A002 : ''}}
    </div>
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
        this.createBarCode()
      }
    }
  },
  mounted() {
    console.log(this.templateData)
    this.createBarCode()
  },
  methods: {
    createBarCode() {
      const barCodeWidth = this.$calcRatio(1, this.templateData.ratio)
      const barCodeHight = this.$calcRatio(10, this.templateData.ratio)
      JsBarcode("#barCode", this.templateData.A002, {
        margin: 0,
        width: barCodeWidth > 1 ? barCodeHight : 1,
        height: this.$mmToPx(barCodeHight),
        displayValue: false
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
  &.isEdit {
    border: 1px solid #000;
  }
}
</style>
