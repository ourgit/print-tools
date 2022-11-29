<template>
  <div :class="['tempate-box', {isEdit}]" :style="{'width':$calcStyle(100,templateData.ratio,'mm'),'height':$calcStyle(50,templateData.ratio,'mm'),'padding':$calcStyle(2,templateData.ratio,'mm')}">
    <div class="content" :style="{'height':$calcStyle(45,templateData.ratio,'mm')}">
      <div class="left-box" :style="{'width':$calcStyle(40,templateData.ratio,'mm')}">
        <div class="qrcode" :style="{'height':$calcStyle(36,templateData.ratio,'mm')}">
          <img :src="qrCodeUrl" :style="{'width':$calcStyle(34,templateData.ratio,'mm'),'height':$calcStyle(34,templateData.ratio,'mm')}">
        </div>
        <div class="left-text" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A002')">{{ templateData.showA002 ?  templateData.A002Label + ':' + templateData.A002 : ''}}</div>
      </div>
      <div class="right-box">
        <div class="text-item" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A001')">
          <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA001 ? templateData.A001Label : ''}}</div>
          <div class="value" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA001 ? templateData.A001 : ''}}</div>
        </div>
        <div class="text-item" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A005')">
          <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA005 ? templateData.A005Label : ''}}</div>
          <div class="value" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA005 ? templateData.A005 : ''}}</div>
        </div>
        <div class="text-inline" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">
          <div class="inline-item" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A006')">
            <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA006 ? templateData.A006Label : ''}}</div>
            <div class="value border-right" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA006? templateData.A006 : ''}}</div>
          </div>
          <div class="inline-item" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A007')">
            <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA007 ? templateData.A007Label : ''}}</div>
            <div class="value" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA007 ? templateData.A007 : ''}}</div>
          </div>
        </div>
        <div class="text-inline" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">
          <div class="inline-item" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A902')">
            <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA902 ? templateData.A902Label : ''}}</div>
            <div class="value border-right" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA902 ? templateData.A902 : ''}}</div>
          </div>
          <div class="inline-item" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A051')">
            <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA051 ? templateData.A051Label : ''}}</div>
            <div class="value" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA051 ? templateData.A051 : ''}}</div>
          </div>
        </div>
        <div class="text-item last" :style="{'height':$calcStyle(9,templateData.ratio,'mm'),'fontSize':$calcStyle(7,templateData.ratio,'pt')}" @click="updateItem('A010')">
          <div class="label" :style="{'width':$calcStyle(10,templateData.ratio,'mm'),'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA010 ? templateData.A010Label : ''}}</div>
          <div class="value" :style="{'height':$calcStyle(9,templateData.ratio,'mm')}">{{ templateData.showA010 ? templateData.A010 : ''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: 'Template9',
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
      const codeContent = '\u001E07\u001DA002' + this.templateData.A002 + '\u001DA051' + this.templateData.A051 + '\u001DA007' + this.templateData.A007 + '\u001E\u0004'
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
  width: 100mm;
  height: 50mm;
  padding: 2mm;
  box-sizing: border-box;
  overflow: hidden;
  &.isEdit {
    border: 1px solid #000;
  }
  .content {
    height: 45mm;
    display: flex;
    border: 1px solid #000;
    .left-box {
      width: 40mm;
      border-right: 1px solid #000;
      .qrcode {
        height: 36mm;
        border-bottom: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .left-text {
        height: 9mm;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 8pt;
        font-family: SimHei;
      }
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-family: SimHei;
      .text-inline {
        display: flex;
        height: 9mm;
        border-bottom: 1px solid #000;
        .inline-item {
          flex: 1;
          height: 9mm;
          display: flex;
          font-size: 8pt;
          .label {
            height: 9mm;
            width: 10mm;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #000;
            padding: 0 0.5mm;
          }
          .value {
            flex: 1;
            height: 9mm;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .border-right {
        border-right: 1px solid #000;
      }
      .text-item {
        display: flex;
        width: 100%;
        height: 9mm;
        align-items: center;
        font-size: 8pt;
        border-bottom: 1px solid #000;
        &.last {
          border-bottom: 0;
        }
        .label {
          height: 9mm;
          width: 10mm;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #000;
          padding: 0 0.5mm;
        }
        .value {
          flex: 1;
          height: 9mm;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
