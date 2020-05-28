<template>
  <div class="header">
    <div class="content">
      <el-page-header title="Назад" @back="goBack" :content="label"></el-page-header>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: ""
  },
  methods: {
    goBack() {
        this.$router.go(-1);
    }
  }
};
</script>
