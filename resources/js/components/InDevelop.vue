<template>
  <el-main>
    <headerBack label="В розробці"></headerBack>
    <div class="post content-block">
      <div class="content">
          <p>Даний розділ перебуває в розробці</p>
      </div>
    </div>
  </el-main>
</template>
<script>
import headerBack from "./HeaderBackComponent";

export default {
  components: {
    headerBack: headerBack,
  }
};
</script>
