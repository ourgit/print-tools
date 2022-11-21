<template>
  <div class="app-container">
    <div class="print-wrap">
      <div class="title">一维码</div>
      <canvas id="barCode" class="barcode"></canvas>
      <div class="btn">
        <el-button size="small" type="warning">打印</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.createBarCode()
  },
  methods: {
    createBarCode() {
      JsBarcode('#barCode', 'DY123456488', {
        background: '#eee',
        displayValue: false,
        height: 80, // 一维码的高度
        margin: 0 // 一维码与容器的margin
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@page {
  margin: 0;
}
.print-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .tltle {
    margin: 10px 0;
  }
  .barcode {
    width: 20mm;
    height: 10mm;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>

