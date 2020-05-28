<template>
  <div id="app">
    <el-main>
      <headerBack label="Нова глава"></headerBack>
      <div class="content-block">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Назва глави">
            <el-input placeholder="Ведіть назву глави" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Вміст глави">
            <div class="edit">
              <editor-content :editor="editor" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addNewChapter">Додати главу</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </div>
</template>

<script>
import headerBack from "./HeaderBackComponent";
import { Editor, EditorContent } from "tiptap";

export default {
  components: {
    headerBack: headerBack,
    EditorContent
  },
  data() {
    return {
      form: {
        name: "",
        text: ""
      },
      editor: new Editor({
        content: `
          <h1>Yay Headlines!</h1>
          <p>All these <strong>cool tags</strong> are working now.</p>
        `
      })
    };
  },
  methods: {
    addNewChapter() {
      this.$store.dispatch("chapter/add", {
        post_id: this.$route.params.post_id,
        form: {
          name: this.form.name,
          text: this.editor.getHTML()
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
