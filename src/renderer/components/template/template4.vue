<template>
  <div :class="['tempate-box', {isEdit}]" style="display: flex;box-sizing: border-box;flex-direction: column;overflow: hidden;" :style="{'width':$calcStyle(70,templateData.ratio,'mm'),'height':$calcStyle(30,templateData.ratio,'mm')}">
    <div style="font-family: '黑体';font-weight: 700;display: flex;justify-content: center;align-items: center;" :style="{'fontSize':$calcStyle(10,templateData.ratio,'pt'),'height':$calcStyle(8,templateData.ratio,'mm')}" @click="updateItem('Title')">
      {{ templateData.showTitle ? templateData.TitleLabel : ''}}
    </div>
    <div style="display: flex;box-sizing: border-box;align-items: center;" :style="{'paddingLeft':$calcStyle(4,templateData.ratio,'mm'),'paddingRight':$calcStyle(2,templateData.ratio,'mm')}">
      <div :style="{'width':$calcStyle(18,templateData.ratio,'mm')}">
        <img :src="qrCodeUrl" :style="{'width':$calcStyle(18,templateData.ratio,'mm'),'height':$calcStyle(18,templateData.ratio,'mm')}">
      </div>
      <div style="flex: 1;display: flex;box-sizing: border-box;flex-direction: column;font-family: '黑体';" :style="{'fontSize':$calcStyle(7,templateData.ratio,'pt'),'marginLeft':$calcStyle(2,templateData.ratio,'mm')}">
        <div style="margin-bottom: 1mm;" v-if="templateData.showA001" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A001')">{{  templateData.A001Label + ':' + templateData.A001 }}</div>
        <div style="margin-bottom: 1mm;" v-if="templateData.showA002" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A002')">{{ templateData.A002Label + ':' + templateData.A002}}</div>
        <div style="margin-bottom: 1mm;" v-if="templateData.showA003" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A003')">{{ templateData.A003Label + ':' + templateData.A003}}</div>
        <div style="margin-bottom: 1mm;" v-if="templateData.showdept" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('dept')">{{ templateData.deptLabel + ':' + templateData.dept}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template4',
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
      const codeWidth = this.$calcRatio(18, this.templateData.ratio)
      const codeContent = '\u001E07\u001DA002' + this.templateData.A002 + '\u001DA003' + this.templateData.A003 + '\u001DA001' + this.templateData.A001 + '\u001E\u0004'
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
