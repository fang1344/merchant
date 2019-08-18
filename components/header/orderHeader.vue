<template>
  <mt-navbar v-model="selected" fixed>
    <mt-tab-item id="1">全部</mt-tab-item>
    <mt-tab-item id="2">已完成</mt-tab-item>
    <mt-tab-item id="3">待付款</mt-tab-item>
    <mt-tab-item id="4">配送中</mt-tab-item>
    <mt-tab-item id="5">已取消</mt-tab-item>
  </mt-navbar>
</template>

<script>


  export default {
    data() {
      return {
        selected: 1
      };
    },
    methods: {
      handleClick(tab) {
      
      }
    }
  };
</script>

<style scoped>

</style>
