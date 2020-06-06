<template>
  <el-main>
    <headerBack :label="label"></headerBack>
    <div id="app" class="content-block">
      <div v-loading="isLoading"></div>
      <div v-show="!isLoading">
        <el-form ref="form" :model="form" label-width="120px">
          <!--<el-form-item label="Тип">
          <el-radio v-model="form.type_post" label="1">Цвірк</el-radio>
          <el-radio v-model="form.type_post" label="2">Новела</el-radio>
        </el-form-item>
          -->
          <div>
            <el-form-item :error="errors.name" label="Назва новели">
              <el-input placeholder="Ведіть назву новели" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Короткий опис">
              <div class="edit">
                <editor-content :editor="editorPost" />
              </div>
            </el-form-item>
            <el-form-item v-show="isUpdate === false" label="Вміст">
              <div class="edit-content">
                <editor-content :editor="editorChapter" />
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <el-tag
              :key="tag"
              v-for="tag in form.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Додати тег</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="isUpdate" type="primary" @click="onSubmit">Обновити</el-button>
            <el-button v-else type="primary" @click="onSubmit">Створити</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-main>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";
import headerBack from "./HeaderBackComponent";
import { Editor, EditorContent } from "tiptap";
import { Placeholder, BulletList, ListItem } from "tiptap-extensions";
import PostDesc from "./PostDesc";

export default {
  components: {
    headerBack: headerBack,
    EditorContent
  },
  data() {
    return {
      label: "",
      actionFileUpload: API_BASE_URL + "/v1/file",
      isUpdate: false,
      errors: {
        name: "",
        file_id: ""
      },
      form: {
        description: "",
        text: "",
        name: "",
        type_post: "1",
        dynamicTags: []
      },
      catalogs: {},
      errors: {},
      fileList: [],
      inputVisible: false,
      inputValue: "",
      editorPost: new Editor({
        extensions: [
          new Placeholder({
            emptyEditorClass: "is-editor-empty",
            emptyNodeClass: "is-empty",
            emptyNodeText: "Короткий опис",
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          })
        ]
      }),
      editorChapter: new Editor({
        extensions: [
          new Placeholder({
            emptyEditorClass: "is-editor-empty",
            emptyNodeClass: "is-empty",
            emptyNodeText: "Напишіть першу главу",
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          })
        ]
      })
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    post_type() {
      return this.form;
    }
  },
  async created() {
    if (this.$route.query.tag) {
      this.form.dynamicTags.push(this.$route.query.tag);
    }
    this.label = "Написати новелу";
    if (this.$route.params.id) {
      this.label = "Редагувати новелу";
      this.$store.commit("isLoading", true);
      this.isUpdate = true;

      try {
        const response = await axios.get(
          API_BASE_URL + "/v1/post/" + this.$route.params.id
        );
        this.form = response.data.data;
        this.editorPost.setContent(response.data.data.description);
        this.$store.commit("isLoading", false);
        this.setTags(response.data.data.tags);

        this.setFileList(response.data.data.file);
      } catch (e) {
        // handle the authentication error here
      }
    }
    try {
      const response = await axios.get(API_BASE_URL + "/v1/catalog");
      this.catalogs = response.data.data;
    } catch (e) {
      // handle the authentication error here
    }
  },
  watch: {
    $route(to, from) {
      if (!this.$route.params.id) {
        this.isUpdate = false;
        this.form.text = "";
        this.form.name = "";
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit("isLoading", true);
      if (this.isUpdate) {
        this.updatePost();
      } else {
        this.createPost();
      }
    },
    beforeUpload(file) {
      if (file.size <= 2048 * 1000) {
        return true;
      }
      this.$message.warning(`Файл больше 2мб`);
      return false;
    },
    async createPost() {
      this.form.text = this.editorChapter.getHTML();
      this.form.description = this.editorPost.getHTML();
      this.$store.dispatch("post/add", this.form);
    },
    async updatePost() {
      this.form.post_id = this.$route.params.id;
      this.form.description = this.editorPost.getHTML();
      this.$store.dispatch("post/update", this.form);
    },

    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    async deleteFile(file_id) {
      axios
        .delete(API_BASE_URL + "/v1/file/" + file_id)
        .then(response => {
          this.$emit("completed", response.data.data);
        })
        .catch(error => {});
    },
    handleFormError(error) {
      if (error.response.data.errors.name) {
        this.errors.name = error.response.data.errors.name[0];
      }
      if (error.response.data.errors.catalog_id) {
        this.errors.catalog_id = error.response.data.errors.catalog_id[0];
      }
      if (error.response.data.errors.file_id) {
        this.errors.file_id = error.response.data.errors.file_id[0];
      }
    },
    setTags(tags) {
      this.form.dynamicTags = [];
      tags.forEach(tag => {
        this.form.dynamicTags.push(tag.name);
      });
    },
    setFileList(file) {
      if (file) {
        this.fileList = [
          {
            id: file.id,
            name: file.path,
            url: BASE_URL + file.path
          }
        ];
        this.form.file_id = file.id;
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`Видалите попередній файл`);
    },
    handleRemove(file) {
      console.log(file);
      this.deleteFile(file.id);
      this.$message.success(`Ви видалили файл`);
    },
    handleError(responce) {
      console.log(responce);
      this.fileList = [];
      this.$message.warning(`Не удалось загрузить файл`);
      //this.handleFormError();
    },
    handleSuccess(response) {
      this.setFileList(response.data);
    }
  }
};
</script>
<style>
p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}

p.is-editor-empty:nth-child(2)::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.category-select {
  text-align: initial;
}
</style>>
