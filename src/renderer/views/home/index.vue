<template>
  <div class="app-container">
    <router-link to="/print">打印</router-link>
    <router-link to="/p1">p1</router-link>
    <router-link to="/p2">p2</router-link>
    <router-link to="/json">json</router-link>
    <router-link to="/template">template</router-link>
    <router-link to="/data">data</router-link>
    <div class="barcode">
      <div class="title">一维码</div>
      <canvas id="barCode"></canvas>
    </div>
    <div class="barcode">
      <div class="title">二维码</div>
      <div class="code-box">
        <div class="qrcode" ref="qrCodeUrl"></div>
      </div>
    </div>
    <el-upload ref="upload" action="" style="margin: 0 10px" :on-change="importExcel" :auto-upload="false" :show-file-list="false">
      <el-button size="small" type="warning" icon="el-icon-upload2">导入数据</el-button>
    </el-upload>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcodejs2'
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
    const thispx = this.$mmToPx(10)
    console.log(thispx)
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
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: '12145555', // 需要转换为二维码的内容
        width: this.$mmToPx(34),
        height: this.$mmToPx(34),
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
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

<style lang="scss" scoped>
.code-box {
  border: 1px solid #000;
  overflow: hidden;
}
</style>

