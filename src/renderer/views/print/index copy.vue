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
    <section style="border:1px solid #000">
      <div class="title">一维码</div>
      <canvas id="barCode" class="barcode"></canvas>
    </section>
    <section ref="print">
      <div class="title">二维码</div>
      <div class="code" style="width:34mm; height: 34mm;border: 1px solid #000;overflow: hidden;">
        1111
      </div>
      <!-- <img src="http://tool.blxzx.com/qrcode.png" style="width:34mm; height: 34mm;border: 1px solid #000;"> -->
      <canvas id="qrcode"></canvas>
    </section>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import JsBarcode from 'jsbarcode'
import UQRCode from 'uqrcodejs'
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
      JsBarcode('#barCode', 'DY123456488', {
        background: '#eee',
        displayValue: false,
        height: 80, // 一维码的高度
        margin: 0 // 一维码与容器的margin
      })
    },
    createQrcode() {
      // 获取uQRCode实例
      var qr = new UQRCode();
      // 设置二维码内容
      qr.data = "123456";
      // 设置二维码大小，必须与canvas设置的宽高一致
      // 调用制作二维码方法
      qr.size = this.$mmToPx(34)
      qr.make();
      // 获取canvas元素
      var canvas = document.getElementById("qrcode");
      // 获取canvas上下文
      var canvasContext = canvas.getContext("2d");
      // 设置uQRCode实例的canvas上下文
      qr.canvasContext = canvasContext;
      // 调用绘制方法将二维码图案绘制到canvas上
      qr.drawCanvas();
    },
    getPrinters() {
      ipcRenderer.send('getPrinterList')
      ipcRenderer.on('getPrinterList', (event, list) => {
        list.forEach((item) => {
          if (item.isDefault) {
            this.selectedPrinterName = item.name;
          }
        });
        console.log('list', list)
        this.printerList = list
      })
    },
    printRender() {
      // this.messageBox = this.$message({
      //   type: 'warning',
      //   message: "打印中，请稍后",
      //   duration: 0,
      // });
      // 获取<webview>节点
      const webview = this.$refs.printWebview;
      console.log('webview', webview);
      webview.send("webview-print-render", {
        printName: this.selectedPrinterName,
        html: this.$print(this.$refs.print).dom.outerHTML,
      });
    },
    print() {
      this.$print(this.$refs.print, this.selectedPrinterName, this.$refs.printWebview)
      // this.$print(this.$refs.print)
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

