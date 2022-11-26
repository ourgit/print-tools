<template>
  <div :class="['tempate-box', {isEdit}]" :style="{'width':$calcStyle(70,templateData.ratio,'mm'),'height':$calcStyle(30,templateData.ratio,'mm')}">
    <div class="title" :style="{'fontSize':$calcStyle(10,templateData.ratio,'pt'),'height':$calcStyle(8,templateData.ratio,'mm')}" @click="updateItem('Title')">
      {{ templateData.showTitle ? templateData.TitleLabel : ''}}
    </div>
    <div class="content">
      <canvas id="qrcode"></canvas>
      <div class="text-list" :style="{'fontSize':$calcStyle(7,templateData.ratio,'pt'),'marginLeft':$calcStyle(2,templateData.ratio,'mm')}">
        <div class="text-item" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A001')">{{ templateData.showA001 ?  templateData.A001Label + ':' + templateData.A001 : ''}}</div>
        <div class="text-item" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A002')">{{ templateData.showA002 ?  templateData.A002Label + ':' + templateData.A002 : ''}}</div>
        <div class="text-item" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('A003')">{{ templateData.showA003 ?  templateData.A003Label + ':' + templateData.A003 : ''}}</div>
        <div class="text-item" :style="{'marginBottom':$calcStyle(1,templateData.ratio,'mm')}" @click="updateItem('dept')">{{ templateData.showDept ?  templateData.deptLabel + ':' + templateData.dept : ''}}</div>
      </div>
    </div>
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
      const codeWidth = this.$calcRatio(18, this.templateData.ratio)
      QRCode.toCanvas(document.getElementById("qrcode"), this.templateData.A003, {
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
  width: 70mm;
  height: 30mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  &.isEdit {
    border: 1px solid #000;
  }
  .title {
    height: 8mm;
    font-size: 10pt;
    font-family: SimHei;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
  .content {
    display: flex;
    align-items: center;
    .text-list {
      margin-left: 2mm;
      display: flex;
      flex-direction: column;
      font-size: 7pt;
      font-family: SimHei;
      .text-item {
        margin-bottom: 1mm;
      }
    }
  }
}
</style>
