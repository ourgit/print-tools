<template>
  <div class="app-container">
    <div class="barcode">
      <div class="title">一维码</div>
      <canvas id="barCode"></canvas>
    </div>
    <div class="barcode">
      <div class="title">二维码</div>
      <canvas id="qrcode" width="200" height="200"></canvas>
    </div>
    <el-upload ref="upload" action="" style="margin: 0 10px" :on-change="importExcel" :auto-upload="false" :show-file-list="false">
      <el-button size="small" type="warning" icon="el-icon-upload2">导入数据</el-button>
    </el-upload>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
import UQRCode from 'uqrcodejs'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      qrcodeText: '123456789',
    };
  },
  mounted() {
    this.createBarCode()
    this.createQrcode()
  },
  methods: {
    createBarCode() {
      JsBarcode('#barCode', 'DY123456488', {
        background: '#eee',
        displayValue: false,
        height: 80, // 一维码的高度
        margin: 10 // 一维码与容器的margin
      })
    },
    createQrcode() {
      // 获取uQRCode实例
      var qr = new UQRCode();
      // 设置二维码内容
      qr.data = "12345678";
      // 设置二维码大小，必须与canvas设置的宽高一致
      qr.size = 200;
      // 调用制作二维码方法
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
    importExcel(file) {
      const files = { 0: file.raw }
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error('上传格式错误!')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = e => {
        try {
          const data = e.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
          console.log(ws)

        } catch (e) {
          this.$Message.error('解析失败!')
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

