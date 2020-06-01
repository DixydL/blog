<template>
  <el-container>
    <el-header height="77">
      <div class="menu">
        <el-button @click="drawer = true" type="text" style="margin-left: 16px;">
          <svg
            class="bi bi-list icon-menu"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </el-button>
        <router-link to="/">
          <img class="logo" src="/logo.png" />
        </router-link>

        <el-drawer
          title="Меню"
          :visible.sync="drawer"
          :direction="direction"
          size="300"
          :before-close="handleCloseDrawler"
        >
          <el-menu
            default-active="2"
            class
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
          >
            <el-menu-item index="/">
              <span>Головна</span>
            </el-menu-item>
            <el-menu-item index="/in-develop">
              <span>Конкурс</span>
            </el-menu-item>
            <el-submenu index="3">
              <template slot="title">Запостити роботу</template>
              <el-menu-item index="/post-create">
                <span>Новелу</span>
              </el-menu-item>
              <el-menu-item index="/in-develop">Графічний роман</el-menu-item>
              <el-menu-item index="/in-develop">Створити арт</el-menu-item>
            </el-submenu>
            <el-menu-item v-show="user.auth === 0" index="/sign-in">Вхід</el-menu-item>
          </el-menu>
          <el-dropdown v-show="user.auth" class="avatar">
            <span class="el-dropdown-link">
              <div class="user">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span>{{user.name}}</span>
              </div>
            </span>
            <el-dropdown-menu>
              <el-button type="text" to="/sign-in" @click="onExit" class>Вийти</el-button>
            </el-dropdown-menu>
          </el-dropdown>
        </el-drawer>

        <div class="right-menu">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
            :default-active="$route.path"
          >
            <el-menu-item index="/in-develop">Конкурс</el-menu-item>
            <el-submenu index="2">
              <template slot="title">Запостити роботу</template>
              <el-menu-item index="/post-create">
                <span class="navbar-item">Новелу</span>
              </el-menu-item>
              <el-menu-item index="/in-develop">
                <span to="/in-develop" class="navbar-item">Графічний роман</span>
              </el-menu-item>
              <el-menu-item index="/in-develop">
                <span class="navbar-item">Створити арт</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-show="user.auth === 0" index="/sign-in">Вхід</el-menu-item>
          </el-menu>
          <el-dropdown v-show="user.auth" class="avatar">
            <span class="el-dropdown-link">
              <div class="user">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span>{{user.name}}</span>
              </div>
            </span>
            <el-dropdown-menu>
              <el-button type="text" to="/sign-in" @click="onExit" class>Вийти</el-button>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!--<el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
          </template>
          <el-menu-item index="1-1">
            <router-link to="/" class="navbar-item">Головна</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link to="/post-create" class="navbar-item">Написати новелу</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <el-button
              type="text"
              v-if="user.auth"
              to="/sign-in"
              @click="onExit"
              class="navbar-item"
            >Вихід({{user.name}})</el-button>
            <router-link v-else to="/sign-in" class="navbar-item">Вхід</router-link>
          </el-menu-item>
        </el-submenu>
      -->

      <!--<nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-menu">
          <div class="main-navbar">
            <router-link to="/" class="navbar-item nav-link_current">Головна</router-link>
            <router-link to="/post-create" class="navbar-item">Написати новелу</router-link>
            <router-link to="/catalog" class="navbar-item">Хештеги</router-link>
            <router-link to="/sing-in" class="navbar-item">Конкурс</router-link>
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
      </nav>-->
    </el-header>
    <div class="type-work" v-show="$route.path === '/'">
      <span class="active">Новела</span>
      <el-divider direction="vertical"></el-divider>
      <span>
        <router-link to="/in-develop">Графічна новела</router-link>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span>
        <router-link to="/in-develop">Арт</router-link>
      </span>
    </div>
    <router-view></router-view>
  </el-container>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "../config";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  data() {
    return {
      activeIndex: "/",
      drawer: false,
      direction: "ltr",
      form: {
        content: "",
        name: ""
      }
    };
  },
  mounted() {},
  methods: {
    handleCloseDrawler(done) {
      done();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.drawer = false;
      console.log(key, keyPath);
    },
    onSubmit() {
      console.log(this.this.$store.state.user);
      this.createPost();
    },
    onExit() {
      this.$store.dispatch("user/singOut", this.user);
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
.edit .ProseMirror:focus {
  border-color: #409eff;
  outline: 0;
}
.edit-content .ProseMirror:focus {
  border-color: #409eff;
  outline: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.edit .ProseMirror {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  line-height: 22px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.right-menu {
  padding-right: 20px;
}
.right-menu i {
  font-size: 20px !important;
  line-height: 2;
}
.right-menu .user {
  display: flex;
  float: left;
}

.right-menu .user span {
  margin-left: 5px;
  align-self: center;
  font-size: 20px;
}

.right-menu .user i {
  color: #fff;
  margin-right: 0px;
}

.el-submenu__title {
  padding: 0px 10px;
  padding-left: 0px;
}

.right-menu {
  margin-left: auto;
  display: grid;
  grid-template-columns: 1fr auto;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  gap: 4px;
}

.edit-content .ProseMirror {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  line-height: 22px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  min-height: 170px;
}
.post_title {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: bold;
  transition: opacity 0.3s, padding 0.3s, color 0.3s, background-color 0.3s,
    box-shadow 0.3s, border 0.3s;
  font-family: "Helvetica Neue";
  font-size: 20px;
  line-height: 26px;
  text-decoration: none;
  color: #1b98e0 !important;
}

.el-header,
.el-footer {
  height: 75px;
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #d7dae2;
  padding: 0;
}

.el-header .logo {
  height: 60px;
  padding: 10px;
  margin-left: -10px;
}
.el-menu--horizontal > .el-submenu.avatar .el-submenu__icon-arrow {
  margin-top: 9px;
}

.el-header i {
  font-size: 50px;
}

.el-header button {
  float: left;
}

body {
  display: block;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 8px;
  margin-left: 0px;
  background-color: #f7f7f7;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.type-work {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  min-width: 360px;
}

.type-work span a {
  text-decoration: none;
  color: #adadad;
}

.type-work span {
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  color: #adadad;
  text-decoration: none;
  border-top: 4px solid transparent;
  transition: 0.2s color;
  cursor: pointer;
  padding: 10px;
}

.type-work span.active {
  border-bottom: 4px solid #0096fa;
  margin-top: 4px;
  color: #1f1f1f;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.main-navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.navbar-item {
  font-size: 15px;
  line-height: 32px;
  color: #1989fa;
  text-decoration: none;
  border-top: 4px solid transparent;
  transition: 0.2s color;
  cursor: pointer;
  margin-bottom: 23px;
  padding: 10px;
  padding-top: 13px;
}
.nav-link_current:after {
  content: "";
  display: inline-block;
  bottom: 0;
  left: calc(50% - 15px);
  width: 100%;
  height: 2px;
  background: #409eff;
}

.nav-link_current {
  color: #464646;
}

.header {
  border-radius: 10px;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  background-color: #ffffff;
  color: #333;
  line-height: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.content-block {
  border-radius: 10px;
  margin-top: 10px;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  background-color: #ffffff;
  color: #333;
  line-height: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 10px;
}

.el-main {
  margin: auto;
  min-width: 360px;
  max-width: 1164px;
  padding: 10px;
  width: 100%;
}

.menu {
  display: flex;
}

body > .el-container {
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

.icon-menu {
  font-size: 44px;
  padding: 7px;
}

.border-dotted {
  border-bottom: 1px dotted #e4e7ed;
  margin-top: 10px;
  margin-bottom: 10px;
}

.layout_cell {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 32px;
}

.el-table__row .is-right i {
  font-size: 18px;
  padding-left: 6px;
}

.el-menu.el-menu--horizontal {
  border-bottom: solid 0px;
}

@media (max-width: 990px) {
  .right-menu {
    display: none;
  }
  .el-table__row {
    font-size: 11px;
  }

  .content-block th {
    font-size: 11px;
  }

  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 25px !important;
    padding: 0px;
    min-width: 200px;
  }

  .el-menu-item-group,
  .el-menu-item {
    border-bottom: 1px dotted #e4e7ed;
  }

  .el-menu-item-group__title {
    padding-left: 25px !important;
  }

  .el-header {
    text-align: left;
    padding: 0 0px;
  }
  .el-submenu [class^="el-icon-"] {
    vertical-align: middle;
    margin-right: 5px;
    margin-top: 10px;
    width: 24px;
    text-align: center;
    font-size: 40px;
  }

  .el-submenu {
    z-index: 999;
    position: inherit;
  }

  .navbar-item {
    font-size: 15px;
    line-height: 32px;
    color: #1989fa;
    text-decoration: none;
    border-top: 4px solid transparent;
    transition: 0.2s color;
    cursor: pointer;
    margin-bottom: 23px;
    padding: 0px;
    padding-top: 0px;
  }
  .layout_cell {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 16px;
  }

  .post_title {
    font-size: 30px;
  }

  .label {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .type-work span {
    padding: 0px;
    padding-right: 1px;
    padding-left: 1px;
  }
}
</style>
