<template>
  <div class="layout_cell">
    <div v-loading="isLoading">
      <template v-for="(post, key) in posts">
        <div v-bind:key="key" class="content">
          <h3>
            <label class="post_title">{{ post.name }}</label>
          </h3>
          <div v-if="isLoading">Loading post...</div>
          <div v-else>
            <div class="block">
              <el-image :src="base_url + post.file_url">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <p>{{post.content}}</p>
            <div class="border"></div>
          </div>
          <el-row :gutter="24">
            <el-col :span="12" class="action">
              <el-button type="text" @click="toPost(post.id)">Переглянути</el-button>
              <el-button type="text" @click="deletePost(key)">Редактировать</el-button>
              <el-button type="text" @click="deletePost(key)">Видалити</el-button>
            </el-col>
            <el-col :span="12">
              <div class="count">
                <span><i class="el-icon-s-comment"></i>{{post.comments_count}}</span>
                <span><i class="el-icon-top"></i><span style="color:#67C23A">2</span></span>
                <span><i class="el-icon-bottom"></i></span>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <router-link to="post-create" class="navbar-item">Добавиить пост</router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";

export default {
  data() {
    return {
      isLoading: true,
      posts: {},
      catalog_id: "",
      catalogs: {},
      base_url: BASE_URL
    };
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  async created() {
    this.init();
    try {
      const response = await axios.get(API_BASE_URL + "/v1/catalog");
      this.catalogs = response.data.data;
    } catch (e) {
      // handle the authentication error here
    }
  },
  methods: {
    changeCategory() {
      this.$router.push({ path: "/catalog/" + this.catalog_id });
    },
    toPost(key){
      console.log(key);
      this.$router.push({ path: "/post/" + key});
    },
    async init() {
      if (!this.$route.params.id) {
        try {
          const response = await axios.get(API_BASE_URL + "/v1/post");
          this.posts = response.data.data;
          this.isLoading = false;
        } catch (e) {
          // handle the authentication error here
        }
      } else {
        this.getPost(this.$route.params.id);
      }
      this.catalog_id = this.$route.params.id;
    },
    async getPost(catalog_id) {
      try {
        const response = await axios.get(
          API_BASE_URL + "/v1/catalog/" + catalog_id + "/post"
        );
        this.posts = response.data.data;
        this.isLoading = false;
      } catch (e) {
        // handle the authentication error here
      }
    },
    async deletePost(key) {
      var post_id = this.posts[key].id;
      this.posts.splice(key, 1);
      axios
        .delete(API_BASE_URL + "/v1/post/" + post_id)
        .then(response => {
          this.$emit("completed", response.data.data);
        })
        .catch(error => {});
    }
  }
};
</script>
<style scoped>
.post_title {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-weight: 500;
    font-size: 28px;
    line-height: 36.4px;
    text-decoration: none;
}

.layout_cell {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 32px;
}
.count{
  font-size: 17px;
}

.action {
  padding-top: 2px;
}
</style>
