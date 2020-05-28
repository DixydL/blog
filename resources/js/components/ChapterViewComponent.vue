<template>
  <el-main>
    <headerBack :label="chapter.name"></headerBack>
    <div class="post content-block">
      <div class="content">
        <div v-if="isLoading">Loading post...</div>
        <div v-else>
          <div v-if="imgUrl" class="block">
            <el-image :src="imgUrl">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="read_chapter">
            <p v-html="chapter.text" />
          </div>
        </div>
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
  },
  data() {
    return {
      imgUrl: "",
      isLoading: true,
      chapter: {},
      comments: {},
      editor: null
    };
  },
  computed: {
    editor_computed() {
      return;
    }
  },
  async created() {
    try {
      const response = await axios.get(
        API_BASE_URL +
          "/v1/post/" +
          this.$route.params.id +
          "/chapter/" +
          this.$route.params.chapter_id
      );
      this.editor = new Editor({
        content: response.data.data.text
      });
      this.chapter = response.data.data;
      this.isLoading = false;
      if (response.data.data.file) {
        this.imgUrl = BASE_URL + response.data.data.file.url;
      }
    } catch (e) {
      // handle the authentication error here
    }
  },
  methods: {
    toPost() {
      this.$router.push({
        path: "/post/" + this.$route.params.id
      });
    }
  }
};
</script>
<style>
.content {
  padding: 20px;
  text-align: left;
}

.el-image__inner {
  width: auto;
}

.block {
  padding: 10px 0;
  display: flex;
  margin: inherit;
  box-sizing: border-box;
  vertical-align: top;
}

.read_chapter {
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 22px;
  color: rgb(78, 77, 77);
  font-size: 16px;
  line-height: 22px;
  word-wrap: break-word; /* Перенос слов */
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}
.el-image {
  width: 500px;
  height: 500px;
}
</style>
