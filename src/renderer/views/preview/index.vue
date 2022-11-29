<template>
  <div class="app-container">
    <div class="top">
      <div class="back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="title">
        打印预览
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
      <el-button type="primary" @click="printTest">打印</el-button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Template1 from "@/components/template/template1.vue";
import Template2 from "@/components/template/template2.vue";
import Template3 from "@/components/template/template3.vue";
import Template4 from "@/components/template/template4.vue";
import Template5 from "@/components/template/template5.vue";
import Template6 from "@/components/template/template6.vue";
import Template7 from "@/components/template/template7.vue";
import Template8 from "@/components/template/template8.vue";
import Template9 from "@/components/template/template9.vue";
export default {
  components: { Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9 },
  data() {
    return {
      templateId: 0,
      printerList: [],
      selectedPrinterName: '',
      fullPath: '/static/print.html',
      printIndex: 0,
    };
  },
  created() {
    this.templateId = +this.$route.query.id
    this.getPrinters()
  },
  mounted() {
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
            this.printIndex++
            if (this.printIndex < this.printDataList.length) {
              this.printTest()
            } else {
              this.printIndex = 0
            }
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
    printTest() {
      const id = 'print' + this.printIndex
      const templateData = this.printDataList[0]
      const pageWidth = this.$calcStyle(templateData.pageWidth, templateData.ratio, 'mm')
      const pageHeight = this.$calcStyle(templateData.pageHeight, templateData.ratio, 'mm')
      this.$print(this.$refs[id][0], this.selectedPrinterName, this.$refs.printWebview, pageWidth, pageHeight)
    },
    print() {
      //json方式
      const printJson = []
      this.printDataList.forEach(item => {
        if (this.templateId === 1) {
          printJson.push({
            "TemplateId": "template1",
            "Text": [item.A002],
            "Code": [item.A002],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 2) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA003' + item.A003 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template2",
            "Text": [item.A003],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 3) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA003' + item.A003 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template3",
            "Text": [],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 4) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA003' + item.A003 + '\u001DA001' + item.A001 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template4",
            "Text": [],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 5) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA003' + item.A003 + '\u001DA052' + item.A052 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template5",
            "Text": [],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 6) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA007' + item.A007 + '\u001E\u0004'
          const text1 = item.A002Label + ':' + item.A002
          const text2 = item.A007Label + ':' + item.A007
          printJson.push({
            "TemplateId": "template6",
            "Text": [text1, text2],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 7) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA003' + item.A003 + '\u001DA007' + item.A007 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template7",
            "Text": [],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 8) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA051' + item.A051 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template8",
            "Text": [],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        } else if (this.templateId === 9) {
          const codeContent = '\u001E07\u001DA002' + item.A002 + '\u001DA051' + item.A051 + '\u001DA007' + item.A007 + '\u001E\u0004'
          printJson.push({
            "TemplateId": "template9",
            "Text": [],
            "Code": [codeContent],
            "Hidden": [],
            "Ratio": item.ratio
          })
        }
      })
      console.log(printJson)
      wewin.LabelPrint(printJson, {
        alert: true,
        debug: false
      }, function (data) {
        console.log(data)
      });
      // wewin.LabelPrint(printJson, {
      //   noView: this.selectedPrinterName,
      //   debug: false
      // }, function (data) {
      //   console.log(data)
      // });
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

