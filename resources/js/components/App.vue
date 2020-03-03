<template>
  <el-container>
    <el-header>
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="main-navbar">
            <router-link to="/" class="navbar-item nav-link_current">Головна</router-link>
            <router-link to="/post-create" class="navbar-item">Пост</router-link>
            <router-link to="/catalog" class="navbar-item">Хештеги</router-link>
            <router-link to="/sing-in" class="navbar-item">Конкурс</router-link>
            <div>
              <el-button
                type="text"
                v-if="user.auth"
                to="/sign-in"
                @click="onExit"
                class="navbar-item"
              >Вихід({{user.name}})</el-button>
              <router-link v-else to="/sign-in" class="navbar-item">Вхід</router-link>
            </div>
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
import { mapState } from "vuex";

export default {
  computed: mapState({
    user: state => state.user.user
  }),
  data() {
    return {
      form: {
        content: "",
        name: ""
      }
    };
  },
  methods: {
    
    onSubmit() {
      console.log(this.this.$store.state.user);
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
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #d7dae2;
}

body {
  display: block;
  margin-top: 0px;
  margin-right: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  background-color: #f7f7f7;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.main-navbar {
  display: flex;
  justify-content: space-between;
  height: 64px;
  box-sizing: border-box;
}

.navbar-menu {
  width: 300px;
  flex-direction: column;
  display: inline-flex;
}

.navbar-item {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  color: #838a92;
  font-weight: 500;
  font-size: 15px;
  font-family: "-apple-system", BlinkMacSystemFont, Arial, sans-serif;
  text-decoration: none;
}

.nav-link_current {
  color: #464646;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  line-height: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

body > .el-container {
  min-width: 1024px;
  max-width: 1164px;
  margin: auto;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
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
  padding: 12px;
  float: right;
  color: #548eaa;
}
</style>
