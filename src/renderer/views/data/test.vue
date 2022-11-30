<template>
  <div class="app-container">
    <div class="top">
      <router-link to="/" class="back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <div class="title">
        当前标签模板：{{ templateData.name }}
      </div>
      <div class="btn" style="display: flex;">
        <el-upload ref="upload" action="" style="margin: 0 10px" :on-change="importExcel" :auto-upload="false"
          :show-file-list="false">
          <el-button type="primary" size="small">导入</el-button>
        </el-upload>

        <el-button type="success" size="small" @click="dialogTableVisible = true">新增</el-button>
      </div>
      <!-- 导入错误弹出 -->
      <!-- <el-dialog title="数据" popper-class="errPop" :visible.sync="dialogTableVisible">
        <el-table :data="tableColumn" class="errPop-table">
          <el-table-column label="模板数据" prop="label" width="200"></el-table-column>
          <el-table-column label="excel数据" width="200">
            <template #default="{ row }">
              <el-select v-model="row.excelLabel" placeholder="请选择">
                <el-option v-for="(item,index) in excelLabel" :key="index" :label="item" :value="item">
                </el-option>
              </el-select><div @click="showData(row)">111</div>
            </template>
          </el-table-column>
          <el-table-column label="显示"  width="200"><div @click="showData">111</div></el-table-column>
         
          
        </el-table>
      </el-dialog> -->
    </div>
    <!-- 新增弹出 -->
    <el-dialog title="新增数据" :visible.sync="dialogTableVisible">

      <el-form :model="form">
        <el-form-item v-for="(item,index) in tableColumn" :key="index" :label="item.label">

          <el-input v-model="form[item.value]" autocomplete="off"></el-input>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>

    </el-dialog>
    <div class="main">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :row-class-name="tableRowClassName"
        :height="`calc(100vh - 180px)`" style="width: 100%" @selection-change="selectedList = $event">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.value" :label="item.label">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click.stop="printRow(row)">打印</el-button>
            <el-button type="danger" size="small" @click.stop="delRow(row.index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary" @click="batchPrint">批量打印</el-button>
        <el-button @click="clearData">清空数据</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import Store from 'electron-store'
