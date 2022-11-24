<template>
  <div class="app-container">
    <div class="template-wrap">
      <div class="title">系统标签模板</div>
      <div class="template-list">
        <div class="template-item" v-for="(item, index) in systemList" :key="index">
          <div class="code-box">
            <img class="code-img" :src="item.src">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="btn">
            <el-button type="primary" size="small">编辑</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="template-wrap">
      <div class="title">本地标签模板</div>
      <div class="template-list">
        <div class="template-item" v-for="(item, index) in localList" :key="index">
          <div class="code-box">
            <img class="code-img" :src="item.src">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="btn">
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      systemList: [],
      localList: [{ name: '单件管理标签', src: require('@/assets/code/4.png') }, { name: '单件分箱标签', src: require('@/assets/code/5.png') }, { name: '多个单品种标签', src: require('@/assets/code/8.png') }, { name: '多个单品种零部件标签', src: require('@/assets/code/9.png') }]
    };
  },
  methods: {

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

