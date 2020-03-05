<template>
  <div id="app">
    <div v-loading="isLoading"></div>
    <div v-show="!isLoading">
      <el-form ref="form" :model="form" label-width="120px">
        <div class="category-select">
          <el-form-item :error="errors.catalog_id" label="Категорія">
            <el-select v-model="form.catalog_id" placeholder="Select">
              <el-option
                v-for="item in catalogs"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item :error="errors.name" label="Назва блога">
          <el-input placeholder="Ведіть назву блога" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Вміст блога">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="заповніть вміст блога"
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item :error="errors.file_id" label="Зображення">
          <el-upload
            class="upload"
            :action="actionFileUpload"
            :multiple="false"
            :limit="1"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-exceed="handleExceed"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png зображення 2мб</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button v-if="isUpdate" type="primary" @click="onSubmit">Обновити</el-button>
          <el-button v-else type="primary" @click="onSubmit">Створити</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";

export default {
  data() {
    return {
      actionFileUpload: API_BASE_URL + "/v1/file",
      isUpdate: false,
      isLoading: false,
      errors: {
        name: "",
        catalog_id: "",
        file_id: ""
      },
      form: {
        content: "",
        name: "",
        catalog_id: "",
        file_id: ""
      },
      catalogs: {},
      errors: {},
      fileList: []
    };
  },
  async created() {
    try {
      const response = await axios.get(API_BASE_URL + "/v1/catalog");
      this.catalogs = response.data.data;
    } catch (e) {
      // handle the authentication error here
    }

    if (this.$route.params.id) {
      this.isUpdate = true;
      this.isLoading = true;
      try {
        const response = await axios.get(
          API_BASE_URL + "/v1/post/" + this.$route.params.id
        );
        this.form = response.data.data;
        this.isLoading = false;
        this.setFileList(response.data.data.file);
      } catch (e) {
        // handle the authentication error here
      }
    }
  },
  watch: {
    $route(to, from) {
      if (!this.$route.params.id) {
        this.isUpdate = false;
        this.form.content = "";
        this.form.name = "";
      }
    }
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
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
      axios
        .post(API_BASE_URL + "/v1/post/create", this.form)
        .then(response => {
          this.name = "";
          this.isLoading = false;
          this.$emit("completed", response.data.data);
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          this.handleFormError(error);
          this.isLoading = false;
        });
    },
    async updatePost() {
      axios
        .put(API_BASE_URL + "/v1/post/" + this.$route.params.id, this.form)
        .then(response => {
          this.name = "";
          this.isLoading = false;
          this.$emit("completed", response.data.data);
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          this.handleFormError(error);
          this.isLoading = false;
        });
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
<style scoped>
.category-select {
  text-align: initial;
}
</style>>