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
        <div class="template-content" id="template-box">
          <template1 v-if="templateId === 1" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template2 v-if="templateId === 2" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template3 v-if="templateId === 3" :templateData="templateData" isEdit :ratio="ratio" />
          <template4 v-if="templateId === 4" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template5 v-if="templateId === 5" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template6 v-if="templateId === 6" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template7 v-if="templateId === 7" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template8 v-if="templateId === 8" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
          <template9 v-if="templateId === 9" :templateData="templateData" isEdit :ratio="ratio" @updateItem="updateItem" />
        </div>
        <div class="btn">
          <el-button @click="reset" id="reset-btn">重置</el-button>
          <el-button :loading="saveLoading" type="primary" id="save-btn" @click="saveTemplate">保存</el-button>
        </div>
      </div>
      <div class="option-wrap">
        <div class="option-setting" id="option-setting">
          <div class="title">缩放设置</div>
          <div class="option-list">
            <div class="option-item">
              <div class="label">模板尺寸</div>
              <div class="value">
                <el-input @input="limitInput($event,'pageWidth')" v-model.trim="pageWidth" placeholder="模板宽度" style="width:120px"></el-input>mm *
                <el-input @input="limitInput($event,'pageHeight')" v-model.trim="pageHeight" placeholder="模板高度" style="width:120px"></el-input>mm
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
import BigNumber from 'bignumber.js'
import Store from 'electron-store';
const store = new Store();
import { v4 as uuid } from 'uuid'
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import Template1 from "@/components/template/template1.vue";
import Template2 from "@/components/template/template2.vue";
import Template3 from "@/components/template/template3.vue";
import Template4 from "@/components/template/template4.vue";
import Template5 from "@/components/template/template5.vue";
import Template6 from "@/components/template/template6.vue";
import Template7 from "@/components/template/template7.vue";
import Template8 from "@/components/template/template8.vue";
import Template9 from "@/components/template/template9.vue";
import template from '@/template/index.json'
export default {
  components: { Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9 },
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
      saveLoading: false,
      pageWidth: 0,
      pageHeight: 0,
      driver: null
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
  mounted() {
    const editGuide = store.get('editGuide') || false
    if (!editGuide) {
      this.driver = new Driver({
        opacity: 0.1,
        animate: true,
        doneBtnText: '我知道了',
        closeBtnText: '跳过',
        nextBtnText: '下一步',
        prevBtnText: '上一步',
        keyboardControl: true
      })
      this.guide()
    }
  },
  methods: {
    guide() {
      const steps = [
        {
          element: '#template-box',
          stageBackground: '#fff',
          popover: {
            title: '标签模板展示区',
            description: '点击模板中的文字单元，可以对该文字单元进行修改',
            position: 'bottom'
          }
        },
        {
          element: '#option-setting',
          stageBackground: '#fff',
          popover: {
            title: '更改模板尺寸',
            description: '这里可以修改标签模板的尺寸',
            position: 'bottom'
          }
        },
        {
          element: '#reset-btn',
          stageBackground: '#fff',
          popover: {
            title: '重置标签模板',
            description: '点击此按钮会将该标签模板重置成最原始的配置',
            position: 'bottom'
          }
        },
        {
          element: '#save-btn',
          stageBackground: '#fff',
          popover: {
            title: '保存标签模板',
            description: '点击此按钮会将该标签模板保存为本地标签模板',
            position: 'bottom'
          }
        }
      ]
      this.driver.defineSteps(steps)
      this.driver.start()
      store.set('editGuide', true)
    },
    init() {
      if (this.templateType === 1) {
        const templateData = template.find(item => {
          return item.id === this.templateId
        })
        this.templateData = JSON.parse(JSON.stringify(templateData))
        this.templateName = this.templateData.name
        this.pageWidth = Number(new BigNumber(this.templateData.pageWidth).dividedBy(this.templateData.ratio)).toFixed(2)
        this.pageHeight = Number(new BigNumber(this.templateData.pageHeight).dividedBy(this.templateData.ratio)).toFixed(2)
        this.ratio = this.templateData.ratio
      } else {
        const localTemplate = store.get('localTemplate') || []
        const templateData = localTemplate.find(item => {
          return item.id === this.templateId && item.localId === this.localId
        })
        this.templateData = JSON.parse(JSON.stringify(templateData))
        this.templateName = this.templateData.name
        this.pageWidth = Number(new BigNumber(this.templateData.pageWidth).dividedBy(this.templateData.ratio)).toFixed(2)
        this.pageHeight = Number(new BigNumber(this.templateData.pageHeight).dividedBy(this.templateData.ratio)).toFixed(2)
        this.ratio = this.templateData.ratio
        console.log(this.ratio)
      }
    },
    limitInput(value, name) {
      const val = ("" + value) // 第一步：转成字符串
        .replace(/[^\d^\.]+/g, "") // 第二步：把不是数字，不是小数点的过滤掉
        .replace(/^0+(\d)/, "$1") // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
        .replace(/^\./, "0.") // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
        .match(/^\d*(\.?\d{0,2})/g)[0] || ""; // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有0到2位小数
      if (name === 'pageWidth') {
        this.pageWidth = val
        if (val) {
          const ratio = new BigNumber(this.templateData.pageWidth).dividedBy(new BigNumber(val))
          this.pageHeight = Number(new BigNumber(this.templateData.pageHeight).dividedBy(ratio)).toFixed(2)
          this.ratio = Number(ratio)
          this.templateData.ratio = Number(ratio)
        } else {
          this.pageHeight = ''
        }
      } else {
        this.pageHeight = val
        if (val) {
          const ratio = new BigNumber(this.templateData.pageHeight).dividedBy(new BigNumber(val))
          this.pageWidth = Number(new BigNumber(this.templateData.pageWidth).dividedBy(ratio)).toFixed(2)
          this.ratio = Number(ratio)
          this.templateData.ratio = Number(ratio)
        } else {
          this.pageWidth = ''
        }
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
        this.pageWidth = Number(new BigNumber(this.templateData.pageWidth).dividedBy(this.templateData.ratio)).toFixed(2)
        this.pageHeight = Number(new BigNumber(this.templateData.pageHeight).dividedBy(this.templateData.ratio)).toFixed(2)
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
          margin-bottom: 10px;
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

