<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="打印机列表">
        <el-select v-model="selectedPrinterName">
          <el-option v-for="item of printerList" :key="item.name" :value="item.name" :title="item.name">
          </el-option>
        </el-select>
        <el-button @click="print">打印</el-button>
      </el-form-item>
    </el-form>
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
import { ipcRenderer } from 'electron'
import JsBarcode from 'jsbarcode'
export default {
  data() {
    return {
      printerList: [],
      selectedPrinterName: ''
    };
  },
  mounted() {
    this.createBarCode()
    this.getPrinters()
    ipcRenderer.on('get-printers', (event, list) => {
      console.log('list', list)
      this.printerList = list
    })
  },
  methods: {
    createBarCode() {
      JsBarcode('#barCode', 'DY123456488', {
        background: '#eee',
        displayValue: false,
        height: 80, // 一维码的高度
        margin: 0 // 一维码与容器的margin
      })
    },
    getPrinters() {
      ipcRenderer.send('get-printers')
    },
    print() {
      const tempalteHtml = '<div style="height: 20px; width: 100%;">测试打印</div>'
      ipcRenderer.send('do-print', {
        printerName: this.selectedPrinterName,
        html: tempalteHtml
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

