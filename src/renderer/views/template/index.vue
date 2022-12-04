<template>
  <div class="app-container">
    <div class="template-wrap">
      <div class="title">
        系统标签模板
      </div>
      <div class="template-list">
        <div class="template-item" v-for="(item, index) in systemList" :key="index">
          <template v-if="(item.id === 10)">
            <div class="code-box">
              <img class="code-img" :src="item.src" title="点击进行数据导入">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="size">{{item.pageSize}}</div>
            <div class="btn">
              <el-button type="primary" class="edit-btn" size="small">编辑</el-button>
            </div>
          </template>
          <template v-else>
            <router-link :to="{path:'/data',query: { type: 1,id: item.id }}" class="code-box">
              <img class="code-img" :src="item.src" title="点击进行数据导入">
            </router-link>
            <router-link :to="{path:'/data',query: { type: 1,id: item.id }}" class="name">{{item.name}}</router-link>
            <div class="size">{{item.pageSize}}</div>
            <div class="btn">
              <router-link :to="{path:'/editTemplate',query: { type: 1,id: item.id }}">
                <el-button type="primary" class="edit-btn" size="small">编辑</el-button>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="template-wrap" id="localTempalte">
      <div class="title">本地标签模板</div>
      <div class="template-list">
        <div class="template-item" v-for="(item, index) in localList" :key="index">
          <router-link :to="{path:'/data',query: { type: 2,id: item.id,localId: item.localId }}" class="code-box">
            <img class="code-img" :src="item.src" title="点击进行数据导入">
          </router-link>
          <router-link :to="{path:'/data',query: { type: 2,id: item.id,localId: item.localId }}" class="name">{{item.name}}</router-link>
          <div class="size">{{item.pageSize}}</div>
          <div class="btn">
            <router-link :to="{path:'/editTemplate',query: { type: 2,id: item.id,localId: item.localId }}">
              <el-button type="primary" size="small">编辑</el-button>
            </router-link>
            <el-button type="danger" size="small" @click="delTemplate(index)">删除</el-button>
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
import template from '@/template/index.json'
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
export default {
  data() {
    return {
      systemList: [],
      localList: [],
      driver: null
    };
  },
  created() {
    this.getSystemList()
    this.getLocalTemplate()
  },
  mounted() {
    const homeGuide = store.get('homeGuide') || false
    if (!homeGuide) {
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
          element: '.code-img',
          stageBackground: '#fff',
          popover: {
            title: '选择标签模板',
            description: '点击需求打印的标签模板进入数据导入模块',
            position: 'bottom'
          }
        },
        {
          element: '.edit-btn',
          stageBackground: '#fff',
          popover: {
            title: '编辑标签模板',
            description: '点击需要编辑的标签模板进入标签编辑模块',
            position: 'bottom'
          }
        },
        {
          element: '#localTempalte',
          stageBackground: '#fff',
          popover: {
            title: '管理本地模板',
            description: '这里可选择、编辑、删除本地模板',
            position: 'bottom'
          }
        }
      ]
      this.driver.defineSteps(steps)
      this.driver.start()
      store.set('homeGuide', true)
    },
    getSystemList() {
      this.systemList = template.map(item => {
        const pageWidth = Number(new BigNumber(item.pageWidth).dividedBy(item.ratio)).toFixed(2)
        const pageHeight = Number(new BigNumber(item.pageHeight).dividedBy(item.ratio)).toFixed(2)
        item.pageSize = pageWidth + 'mm *' + pageHeight + 'mm'
        item.src = require('@/assets/code/' + item.id + '.png')
        return item
      })
    },
    getLocalTemplate() {
      const localTemplate = store.get('localTemplate') || []
      this.localList = localTemplate.map(item => {
        const pageWidth = Number(new BigNumber(item.pageWidth).dividedBy(item.ratio)).toFixed(2)
        const pageHeight = Number(new BigNumber(item.pageHeight).dividedBy(item.ratio)).toFixed(2)
        item.pageSize = pageWidth + 'mm *' + pageHeight + 'mm'
        item.src = require('@/assets/code/' + item.id + '.png')
        return item
      })
    },
    delTemplate(index) {
      this.$confirm('您确定要删除此标签模板吗?', '提示', {
        showClose: false,
        type: 'warning'
      }).then(() => {
        const localTemplate = store.get('localTemplate') || []
        localTemplate.splice(index, 1)
        store.set('localTemplate', localTemplate)
        this.getLocalTemplate()
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  padding: 20px;
}
.template-wrap {
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  border-radius: 5px;
  .title {
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
  }
  .template-list {
    display: flex;
    flex-wrap: wrap;
    .template-item {
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      margin-right: 20px;
      .code-box {
        width: 200px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        .code-img {
          height: 80px;
        }
      }
      .name {
        margin: 5px 0;
        line-height: 1.5;
        font-weight: 700;
      }
      .size {
        font-size: 14px;
        margin: 5px 0;
      }
      .btn {
        margin-top: 5px;
      }
    }
  }
}
</style>

