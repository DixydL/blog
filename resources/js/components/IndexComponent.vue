<template>
  <el-main>
    <div v-show="!main" class="header header-index">
      <div class="content">
        <div class="avatar">
          <div class="user">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span>{{user_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-block">
      <div class="layout_cell">
        <div v-loading="isLoading">
          <template v-for="(post, key) in posts">
            <div v-bind:key="key" class="content">
              <h3 class="label">
                <router-link
                  :to="/post/+post.id"
                  :href="/post/+post.id"
                  class="post_title"
                >{{ post.name }}</router-link>
              </h3>
              <p class="content-post">
                Автор:
                <router-link
                  class="el-link el-link--primary"
                  :to="'/user/'+post.user_id+'/post'"
                  v-on:click="getTagPost(post.user_id)"
                >{{post.user_name}}</router-link>
              </p>
              <p class="content-tags">
                <span v-for="tag in post.tags" :key="tag.id">
                  <router-link
                    class="el-link el-link--primary"
                    :to="'/tag/'+tag.id+'/novel'"
                    v-on:click="getTagPost(tag_id)"
                  >{{tag.name}}</router-link>
                </span>
              </p>
              <div v-if="isLoading">Loading post...</div>
              <div v-else>
                <div v-if="post.file_url" class="block">
                  <el-image :src="base_url + post.file_url">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <p class="content-post" v-html="post.description"></p>
                <p class="content-post-down">
                  <el-row :gutter="24">
                    <div class="count">
                      <span>
                        <i class="el-icon-document"></i>
                        {{post.chapters_count}}
                        Глав
                      </span>
                      <span>
                        <i class="el-icon-s-comment"></i>
                        {{post.comments_count}}
                        Відгуків
                      </span>
                    </div>
                  </el-row>
                </p>
                <div class="border"></div>
              </div>
            </div>
          </template>
          <router-link to="post-create" class="navbar-item">Добавиить пост</router-link>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";

export default {
  data() {
    return {
      main: true,
      user_name: "",
      tag: {},
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
  },
  methods: {
    changeCategory() {
      this.$router.push({ path: "/catalog/" + this.catalog_id });
    },
    toPost(key) {
      console.log(key);
      this.$router.push({ path: "/post/" + key });
    },
    async init() {
      if (this.$route.params.tag_id) {
        this.getTagPost(this.$route.params.tag_id);
      } else if (this.$route.params.user_id) {
        this.getUserPost(this.$route.params.user_id);
      } else {
        this.main = true;
        try {
          const response = await axios.get(API_BASE_URL + "/v1/post");
          this.posts = response.data.data;
          this.isLoading = false;
        } catch (e) {
          // handle the authentication error here
        }
      }
    },
    async getTagPost(tag_id) {
      this.isLoading = true;
      await axios
        .get(API_BASE_URL + "/v1/tag/" + tag_id + "/novel")
        .then(response => {
          this.posts = response.data.data;
          this.isLoading = false;
        })
        .catch(function(error) {});
      window.scrollTo(0, 0);
    },
    async getUserPost(user_id) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          API_BASE_URL + "/v1/user/" + user_id + "/post"
        );
        this.posts = response.data.data.posts;
        this.isLoading = false;
        this.user_name = response.data.data.user_name;
        this.main = false;
        window.scrollTo(0, 0);
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
.content {
  padding: 0px;
}

.header-index {
  padding: 10px;
}
p.content-post {
  color: rgb(92, 92, 92);
  font-size: 14px;
  line-height: 22px;
}

p.content-post-down {
  color: rgb(92, 92, 92);
  font-size: 14px;
  line-height: 5px;
  margin: 0px;
}
p.content-tags {
  margin-top: -2px;
  margin-bottom: -2px;
}
p.content-tags a {
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 0 6px;
  line-height: 20px;
  font-size: 11px;
  background-color: #375878;
  color: #fff !important;
  padding: 3px 6px;
  border-radius: 4px;
  margin-top: -2px;
}

p.content-post a {
  margin-bottom: 2px;
}

.count {
  padding: 6px;
  color: #548eaa;
  font-size: 16px;
  line-height: 11px;
}

.action {
  padding-top: 2px;
}
</style>
