<template>
  <div class="app-container">
    <div class="top">
      <router-link to="/" class="back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <div class="title">
        当前标签模板：单件管理标签
      </div>
      <div class="btn">
        <el-button type="primary" size="small">导入</el-button>
        <el-button type="success" size="small">新增</el-button>
      </div>
    </div>
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
export default {
  data() {
    return {
      templateType: 1,
      templateId: 0,
      tabelColumn: [],
      tabelData: [{
        A002: '868749282'
      }]
    };
  },
  created() {
    this.templateType = +this.$route.query.type
    this.templateId = +this.$route.query.id
    this.init()
  },
  methods: {
    init() {
      if (this.templateType === 1) {
        const templateData = template.find(item => {
          return item.id === this.templateId
        })
        const tabelColumn = []
        if (this.templateId === 1) {
          tabelColumn.push({
            label: templateData.A002Label,
            value: 'A002'
          })
        }
        this.tabelColumn = tabelColumn
        console.log(this.tabelColumn)
      }
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

