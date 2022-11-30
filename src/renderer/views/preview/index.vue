<template>
  <div class="app-container">
    <div class="top">
      <div class="back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="title">
        打印预览--{{msg}}
      </div>
      <div>
        <el-select v-model="selectedPrinterName" placeholder="请选择打印机">
          <el-option v-for="item of printerList" :key="item.name" :value="item.name" :title="item.name">
          </el-option>
        </el-select>
      </div>
    </div>
    <webview id="printWebview" ref="printWebview" :src="fullPath" nodeintegration webpreferences="contextIsolation=no" style="visibility: hidden;display: none;" />
    <div class="preview-wrap">
      <div v-for="(item,index) in printDataList" :key="index">
        <section :ref="'print'+ index">
          <template1 v-if="templateId === 1" :templateData="item" />
          <template2 v-if="templateId === 2" :templateData="item" />
          <template3 v-if="templateId === 3" :templateData="item" />
          <template4 v-if="templateId === 4" :templateData="item" />
          <template5 v-if="templateId === 5" :templateData="item" />
          <template6 v-if="templateId === 6" :templateData="item" />
          <template7 v-if="templateId === 7" :templateData="item" />
          <template8 v-if="templateId === 8" :templateData="item" />
          <template9 v-if="templateId === 9" :templateData="item" />
        </section>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="print">打印</el-button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import path from 'path'
import Template1 from "@/components/template/template1.vue";
import Template2 from "@/components/template/template2.vue";
import Template3 from "@/components/template/template3.vue";
import Template4 from "@/components/template/template4.vue";
import Template5 from "@/components/template/template5.vue";
import Template6 from "@/components/template/template6.vue";
import Template7 from "@/components/template/template7.vue";
import Template8 from "@/components/template/template8.vue";
import Template9 from "@/components/template/template9.vue";
let fullPath = ''
if (process.env.NODE_ENV === 'development') {
  fullPath = '/static/print.html';
} else {
  fullPath = path.join(__static, 'print.html');
}
export default {
  components: { Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9 },
  data() {
    return {
      templateId: 0,
      printerList: [],
      selectedPrinterName: '',
      fullPath: fullPath,
      printIndex: 0,
      msg: ''
    };
  },
  created() {
    this.templateId = +this.$route.query.id
    this.getPrinters()
  },
  mounted() {
    const webview = this.$refs.printWebview;
    console.log('webview')
    webview.addEventListener("ipc-message", (event) => {
      console.log('webview111')
      if (event.channel === "webview-print-do") {
        webview
          .print({
            silent: true,//静默打印
            printBackground: true,
            deviceName: this.selectedPrinterName, //打印机名称
          })
          .then((res) => {
            this.printIndex++
            if (this.printIndex < this.printDataList.length) {
              this.printTest()
            } else {
              this.printIndex = 0
            }
          })
          .catch((err) => {
          })
          .finally(() => {
          });
      }
    });
  },
  computed: {
    printDataList() {
      return this.$store.getters.printDataList || []
    }
  },
  methods: {
    goBack() {
      this.$router.back();
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
      if (!this.selectedPrinterName) {
        return this.$message({
          message: "请先选择打印机",
          type: "warning",
        });
      }
      const id = 'print' + this.printIndex
      const templateData = this.printDataList[0]
      const pageWidth = this.$calcStyle(templateData.pageWidth, templateData.ratio, 'mm')
      const pageHeight = this.$calcStyle(templateData.pageHeight, templateData.ratio, 'mm')
      this.$print(this.$refs[id][0], this.selectedPrinterName, this.$refs.printWebview, pageWidth, pageHeight)
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  .back {
    .el-icon-arrow-left {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .title {
    font-weight: 700;
  }
}
.preview-wrap {
  margin: 20px;
  height: calc(100vh - 160px);
  border-radius: 5px;
  overflow-y: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>

