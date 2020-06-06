<template>
  <div id="app">
    <el-main>
      <div v-loading="isLoading"></div>
      <div v-show="!isLoading">
        <headerBack :label="label"></headerBack>
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
              <el-button v-if="isUpdate" type="primary" @click="updateChapter">Оновити</el-button>
              <el-button v-else type="primary" @click="addNewChapter">Додати главу</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import headerBack from "./HeaderBackComponent";
import { Editor, EditorContent } from "tiptap";
import { mapGetters } from "vuex";

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
      label: "",
      isUpdate: false,
      editor: new Editor()
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
    },
    updateChapter() {
      this.$store.dispatch("chapter/update", {
        post_id: this.$route.params.post_id,
        chapter_id: this.$route.params.chapter_id,
        form: {
          name: this.form.name,
          text: this.editor.getHTML()
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      chapter: "chapter/getChapter"
    }),
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  watch: {
    chapter: function(chapter) {
      this.form.name = chapter.name;
      this.editor.setContent(chapter.text);
      this.label = "Редагування глави " + chapter.name;
    }
  },
  created() {
    this.label = "Нова глава";
    if (this.$route.params.chapter_id) {
      this.$store.commit("isLoading", true);
      this.isUpdate = true;

      console.log(this.$store.getters);
      this.$store.dispatch("chapter/load", {
        post_id: this.$route.params.post_id,
        chapter_id: this.$route.params.chapter_id
      });
      let data = this.$store.state.chapter.data;
      console.log(this.$store.state.chapter.data);
    }
  }
};
</script>

<style scoped>
</style>
