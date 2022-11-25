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
          <template1 :templateData="templateData" :ratio="ratio" @updateItem="updateItem" />
        </div>
        <div class="btn">
          <el-button>重置</el-button>
          <el-button type="primary">保存</el-button>
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
import Template1 from "@/components/template/template1.vue";
import template from '@/template/index.json'
export default {
  components: { Template1 },
  data() {
    return {
      templateType: 1,
      templateId: 0,
      templateName: '',
      templateData: {},
      ratio: 100,
      showOption: false,
      currentItem: '',
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
        this.templateName = this.templateData.name
      }
    },
    formatTooltip(val) {
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

