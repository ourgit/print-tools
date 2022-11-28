<template>
  <div class="app-container">
    <div class="top">
      <div class="back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="title">
        打印预览
      </div>
      <div></div>
    </div>
    <div class="preview-wrap">
      <div v-for="(item,index) in printDataList" :key="index">
        <template1 v-if="templateId === 1" :templateData="item" />
        <template2 v-if="templateId === 2" :templateData="item" />
        <template3 v-if="templateId === 3" :templateData="item" />
        <template4 v-if="templateId === 4" :templateData="item" />
        <template5 v-if="templateId === 5" :templateData="item" />
        <template6 v-if="templateId === 6" :templateData="item" />
        <template7 v-if="templateId === 7" :templateData="item" />
        <template8 v-if="templateId === 8" :templateData="item" />
        <template9 v-if="templateId === 9" :templateData="item" />
      </div>
    </div>
    <div class="btn">
      <el-button type="primary">打印</el-button>
    </div>
  </div>
</template>

<script>
import Template1 from "@/components/template/template1.vue";
import Template2 from "@/components/template/template2.vue";
import Template3 from "@/components/template/template3.vue";
import Template4 from "@/components/template/template4.vue";
import Template5 from "@/components/template/template5.vue";
import Template6 from "@/components/template/template6.vue";
import Template7 from "@/components/template/template7.vue";
import Template8 from "@/components/template/template8.vue";
import Template9 from "@/components/template/template9.vue";
export default {
  components: { Template1, Template2, Template3, Template4, Template5, Template6, Template7, Template8, Template9 },
  data() {
    return {
      templateId: 0,
    };
  },
  created() {
    this.templateId = +this.$route.query.id
  },
  computed: {
    printDataList() {
      return this.$store.getters.printDataList || []
    }
  },
  methods: {
    goBack() {
      this.$router.back();
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
.preview-wrap {
  margin: 20px;
  height: calc(100vh - 140px);
  border-radius: 5px;
  overflow-y: auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}
.btn {
  display: flex;
  justify-content: center;
}
</style>