const store = new Store()
import template from '@/template/index.json'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      ll:[],
      templateType: 1,
      templateId: 0,
      localId: '',
      templateData: {},
      tableColumn: [],
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      selectedList: [],
      gridData: [],
      excelLabel: [],
      defaultLabel:[],
      form: {

      }
      /*       '品种码':'',
              '单件码':'',
              '资产名称':'',
              '管理部门':'',
              '供应商':'',
              '规格型号':'',
              '分箱号':'',
              '生产日期':'',
              '数量':'',
              '零部件号':'',
              '计量单位':'' */
    };

  },
  created() {
    this.templateType = +this.$route.query.type
    this.templateId = +this.$route.query.id
    if (this.$route.query.localId) {
      this.localId = this.$route.query.localId
    }
    this.init()
    console.log(this.tableColumn);
    /* 默认标签(数组) */
    this.tableColumn.forEach((val=>{
      this.defaultLabel.push(val.label)
    }))
    console.log(this.defaultLabel);
  },
  methods: {
    showData(row) {
      console.log('data', this.tableColumn)
      console.log(row);
    },
    init() {
      if (this.templateType === 1) {
        const templateData = template.find(item => {
          return item.id === this.templateId
        })
        this.templateData = JSON.parse(JSON.stringify(templateData))
        this.templateName = this.templateData.name
        this.ratio = this.templateData.ratio
      } else {
        const localTemplate = store.get('localTemplate') || []
        const templateData = localTemplate.find(item => {
          return item.id === this.templateId && item.localId === this.localId
        })
        this.templateData = JSON.parse(JSON.stringify(templateData))
        this.templateName = this.templateData.name
        this.ratio = this.templateData.ratio
      }
      const tableColumn = []
      const templateData = this.templateData

      switch (this.templateId) {
        case 1:
          tableColumn.push({
            label: templateData.A002Label,
            value: 'A002'
          }); break;
        case 2:
          tableColumn.push({
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A003Label,
            value: 'A003'
          }); break;
        case 3:
          tableColumn.push({
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A003Label,
            value: 'A003'
          }); break;
        case 4:
          tableColumn.push({
            label: templateData.A001Label,
            value: 'A001'
          }, {
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A003Label,
            value: 'A003'
          }, {
            label: templateData.deptLabel,
            value: 'dept'
          }); break;
        case 5:
          tableColumn.push({
            label: templateData.A001Label,
            value: 'A001'
          }, {
            label: templateData.A005Label,
            value: 'A005'
          }, {
            label: templateData.A006Label,
            value: 'A006'
          }, {
            label: templateData.A052Label,
            value: 'A052'
          }, {
            label: templateData.A010Label,
            value: 'A010'
          }, {
            label: templateData.A902Label,
            value: 'A902'
          }, {
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A003Label,
            value: 'A003'
          }); break;
        case 6:
          tableColumn.push({
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A007Label,
            value: 'A007'
          }); break;
        case 7:
          tableColumn.push({
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A003Label,
            value: 'A003'
          }, {
            label: templateData.A007Label,
            value: 'A007'
          }); break;
        case 8:
          tableColumn.push({
            label: templateData.A001Label,
            value: 'A001'
          }, {
            label: templateData.A005Label,
            value: 'A005'
          }, {
            label: templateData.A006Label,
            value: 'A006'
          }, {
            label: templateData.A902Label,
            value: 'A902'
          }, {
            label: templateData.A051Label,
            value: 'A051'
          }, {
            label: templateData.A010Label,
            value: 'A010'
          }, {
            label: templateData.A002Label,
            value: 'A002'
          }); break;
        case 9:
          tableColumn.push({
            label: templateData.A001Label,
            value: 'A001'
          }, {
            label: templateData.A005Label,
            value: 'A005'
          }, {
            label: templateData.A006Label,
            value: 'A006'
          }, {
            label: templateData.A007Label,
            value: 'A007'
          }, {
            label: templateData.A902Label,
            value: 'A902'
          }, {
            label: templateData.A051Label,
            value: 'A051'
          }, {
            label: templateData.A002Label,
            value: 'A002'
          }, {
            label: templateData.A010Label,
            value: 'A010'
          }); break;
      }
      this.tableColumn = tableColumn
      this.forminit()
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
    },
    batchPrint() {
      if (!this.selectedList.length) {
        return this.$message({
          type: 'error',
          message: '请选择要打印的数据!'
        })
      } else {
        this.$store.commit('app/SET_PRINT_DATA_LIST', this.selectedList)
        this.$router.push({ path: "/preview", query: { id: this.templateId } })
      }
    },
    forminit() {
      this.form = this.templateData;
      this.tableColumn.forEach((val) => {
        this.form[val.value] = ''
      })
    },
    printRow(row) {
      console.log(row)
      const printList = [row]
      this.$store.commit('app/SET_PRINT_DATA_LIST', printList)
      this.$router.push({ path: "/preview", query: { id: this.templateId } })
    },
    delRow(index) {
      this.tableData.splice(index, 1)
    },
    clearData() {
      this.tableData = []
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
          const wsname = workbook.SheetNames[3]
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
          for (let key in ws[0]) {
            this.excelLabel.push(key)
          }
          this.tableColumn.map(item => {
            const keyIndex = this.excelLabel.findIndex(label => {
              return label === item.label
            })
            if (keyIndex !== -1) {
              item.excelLabel = this.excelLabel[keyIndex]
            } else {
              item.excelLabel = ''
            }
            return item
          })
          console.log('tableColumn', this.tableColumn)
          /* this.excelLabel.forEach((val, index) => {
            this.tableColumn[index].excelLabel = val
          }) */
          /* console.log(this.excelLabel); */
          console.log('111', this.tableColumn);
          const dataList = []
          ws.forEach(item => {
            const templateData = JSON.parse(JSON.stringify(this.templateData))
            /* console.log(templateData); */
            switch (this.templateId) {
              case 1:
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                break;
              case 2:
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A003 = item[templateData.A003Label.replace(/\s*/g, "")] || ''
                break;
              case 3:
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A003 = item[templateData.A003Label.replace(/\s*/g, "")] || ''
                break;
              case 4:
                templateData.A001 = item[templateData.A001Label.replace(/\s*/g, "")] || ''
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A003 = item[templateData.A003Label.replace(/\s*/g, "")] || ''
                templateData.dept = item[templateData.deptLabel.replace(/\s*/g, "")] || ''
                break;
              case 5:
                templateData.A001 = item[templateData.A001Label.replace(/\s*/g, "")] || ''
                templateData.A005 = item[templateData.A005Label.replace(/\s*/g, "")] || ''
                templateData.A006 = item[templateData.A006Label.replace(/\s*/g, "")] || ''
                templateData.A052 = item[templateData.A052Label.replace(/\s*/g, "")] || ''
                templateData.A010 = item[templateData.A010Label.replace(/\s*/g, "")] || ''
                templateData.A902 = item[templateData.A902Label.replace(/\s*/g, "")] || ''
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A003 = item[templateData.A003Label.replace(/\s*/g, "")] || ''
                break;
              case 6:
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A007 = item[templateData.A007Label.replace(/\s*/g, "")] || ''
                break;
              case 7:
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A003 = item[templateData.A003Label.replace(/\s*/g, "")] || ''
                templateData.A007 = item[templateData.A007Label.replace(/\s*/g, "")] || ''
                break;
              case 8:
                templateData.A001 = item[templateData.A001Label.replace(/\s*/g, "")] || ''
                templateData.A005 = item[templateData.A005Label.replace(/\s*/g, "")] || ''
                templateData.A006 = item[templateData.A006Label.replace(/\s*/g, "")] || ''
                templateData.A902 = item[templateData.A902Label.replace(/\s*/g, "")] || ''
                templateData.A051 = item[templateData.A051Label.replace(/\s*/g, "")] || ''
                templateData.A010 = item[templateData.A010Label.replace(/\s*/g, "")] || ''
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                break;
              case 9:
                templateData.A001 = item[templateData.A001Label.replace(/\s*/g, "")] || ''
                templateData.A005 = item[templateData.A005Label.replace(/\s*/g, "")] || ''
                templateData.A006 = item[templateData.A006Label.replace(/\s*/g, "")] || ''
                templateData.A007 = item[templateData.A007Label.replace(/\s*/g, "")] || ''
                templateData.A902 = item[templateData.A902Label.replace(/\s*/g, "")] || ''
                templateData.A051 = item[templateData.A051Label.replace(/\s*/g, "")] || ''
                templateData.A002 = item[templateData.A002Label.replace(/\s*/g, "")] || ''
                templateData.A010 = item[templateData.A010Label.replace(/\s*/g, "")] || ''
                break;
            }
            dataList.push(templateData)
          })
          this.tableData = dataList
          /* console.log(this.tableData); */
        } catch (e) {
          this.$Message.error('解析失败!')
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    submitForm() {
      let a = 1;
      for (let key in this.form) {
        if (this.form[key] === '') {
          a = -1
        }
      }
      if (a == 1) {
        this.dialogTableVisible = false;
        const submit = JSON.parse(JSON.stringify(this.form))
        console.log(submit);
        this.tableData.push(submit)
        this.forminit()
      } else {
        this.$message('内容不为空');
      }
    },
    cancel() {
      this.dialogTableVisible = false
      this.forminit()
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

.main {
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  margin: 20px;

  .btn {
    padding: 20px;
  }
}



/* ::v-deep .el-dialog__body {
  display: flex;
} */
</style>

