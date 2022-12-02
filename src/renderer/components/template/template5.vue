<template>
  <div :class="['tempate-box', {isEdit}]" style="box-sizing: border-box;overflow: hidden;" :style="{'width':$calcStyle(100,templateData.ratio,'mm'),'height':$calcStyle(50,templateData.ratio,'mm'),'padding':$calcStyle(2,templateData.ratio,'mm')}">
    <div style="display: flex;border: 1px solid #000;overflow: hidden;" :style="{'height':$calcStyle(45,templateData.ratio,'mm')}">
      <div style="border-right: 1px solid #000;" :style="{'width':$calcStyle(40,templateData.ratio,'mm')}">
        <div style="border-bottom: 1px solid #000;display: flex;justify-content: center;align-items: center;" :style="{'height':$calcStyle(36,templateData.ratio,'mm')}">
          <img :src="qrCodeUrl" :style="{'width':$calcStyle(34,templateData.ratio,'mm'),'height':$calcStyle(34,templateData.ratio,'mm')}">
        </div>
        <div style="display: flex;justify-content: center;align-items: center;font-family: SimHei;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A002')">{{ templateData.showA002 ?  templateData.A002Label + ':' + templateData.A002 : ''}}</div>
      </div>
      <div style="flex: 1;display: flex;flex-direction: column;font-family: SimHei;">
        <div style="display: flex;width: 100%;align-items: center; border-bottom: 1px solid #000;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A001')">
          <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;padding: 0 0.5mm;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA001 ? templateData.A001Label : ''}}</div>
          <div style="flex: 1;display: flex; justify-content: center;align-items: center;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA001 ? templateData.A001 : ''}}</div>
        </div>
        <div style="display: flex;width: 100%;align-items: center; border-bottom: 1px solid #000;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A005')">
          <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;padding: 0 0.5mm;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA005 ? templateData.A005Label : ''}}</div>
          <div style="flex: 1;display: flex; justify-content: center;align-items: center;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA005 ? templateData.A005 : ''}}</div>
        </div>
        <div style="display: flex;border-bottom: 1px solid #000;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">
          <div style="flex: 1;display: flex;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A006')">
            <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm'),'paddingLeft': $calcStyle(2,templateData.ratio,'mm'),'paddingRight': $calcStyle(2,templateData.ratio,'mm')}">{{ templateData.showA006 ? templateData.A006Label : ''}}</div>
            <div style=" flex: 1;display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA006? templateData.A006 : ''}}</div>
          </div>
          <div style="flex: 1;display: flex;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A052')">
            <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;padding: 0 0.5mm;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA052 ? templateData.A052Label : ''}}</div>
            <div style=" flex: 1;display: flex;justify-content: center;align-items: center;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA052 ? templateData.A052 : ''}}</div>
          </div>
        </div>
        <div style="display: flex;border-bottom: 1px solid #000;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">
          <div style="flex: 1;display: flex;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A010')">
            <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm'),'paddingLeft': $calcStyle(2,templateData.ratio,'mm'),'paddingRight': $calcStyle(2,templateData.ratio,'mm')}">{{ templateData.showA010 ? templateData.A010Label : ''}}</div>
            <div style=" flex: 1;display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(6,templateData.ratio,'pt')}">{{ templateData.showA010 ? templateData.A010 : ''}}</div>
          </div>
          <div style="flex: 1;display: flex;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A902')">
            <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm'),'paddingLeft': $calcStyle(2,templateData.ratio,'mm'),'paddingRight': $calcStyle(2,templateData.ratio,'mm')}">{{ templateData.showA902 ? templateData.A902Label : ''}}</div>
            <div style="flex: 1;display: flex;justify-content: center;align-items: center;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA902 ? templateData.A902 : ''}}</div>
          </div>
        </div>
        <div style="display: flex;width: 100%;align-items: center;" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A003')">
          <div style="display: flex;justify-content: center;align-items: center;border-right: 1px solid #000;padding: 0 0.5mm;" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA003 ? templateData.A003Label : ''}}</div>
          <div style="flex: 1;display: flex; justify-content: center;align-items: center;" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA003 ? templateData.A003 : ''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template5',
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
      const codeContent = '\u001E07\u001DA002' + this.templateData.A002 + '\u001DA003' + this.templateData.A003 + '\u001DA052' + this.templateData.A052 + '\u001E\u0004'
      QRCode.toDataURL(codeContent, {
        margin: 0,
        width: this.$mmToPx(codeWidth)
      }).then(res => {
        this.qrCodeUrl = res
      })
    },
    updateItem(e) {
      console.log(e)
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
