<template>
  <div class="app-container">
    <div class="top">
      <router-link to="/" class="back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <div class="title">
        当前标签模板：单件管理标签
      </div>
      <div class="btn" style="display: flex;">
        <el-upload ref="upload" action="" style="margin: 0 10px" :on-change="importExcel" :auto-upload="false" :show-file-list="false">
        <el-button type="primary" size="small">导入</el-button>
      </el-upload>
      
        <el-button type="success" size="small" @click="dialogTableVisible = true">新增</el-button>
      </div>
    </div>
    <!-- 弹出 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
  
    <el-form :model="form">
    <el-form-item  v-for="(item,index) in tabelColumn"  :key="index" :label="item.value" >
      
      <el-input v-model="form[item.value]" autocomplete="off" ></el-input>
    
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </div>

</el-dialog>
    <div class="main">
      <el-table ref="multipleTable" :data="tabelData" tooltip-effect="dark" :height="`calc(100vh - 180px)`" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(item,index) in tabelColumn" :key="index" :prop="item.value" :label="item.label">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="primary" size="small">打印</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="primary">批量打印</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import template from '@/template/index.json'
import { json } from 'body-parser';
import XLSX from 'xlsx'
export default {
  data() {
    return {
      templateType: 1,
      templateId: 0,
      tabelColumn: {},
      tabelData: [{
        A002: '868749282'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      gridData:[],
      form:{

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
    this.init()
    this.tabelData.shift()
  },
  methods: {
    init() {
      if (this.templateType === 1) {
        const templateData = template.find(item => {
          return item.id === this.templateId
        })
        const tabelColumn = []

        switch(this.templateId) {
          case 1:
          tabelColumn.push({
            label: templateData.A002Label,
            value: '品种码'
          }); break;
          case 2:
          tabelColumn.push({
            label: templateData.A002Label,
            value: '品种码'
          },{
            label: templateData.A003Label,
            value: '单件码'
          }); break;
          case 3:
          tabelColumn.push({
            label: '品种码',
            value: '品种码'
          },{
            label: '单件码',
            value: '单件码'
          }); break;
          case 4:
          tabelColumn.push({
            label: templateData.A001Label,
            value: '资产名称'
          },{
            label: templateData.A002Label,
            value: '品种码'
          },{
            label: templateData.A003Label,
            value: '单件码'
          },{
            label: templateData.deptLabel,
            value: '管理部门'
          }); break;
          case 5:
          tabelColumn.push({
            label: templateData.A001Label,
            value: '资产名称'
          },{
            label: templateData.A005Label,
            value: '供应商'
          },{
            label: templateData.A006Label,
            value: '规格型号'
          },{
            label: templateData.A052Label,
            value: '分箱号'
          },{
            label: templateData.A010Label,
            value: '生产日期'
          },{
            label: templateData.A902Label,
            value: '计量单位'
          },{
            label: templateData.A002Label,
            value: '品种码'
          },{
            label: templateData.A003Label,
            value: '单件码'
          }); break;
          case 6:
          tabelColumn.push({
            label: templateData.A002Label,
            value: '品种码'
          },{
            label: templateData.A007Label,
            value: '零部件号'
          }); break;
          case 7:
          tabelColumn.push({
            label: templateData.A002Label,
            value: '品种码'
          },{
            label: templateData.A003Label,
            value: '单件码'
          },{
            label: templateData.A007Label,
            value: '零部件号'
          }); break;
          case 8:
          tabelColumn.push({
            label: templateData.A001Label,
            value: '资产名称'
          },{
            label: templateData.A005Label,
            value: '供应商'
          },{
            label: templateData.A006Label,
            value: '规格型号'
          },{
            label: templateData.A902Label,
            value: '计量单位'
          },{
            label: templateData.A051Label,
            value: '数量'
          },{
            label: templateData.A010Label,
            value: '生产日期'
          },{
            label: templateData.A002Label,
            value: '品种码'
          }); break;
          case 9:
          tabelColumn.push({
            label: templateData.A001Label,
            value: '资产名称'
          },{
            label: templateData.A005Label,
            value: '供应商'
          },{
            label: templateData.A006Label,
            value: '规格型号'
          },{
            label: templateData.A007Label,
            value: '零部件号'
          },{
            label: templateData.A902Label,
            value: '计量单位'
          },{
            label: templateData.A051Label,
            value: '数量'
          },{
            label: templateData.A002Label,
            value: '品种码'
          },{
            label: templateData.A010Label,
            value: '生产日期'
          }); break;
        }

        this.tabelColumn = tabelColumn
        console.log(this.tabelColumn)
      }
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
          

          console.log(ws);
          
          this.tabelData = ws
        } catch (e) {
          this.$Message.error('解析失败!')
          return false
        }
      }
      fileReader.readAsBinaryString(files[0])
    },
    submitForm() {
      this.dialogTableVisible = false;
      const submit = JSON.parse(JSON.stringify(this.form))
      this.tabelData.push(submit)
      this.form = {}
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
</style>

