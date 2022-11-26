<template>
  <div class="app-container">
    <div class="template-wrap">
      <div class="title">系统标签模板</div>
      <div class="template-list">
        <div class="template-item" v-for="(item, index) in systemList" :key="index">
          <router-link :to="{path:'/data',query: { type: 1,id: item.id }}" class="code-box">
            <img class="code-img" :src="item.src">
          </router-link>
          <router-link :to="{path:'/data',query: { type: 1,id: item.id }}" class="name">{{item.name}}</router-link>
          <div class="btn">
            <router-link :to="{path:'/editTemplate',query: { type: 1,id: item.id }}">
              <el-button type="primary" size="small">编辑</el-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="template-wrap">
      <div class="title">本地标签模板</div>
      <div class="template-list">
        <div class="template-item" v-for="(item, index) in localList" :key="index">
          <router-link :to="{path:'/data',query: { type: 2,id: item.id,localId: item.localId }}" class="code-box">
            <img class="code-img" :src="item.src">
          </router-link>
          <router-link :to="{path:'/data',query: { type: 2,id: item.id,localId: item.localId }}" class="name">{{item.name}}</router-link>
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
import Store from 'electron-store';
const store = new Store();
import template from '@/template/index.json'
export default {
  data() {
    return {
      systemList: [],
      localList: []
    };
  },
  created() {
    this.getSystemList()
    this.getLocalTemplate()
  },
  methods: {
    getSystemList() {
      this.systemList = template.map(item => {
        item.src = require('@/assets/code/' + item.id + '.png')
        return item
      })
    },
    getLocalTemplate() {
      const localTemplate = store.get('localTemplate') || []
      this.localList = localTemplate.map(item => {
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
      .btn {
        margin-top: 5px;
      }
    }
  }
}
</style>

