<template>
  <div class="app-container">
    <router-link to="/">首页</router-link>
    <div class="template" v-for="(item,index) in templateList" :key="index">
      {{item.name}}
    </div>
  </div>
</template>

<script>
import template from '@/template/index.json'
export default {
  data() {
    return {
      templateList: []
    };
  },
  created() {
    this.templateList = template
  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.code-box {
  border: 1px solid #000;
  overflow: hidden;
}
</style>

