<template>
  <el-main>
    <headerBack :label="chapter.name" :link="'/post/' + post_id"></headerBack>
    <div class="post content-block">
      <div class="content">
        <div v-if="isLoading">Завантаження глави...</div>
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
            <div class="chapter-paggination">
              <div v-if="chapter.previous">
                <el-button v-on:click="handlePrevious(post_id,chapter.previous.id)" type="text">
                  <router-link
                    class="el-link el-link--primary"
                    :to="'/post/' + post_id + '/chapter/'+ chapter.previous.id"
                    :href="'/post/' + post_id + '/chapter/'+ chapter.previous.id"
                  >Назад</router-link>
                </el-button>
              </div>
              <div v-if="chapter.next">
                <el-button v-on:click="handleNext(post_id,chapter.next.id)" type="text">
                  <router-link
                    class="el-link el-link--primary"
                    :to="'/post/' + post_id + '/chapter/'+ chapter.next.id"
                    :href="'/post/' + post_id + '/chapter/'+ chapter.next.id"
                  >Вперед</router-link>
                </el-button>
              </div>
            </div>
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
      post_id: null,
      editor: null
    };
  },
  computed: {
    editor_computed() {
      return;
    }
  },
  async mounted() {
    this.post_id = this.$route.params.id;
    this.loadChapter(this.$route.params.id, this.$route.params.chapter_id);
  },
  methods: {
    toPost() {
      this.$router.push({
        path: "/post/" + this.$route.params.id
      });
    },
    async loadChapter(post_id, chapter_id) {
      try {
        const response = await axios.get(
          API_BASE_URL + "/v1/post/" + post_id + "/chapter/" + chapter_id
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
    handleNext(post_id, chapter_id) {
      this.isLoading = true;
      this.loadChapter(post_id, chapter_id);
    },
    handlePrevious(post_id, chapter_id) {
      this.isLoading = true;
      this.loadChapter(post_id, chapter_id);
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

.chapter-paggination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-paggination span {
  padding-right: 28px;
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
