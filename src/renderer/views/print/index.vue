<template>
  <div class="app-container">
    <router-link to="/">首页</router-link>
    <el-form>
      <el-form-item label="打印机列表">
        <el-select v-model="selectedPrinterName">
          <el-option v-for="item of printerList" :key="item.name" :value="item.name" :title="item.name">
          </el-option>
        </el-select>
        <el-button @click="print">打印</el-button>
      </el-form-item>
    </el-form>
    <webview id="printWebview" ref="printWebview" :src="fullPath" nodeintegration webpreferences="contextIsolation=no" style="visibility: hidden" />
    <section ref="print">
      <div class="title">一维码</div>
      <img id="barCode" style="width:30mm; height: 10mm;border: 1px solid #000;" />
      <div class="title">二维码</div>
      <canvas id="second"></canvas>
    </section>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import JsBarcode from 'jsbarcode'
import QRCode from "qrcode";
export default {
  data() {
    return {
      printerList: [],
      selectedPrinterName: '',
      fullPath: '/static/print.html',
    };
  },
  mounted() {
    this.createBarCode()
    this.createQrcode()
    this.getPrinters()
    const webview = this.$refs.printWebview;
    webview.addEventListener("ipc-message", (event) => {
      if (event.channel === "webview-print-do") {
        webview
          .print({
            silent: true,//静默打印
            printBackground: true,
            deviceName: this.selectedPrinterName, //打印机名称
          })
          .then((res) => {
            // this.messageBox.close();
          })
          .catch((err) => {
            // this.messageBox.close();
          })
          .finally(() => {
            // this.messageBox.close();
          });
      }
    });
  },
  methods: {
    createBarCode() {
      JsBarcode("#barCode", "868749282", {
        margin: 0,
        width: 1.5,
        height: this.$mmToPx(10),
        displayValue: false
      });
    },
    createQrcode() {
      QRCode.toCanvas(document.getElementById("second"), "123456", {
        margin: 0,
        width: this.$mmToPx(34)
      });
    },
    getPrinters() {
      ipcRenderer.send('getPrinterList')
      ipcRenderer.on('getPrinterList', (event, list) => {
        list.forEach((item) => {
          if (item.isDefault) {
            this.selectedPrinterName = item.name;
          }
        });
        this.printerList = list
      })
    },
    print() {
      this.$print(this.$refs.print, this.selectedPrinterName, this.$refs.printWebview)
    }
  }
};
</script>

<style lang="scss" scoped>
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
.title {
  font-size: 40px;
}
</style>

