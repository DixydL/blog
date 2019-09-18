<template>
  <div id="app">
    <div v-loading="isLoading"></div>
    <div v-show="!isLoading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Назва каталога">
          <el-input placeholder="Ведіть назву каталога" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Вміст каталога">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="заповніть вміст каталога"
            v-model="form.description"
          ></el-input>
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
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      isUpdate: false,
      isLoading: false,
      form: {
        description: "",
        name: ""
      }
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.isUpdate = true;
      this.isLoading = true;
      try {
        const response = await axios.get(
          API_BASE_URL + "/v1/catalog/" + this.$route.params.id
        );
        this.form = response.data.data;
        this.isLoading = false;
      } catch (e) {
        // handle the authentication error here
      }
    }
  },
  watch: {
    $route(to, from) {
      if (!this.$route.params.id) {
        this.isUpdate = false;
        this.form.description = "";
        this.form.name = "";
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      if (this.isUpdate) {
        this.updatePost();
      } else {
        this.createPost();
      }
    },
    async createPost() {
      axios
        .post(API_BASE_URL + "/v1/catalog", this.form)
        .then(response => {
          this.name = "";
          this.isLoading = false;
          this.$emit("completed", response.data.data);
          this.$router.push({ path: "/catalog" });
        })
        .catch(error => {
          // handle authentication and validation errors here
          this.errors = error.response.data.errors;
          this.isLoading = false;
        });
    },
    async updatePost() {
      axios
        .put(API_BASE_URL + "/v1/catalog/" + this.$route.params.id, this.form)
        .then(response => {
          this.name = "";
          this.isLoading = false;
          this.$emit("completed", response.data.data);
          this.$router.push({ path: "/catalog" });
        })
        .catch(error => {
          // handle authentication and validation errors here
          if (error.response.data.errors.name) {
            this.errors.name = error.response.data.errors.name[0];
          }
          if (error.response.data.errors.catalog_id) {
            this.errors.catalog_id = error.response.data.errors.catalog_id[0];
          }
          this.isLoading = false;
        });
    }
  }
};
</script>
