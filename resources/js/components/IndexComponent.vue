<template>
  <div>
    <div v-loading="isLoading">
      <label>Каталог</label>
      <div class="category-select">
        <el-select v-model="catalog_id" @change="changeCategory" placeholder="Select">
          <el-option v-for="item in catalogs" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
      <template v-for="(post, key) in posts">
        <div v-bind:key="key" class="content">
          <h3>
            <label>Назва поста:</label>
            <span>{{ post.name }}</span>
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
            <el-col :span="12">
              <router-link
                :to="{ name : 'post-view', params: {id: post.id}}"
                class="navbar-item"
              >Переглянути</router-link>
              <router-link
                :to="{ name : 'post-update', params: {id: post.id}}"
                class="navbar-item"
              >Редактировать</router-link>
              <el-button type="text" @click="deletePost(key)">Видалити</el-button>
            </el-col>
            <el-col :span="12">
              <div class="count">
                <span>Кількість Коментаріїв - {{post.comments_count}}</span>
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
