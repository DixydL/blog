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
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";
import headerBack from "./HeaderBackComponent";
import { Editor, EditorContent } from "tiptap";

export default {
  components: {
    headerBack: headerBack,
    EditorContent
  }
};
</script>
