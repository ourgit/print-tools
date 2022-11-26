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
          <template1 v-if="templateId === 1" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template2 v-if="templateId === 2" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template3 v-if="templateId === 3" :templateData="templateData" isEdit :ratio="ratio" />
        </div>
        <div class="btn">
          <el-button @click="reset">重置</el-button>
          <el-button :loading="saveLoading" type="primary" @click="saveTemplate">保存</el-button>
        </div>
      </div>
      <div class="option-wrap">
        <div class="option-setting">
          <div class="title">缩放设置</div>
          <div class="option-list">
            <div class="option-item">
              <div class="value">
                <el-slider v-model="ratio" :step="1" :min="-300" :max="500" :format-tooltip="formatTooltip"></el-slider>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showOption" class="option-setting" style="margin-top:20px">
          <div class="title">单元属性设置</div>
          <div class="option-list">
            <div v-if="templateData[currentItem+ 'ShowLabel']" class="option-item">
              <div class="label">显示名称</div>
              <div class="value">
                <el-input v-model="templateData[currentItem+ 'Label']" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="option-item">
              <div class="label">是否显示</div>
              <div class="value">
                <el-switch v-model="templateData['show'+currentItem]" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from 'electron-store';
const store = new Store();
import { v4 as uuid } from 'uuid'
import Template1 from "@/components/template/template1.vue";
import Template2 from "@/components/template/template2.vue";
import Template3 from "@/components/template/template3.vue";
import template from '@/template/index.json'
export default {
  components: { Template1, Template2, Template3 },
  data() {
    return {
      localId: '',
      templateType: 1,
      templateId: 0,
      templateName: '',
      templateData: {},
      ratio: 100,
      showOption: false,
      currentItem: '',
      saveLoading: false
    };
  },
  created() {
    this.templateType = +this.$route.query.type
    this.templateId = +this.$route.query.id
    if (this.$route.query.localId) {
      this.localId = this.$route.query.localId
    }
    this.init()
  },
  methods: {
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
    },
    formatTooltip(val) {
      if (!val) return
      if (val >= 100) {
        this.templateData.ratio = val
        return val + '%'
      } else {
        const ratio = 0 - (100 - val + 100)
        this.templateData.ratio = ratio
        return '-' + (100 - val + 100) + '%';
      }
    },
    updateItem(val) {
      this.showOption = true
      this.currentItem = val
    },
    saveTemplate() {
      let localTemplate = store.get('localTemplate') || []
      let templateData = JSON.parse(JSON.stringify(this.templateData))
      if (this.saveLoading) return
      this.saveLoading = true
      if (this.templateType === 1) {
        templateData.localId = uuid()
        templateData.name = this.templateName
        localTemplate.push(templateData)
        store.set('localTemplate', localTemplate)
      } else {
        const localIndex = localTemplate.findIndex(item => item.id === this.templateId && item.localId === this.localId)
        localTemplate[localIndex] = templateData
        localTemplate[localIndex].name = this.templateName
        store.set('localTemplate', localTemplate)
      }
      this.saveLoading = false
      this.$router.push({ path: "/" })
    },
    reset() {
      this.$confirm('您确定要重置此标签模板吗?', '提示', {
        showClose: false,
        type: 'warning'
      }).then(() => {
        const templateData = template.find(item => {
          return item.id === this.templateId
        })
        if (this.templateType === 1) {
          this.templateData = JSON.parse(JSON.stringify(templateData))
        } else {
          this.templateData = JSON.parse(JSON.stringify(templateData))
          this.templateData.localId = this.localId
        }
        this.ratio = this.templateData.ratio
      })
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
  min-height: calc(100vh - 80px);
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
    overflow: hidden;
    .template-content {
      margin: 30px;
    }
  }
  .option-wrap {
    margin-left: 40px;
    width: 400px;

    .option-setting {
      border: 1px solid #f4f4f4;
      .title {
        background: #f4f4f4;
        padding: 10px 20px;
        font-size: 14px;
      }
      .option-list {
        padding: 20px;
        ::v-deep .el-slider__bar {
          background: transparent;
        }
        .option-item {
          .label {
            font-size: 14px;
            color: #666;
            padding: 10px 0;
          }
        }
      }
    }
  }
}
</style>

