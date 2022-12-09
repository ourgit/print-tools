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
        <div :id="'print'+ index">
          <template1 v-if="templateId === 1" :templateData="item" />
          <template2 v-if="templateId === 2" :templateData="item" />
          <template3 v-if="templateId === 3" :templateData="item" />
          <template4 v-if="templateId === 4" :templateData="item" />
          <template5 v-if="templateId === 5" :templateData="item" />
          <template6 v-if="templateId === 6" :templateData="item" />
          <template7 v-if="templateId === 7" :templateData="item" />
          <template8 v-if="templateId === 8" :templateData="item" />
          <template9 v-if="templateId === 9" :templateData="item" />
        </div>
      </div>
    </div>
    <div class="btn">
      <el-button type="primary" @click="lodopPrint">打印</el-button>
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
import { getLodop } from '@/utils/LodopFuncs'
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
      jobCode: '1',//job码
      printStatus: 0,//打印状态
      templateId: 0,
      printerList: [],
      selectedPrinterName: '',
      fullPath: fullPath,
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
            deviceName: this.selectedPrinterName, //打印机名称
          })
          .then((res) => {

          })
          .catch((err) => {
          })
          .finally(() => {
            this.printIndex++
            if (this.printIndex < this.printDataList.length) {
              setTimeout(this.handlePrint, 500)
            } else {
              this.printIndex = 0
            }
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
    lodopPrint() {
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
      const html = this.$print(document.getElementById(id))
      let LODOP = getLodop()
      LODOP.PRINT_INIT(id)
      LODOP.SET_PRINTER_INDEXA(this.selectedPrinterName)
      LODOP.SET_PRINT_PAGESIZE(1, pageWidth, pageHeight, "")
      LODOP.ADD_PRINT_HTM(0, 0, pageWidth, pageHeight, document.getElementById(id).innerHTML);
      // LODOP.PREVIEW();
      LODOP.PRINT();
      this.printIndex++
      if (this.printIndex < this.printDataList.length) {
        setTimeout(this.lodopPrint, 500)
      } else {
        this.printIndex = 0
      }
    },
    getStatusValue(job) {//根据job代码，获取是否打印成功
      var self = this;
      LODOP.On_Return = function (TaskID, Value) {
        console.log("TaskID:" + TaskID);
        console.log("打印成功状态:" + Value);//打印成功状态
        self.printStatus = Value;
        self.printIndex++
        if (self.printIndex < self.printDataList.length) {
          setTimeout(self.lodopPrint, 500)
        } else {
          self.printIndex = 0
        }
      };
      LODOP.GET_VALUE("PRINT_STATUS_OK", job);
    },
    goBack() {
      this.$router.back();
    },
    getPrinters() {
      ipcRenderer.send('getPrinterList')
      const printBrand = ['makeid', 'wewin', '博思得', 'postek', '佳博', 'gainscha', '致明兴', 'zmin', '澳兮', 'aoxi']
      const printList = []
      ipcRenderer.on('getPrinterList', (event, list) => {
        list.forEach((item) => {
          const printName = item.name.toLowerCase()
          printBrand.forEach(print => {
            if (printName.indexOf(print) !== -1) {
              printList.push(item)
            }
          })
          if (item.isDefault) {
            this.selectedPrinterName = item.name;
          }
        });
        this.printerList = printList
      })
    },
    handlePrint() {
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

