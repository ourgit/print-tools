<template>
  <div class="app-container">
    <div class="top">
      <router-link to="/" class="back">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <div class="title">
        编辑标签模板
      </div>
      <div></div>
    </div>
    <div class="main">
      <div class="edit-wrap">
        <div class="template-name">
          <el-input v-model="templateName" placeholder="请输入标签模板名称"></el-input>
        </div>
        <div class="template-content">
          <template1 :templateData="templateData" />
        </div>
        <div class="btn">
          <el-button>重置</el-button>
          <el-button type="primary">保存</el-button>
        </div>
      </div>
      <div class="option-wrap">
        <div class="option-setting">
          <div class="hd">属性设置</div>
          <div class="bd">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Template1 from "@/components/template/template1.vue";
import template from '@/template/index.json'
export default {
  components: { Template1 },
  data() {
    return {
      templateType: 1,
      templateId: 0,
      templateName: '',
      templateData: {}
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
        this.templateData = template.find(item => {
          return item.id === this.templateId
        })
        console.log(this.templateData)
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
  margin: 20px;
  min-height: 500px;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  margin: 20px;
  display: flex;
  padding: 40px;
  .edit-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .template-content {
      margin: 30px;
    }
  }
  .option-wrap {
    margin-left: 40px;
    width: 300px;

    .option-setting {
      border: 1px solid #f4f4f4;
      .hd {
        background: #f4f4f4;
        padding: 10px 20px;
        font-size: 14px;
      }
      .bd {
        padding: 20px;
      }
    }
  }
}
</style>

