<template>
  <div class="app-container">
    <div class="top">
      <router-link to="/" class="back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <div class="title">当前标签模板：{{ templateData.name }}</div>
      <div class="btn" style="display: flex">
        <el-input v-model="keywrods" size="small" clearable placeholder="请输入查询关键字"></el-input>
        <el-button type="success" size="small" @click="filterData(1)" icon="el-icon-search" style="margin-left:10px">查询</el-button>
        <el-upload ref="upload" action="" style="margin: 0 10px" :on-change="importExcel" :auto-upload="false" :show-file-list="false">
          <el-button type="primary" size="small" icon="el-icon-upload2">导入</el-button>
        </el-upload>
        <el-button type="success" size="small" @click="dialogTableVisible = true" icon="el-icon-plus">新增</el-button>
        <a :href="templateUrl" style="margin: 0 10px">
          <el-button type="primary" size="small" icon="el-icon-download">下载模板</el-button>
        </a>
      </div>
    </div>
    <div class="main">
      <el-table ref="multipleTable" :data="tableDataList" tooltip-effect="dark" :row-class-name="tableRowClassName" :height="`calc(100vh - 180px)`" style="width: 100%" @selection-change="selectedList = $event">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-for="(item, index) in tableColumn" :key="index" :prop="item.value" :label="item.label">
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click.stop="printRow(row)">打印</el-button>
            <el-button type="danger" size="small" @click.stop="delRow(row.index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="botoom">
        <div class="btn">
          <el-button type="primary" @click="batchPrint">批量打印</el-button>
          <el-button @click="clearData">清空数据</el-button>
        </div>
        <el-pagination @size-change="handleSizeChange" :page-sizes="[10, 50, 100, 200]" @current-change="filterData" :current-page.sync="currentPage" :page-size="size" layout="total,sizes, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增数据" :visible.sync="dialogTableVisible" width="500px" :close-on-click-modal="false" :destroy-on-close="false">
      <el-form :model="form" label-width="100px" label-position="right">
        <el-form-item v-for="(item, index) in tableColumn" :key="index" :label="item.label">
          <el-date-picker v-if="item.value === 'A010'" v-model="form[item.value]" format="yyyy年MM月dd日" value-format="yyyy年MM月dd日" type="date" placeholder="选择日期"></el-date-picker>
          <el-input v-else v-model="form[item.value]" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请选择数据来源" :visible.sync="dialogFormVisible" width="500px" :close-on-click-modal="false" :destroy-on-close="false">
      <el-table :data="tableColumn" style="width: 100%">
        <el-table-column prop="label" label="模板标签">
        </el-table-column>
        <el-table-column prop="excelLabel" label="数据标签">
          <template #default="{ row }">
            <el-select v-model="row.excelLabel" placeholder="请选择数据来源">
              <el-option v-for="item in excelLabelList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleImport">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="配置单件码生成规格" :visible.sync="dialogCodeVisible" width="500px" :close-on-click-modal="false" :destroy-on-close="false">
      <el-form :model="codeForm" :rules="codeRules" ref="codeForm" label-width="150px">
        <el-form-item label="发行机构代码标识">
          <el-select v-model="codeForm.issueId" placeholder="请选择发行机构代码标识">
            <el-option label="军委改革和编制办公室" value="1"></el-option>
            <el-option label="国家统一社会信用代码管理机构" value="2"></el-option>
            <el-option label="军队资产编目编码机构" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织机构代码" prop="orgId">
          <el-input v-model="codeForm.orgId"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="generateCode('codeForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import Store from "electron-store";
