<template>
  <el-container>
    <el-header>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="navbar-item">
            <router-link to="/" class="navbar-item">Головна</router-link>
            <router-link to="/post-create" class="navbar-item">Створити пост</router-link>
            <router-link to="/catalog" class="navbar-item">Каталог</router-link>
          </div>
        </div>
      </nav>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      form: {
        content: "",
        name: ""
      }
    };
  },
  async created() {
    //axios.defaults.headers.common['Authorization'] = `Bearer ${await this.$auth.getAccessToken()}`
  },
  methods: {
    onSubmit() {
      console.log(this.form);
      this.createPost();
    },
    async createPost() {
      axios
        .post(API_BASE_URL + "/v1/post/create", this.form)
        .then(response => {
          this.name = "";
          this.isLoading = false;
          this.$emit("completed", response.data.data);
        })
        .catch(error => {
          // handle authentication and validation errors here
          this.errors = error.response.data.errors;
          this.isLoading = false;
        });
    }
  }
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

body > .el-container {
  max-width: 1140px;
  margin: auto;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.border {
  border-bottom: 1px solid #e4e7ed;
  padding-top: 2px;
  padding-bottom: 2px;
}

.border-dotted {
  border-bottom: 1px dotted #e4e7ed;
  margin-top: 10px;
  margin-bottom: 10px;
}

.count {
  display: flex;
  padding: 12px;
  float: right;
}
</style>