const store = new Store();
import template from "@/template/index.json";
import XLSX from "xlsx";
import { generateSingleCode } from "@/utils/util";
let localPath = ''
if (process.env.NODE_ENV === 'development') {
  localPath = '/static';
} else {
  localPath = path.join(__static);
}
var excelData = []
var tempDataList = []
export default {
  data() {
    return {
      templateType: 1,
      templateId: 0,
      localId: "",
      templateData: {},
      tableColumn: [],
      tableData: [],
      tableDataList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogCodeVisible: false,
      selectedList: [],
      form: {},
      size: 10,
      total: 0,
      currentPage: 1,
      templateUrl: '',
      keywrods: '',
      excelLabelList: [],
      codeForm: {
        issueId: '1',
        orgId: ''
      },
      codeRules: {
        orgId: [
          { required: true, message: '请输入组织机构代码', trigger: 'blur' },
          { min: 9, max: 9, message: '组织机构代码必须为9位', trigger: 'blur' }
        ],
      }
    };
  },
  beforeRouteEnter(to, form, next) {
    if (form.path == '/preview') {
      to.meta.isBack = true
    }
    next()
  },
  activated() {
    if (this.$route.meta.isBack) {
      this.$route.meta.isBack = false
      return
    } else {
      this.templateType = +this.$route.query.type;
      this.templateId = +this.$route.query.id;
      if (this.$route.query.localId) {
        this.localId = this.$route.query.localId;
      }
      this.init();
      this.tableData = []
      this.tableDataList = []
    }
  },
  methods: {
    init() {
      if (this.templateType === 1) {
        const templateData = template.find((item) => {
          return item.id === this.templateId;
        });
        this.templateData = JSON.parse(JSON.stringify(templateData));
        this.templateName = this.templateData.name;
        this.ratio = this.templateData.ratio;
      } else {
        const localTemplate = store.get("localTemplate") || [];
        const templateData = localTemplate.find((item) => {
          return item.id === this.templateId && item.localId === this.localId;
        });
        this.templateData = JSON.parse(JSON.stringify(templateData));
        this.templateName = this.templateData.name;
        this.ratio = this.templateData.ratio;
      }
      const tableColumn = [];
      const templateData = this.templateData;
      this.templateUrl = localPath + '/template/' + this.templateId + '.xlsx'
      switch (this.templateId) {
        case 1:
          tableColumn.push({
            label: templateData.A002Label.replace(/\s*/g, ""),
            value: "A002",
            excelLabel: templateData.A002Label.replace(/\s*/g, "")
          });
          break;
        case 2:
          tableColumn.push(
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A003Label.replace(/\s*/g, ""),
              value: "A003",
              excelLabel: templateData.A003Label.replace(/\s*/g, ""),
            }
          );
          break;
        case 3:
          tableColumn.push(
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A003Label.replace(/\s*/g, ""),
              value: "A003",
              excelLabel: templateData.A003Label.replace(/\s*/g, ""),
            }
          );
          break;
        case 4:
          tableColumn.push(
            {
              label: templateData.A001Label.replace(/\s*/g, ""),
              value: "A001",
              excelLabel: templateData.A001Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A003Label.replace(/\s*/g, ""),
              value: "A003",
              excelLabel: templateData.A003Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.deptLabel.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.deptLabel.replace(/\s*/g, ""),
            }
          );
          break;
        case 5:
          tableColumn.push(
            {
              label: templateData.A001Label.replace(/\s*/g, ""),
              value: "A001",
              excelLabel: templateData.A001Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A005Label.replace(/\s*/g, ""),
              value: "A005",
              excelLabel: templateData.A005Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A006Label.replace(/\s*/g, ""),
              value: "A006",
              excelLabel: templateData.A006Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A052Label.replace(/\s*/g, ""),
              value: "A052",
              excelLabel: templateData.A052Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A010Label.replace(/\s*/g, ""),
              value: "A010",
              excelLabel: templateData.A010Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A902Label.replace(/\s*/g, ""),
              value: "A902",
              excelLabel: templateData.A902Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A003Label.replace(/\s*/g, ""),
              value: "A003",
              excelLabel: templateData.A003Label.replace(/\s*/g, ""),
            }
          );
          break;
        case 6:
          tableColumn.push(
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A007Label.replace(/\s*/g, ""),
              value: "A007",
              excelLabel: templateData.A007Label.replace(/\s*/g, ""),
            }
          );
          break;
        case 7:
          tableColumn.push(
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A003Label.replace(/\s*/g, ""),
              value: "A003",
              excelLabel: templateData.A003Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A007Label.replace(/\s*/g, ""),
              value: "A007",
              excelLabel: templateData.A007Label.replace(/\s*/g, ""),
            }
          );
          break;
        case 8:
          tableColumn.push(
            {
              label: templateData.A001Label.replace(/\s*/g, ""),
              value: "A001",
              excelLabel: templateData.A001Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A005Label.replace(/\s*/g, ""),
              value: "A005",
              excelLabel: templateData.A005Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A006Label.replace(/\s*/g, ""),
              value: "A006",
              excelLabel: templateData.A006Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A902Label.replace(/\s*/g, ""),
              value: "A902",
              excelLabel: templateData.A902Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A051Label.replace(/\s*/g, ""),
              value: "A051",
              excelLabel: templateData.A051Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A010Label.replace(/\s*/g, ""),
              value: "A010",
              excelLabel: templateData.A010Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            }
          );
          break;
        case 9:
          tableColumn.push(
            {
              label: templateData.A001Label.replace(/\s*/g, ""),
              value: "A001",
              excelLabel: templateData.A001Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A005Label.replace(/\s*/g, ""),
              value: "A005",
              excelLabel: templateData.A005Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A006Label.replace(/\s*/g, ""),
              value: "A006",
              excelLabel: templateData.A006Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A007Label.replace(/\s*/g, ""),
              value: "A007",
              excelLabel: templateData.A007Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A902Label.replace(/\s*/g, ""),
              value: "A902",
              excelLabel: templateData.A902Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A051Label.replace(/\s*/g, ""),
              value: "A051",
              excelLabel: templateData.A051Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A002Label.replace(/\s*/g, ""),
              value: "A002",
              excelLabel: templateData.A002Label.replace(/\s*/g, ""),
            },
            {
              label: templateData.A010Label.replace(/\s*/g, ""),
              value: "A010",
              excelLabel: templateData.A010Label.replace(/\s*/g, ""),
            }
          );
          break;
      }
      this.tableColumn = tableColumn;
      this.forminit()
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    batchPrint() {
      if (!this.selectedList.length) {
        return this.$message({
          type: "error",
          message: "请选择要打印的数据!",
        });
      } else {
        this.$store.commit("app/SET_PRINT_DATA_LIST", this.selectedList);
        this.$router.push({ path: "/preview", query: { id: this.templateId } });
      }
    },
    printRow(row) {
      const printList = [row];
      this.$store.commit("app/SET_PRINT_DATA_LIST", printList);
      this.$router.push({ path: "/preview", query: { id: this.templateId } });
    },
    delRow(index) {
      const dataIndex = (this.currentPage - 1) * this.size + index
      this.tableData.splice(dataIndex, 1);
      this.filterData()
    },
    clearData() {
      this.tableData = [];
      this.tableDataList = []
    },
    formatExcelDate(numb, format = "-") {
      if (!numb) {
        return "";
      }
      let time = new Date(
        new Date("1900-1-1").getTime() + (numb - 1) * 3600 * 24 * 1000
      );
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate();
      if (format && format.length === 1) {
        return (
          year +
          format +
          (month < 10 ? "0" + month : month) +
          format +
          (date < 10 ? "0" + date : date)
        );
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
    handleSizeChange(val) {
      this.size = val
      this.currentPage = 1
      this.filterData()
    },
    filterData(page) {
      this.tableDataList = []
      const allData = JSON.parse(JSON.stringify(this.tableData))
      let filterData = []
      const keyWord = this.keywrods.trim()
      if (keyWord) {
        for (var i = 0; i < allData.length; i++) {
          const itemStr = JSON.stringify(allData[i])
          if (itemStr.split(keyWord).length > 1) {
            filterData.push(allData[i])
          }
        }
      } else {
        filterData = this.tableData
      }
      if (page) {
        filterData.forEach((res, index) => {
          if (index < page * this.size && index >= (page - 1) * this.size) {
            this.tableDataList.push(res)
          }
        })
      } else {
        filterData.forEach((res, index) => {
          if (index < this.currentPage * this.size && index >= (this.currentPage - 1) * this.size) {
            this.tableDataList.push(res)
          }
        })
      }
      this.total = filterData.length
    },
    importExcel(file) {
      const files = { 0: file.raw };
      if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        this.$Message.error("上传格式错误!");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0];
          excelData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
          console.log(excelData)
          const excelLabelList = []
          for (let key in excelData[0]) {
            excelLabelList.push(key.replace(/\s*/g, ""))
          }
          this.excelLabelList = excelLabelList
          const tabelLabelList = this.tableColumn.map(item => item.label)
          const isInclude = tabelLabelList.every((val) => this.excelLabelList.includes(val))
          if (isInclude) {
            this.handleImport()
          } else {
            this.tableColumn.map(item => {
              const keyIndex = excelLabelList.findIndex(label => {
                return label === item.label
              })
              if (keyIndex === -1) {
                item.excelLabel = ''
              }
              return item
            })
            this.dialogFormVisible = true
          }
        } catch (e) {
          this.$Message.error("解析失败!");
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
    handleImport() {
      this.dialogFormVisible = false
      tempDataList = [];
      excelData.forEach((excel) => {
        const templateData = JSON.parse(JSON.stringify(this.templateData));
        this.tableColumn.forEach(item => {
          if (item.excelLabel) {
            templateData[item.value] = excel[item.excelLabel] || "";
          } else {
            templateData[item.value] = ''
          }
        })
        tempDataList.push(templateData);
      });

      if (this.templateId === 2 || this.templateId === 3 || this.templateId === 5) {
        const isCodeNull = tempDataList.some(item => {
          return !item.A003
        })
        if (isCodeNull) {
          this.dialogCodeVisible = true
        } else {
          this.tableData = tempDataList;
          this.filterData()
        }
      } else {
        this.tableData = tempDataList;
        this.filterData()
      }

    },
    //自动生成单件码
    generateCode(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          console.log(tempDataList)
          const dateTime = new Date(new Date().toLocaleDateString()).getTime()
          const codeHistory = store.get('codeHistory') || []
          const todayHistory = codeHistory.filter(item => {
            return item.dateTime === dateTime
          })
          const historyIndex = todayHistory.findIndex(item => {
            return item.dateTime === dateTime && item.issueId === this.codeForm.issueId && item.orgId === this.codeForm.orgId
          })
          // todayHistory.push({
          //   dateTime,
          //   issueId: this.codeForm.issueId,
          //   orgId: this.codeForm.orgId,
          //   lastSeq: 1
          // })
          let lastSeq = 0
          if (historyIndex !== -1) {
            lastSeq = todayHistory[historyIndex].lastSeq
          }
          const dateList = []
          tempDataList.forEach((item, index) => {
            console.log(index)
            const itemSeq = this.$generateSerialNumber(lastSeq + (index + 1), 9)
            item.A003 = generateSingleCode(this.codeForm.issueId, this.codeForm, itemSeq)
          })
          console.log(tempDataList)
          this.dialogCodeVisible = false
        } else {
          return false;
        }
      });
    },
    submitForm() {
      let validate = true;
      for (let key in this.form) {
        if (this.form[key] === '') {
          validate = false
        }
      }
      if (validate) {
        this.dialogTableVisible = false;
        const formList = JSON.parse(JSON.stringify(this.form))
        this.tableData.unshift(formList);
        this.forminit()
        this.filterData()
      } else {
        this.$message({
          message: '内容不为空',
          type: 'warning'
        });
      }
    },
    forminit() {
      this.form = this.templateData;
      this.tableColumn.forEach((val) => {
        if (val.value === 'A010' && (this.templateId === 5 || this.templateId === 8 || this.templateId === 9)) {
          this.form.A010 = this.$parseTime('', '{y}年{m}月{d}日')
        } else {
          this.form[val.value] = ''
        }
      })
    },
  },
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
  .botoom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      padding: 20px;
    }
  }
}
</style>

