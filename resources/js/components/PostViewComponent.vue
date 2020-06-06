<template>
  <el-main>
    <div class="post content-block">
      <div class="content">
        <div v-if="isLoading">Завантаження новели...</div>
        <div v-else>
          <div v-if="imgUrl" class="block">
            <el-image :src="imgUrl">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>

          <el-link class="post_title">{{post.name}}</el-link>

          <p class="content-post" v-html="post.description"></p>
          <el-button
            v-if="hasEdit(post.user_id)"
            type="danger"
            size="mini"
            @click="handleDeletePost(post.id)"
          >Видалити</el-button>
          <el-button
            v-if="hasEdit(post.user_id)"
            type="primary"
            size="mini"
            @click="handleEditPost(post.id)"
          >Редагувати</el-button>
          <el-divider>Остані релізи</el-divider>
          <el-table :data="post.chapters" style="width: 100%">
            <el-table-column prop="created_at" label="Дата" min-width="85px" width="110px">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="Назва глави" min-width="90px">
              <template slot-scope="scope">
                <el-link @click="onRead(scope.row)" type="primary">{{ scope.row.name }}</el-link>
              </template>
            </el-table-column>
            <el-table-column v-if="hasEdit(post.user_id)" align="right" min-width="100px">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEditChapter(post.id,scope.row.id)">
                  <i class="el-icon-edit"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            v-if="hasEdit(post.user_id)"
            class="new_chapters"
            size="mini"
            @click="toNewChapter"
            type="primary"
          >Додати нову главу</el-button>
          <div class="border"></div>
          <comment :comments="comments"></comment>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";
import Comment from "./CommentComponent";
import { mapGetters } from "vuex";

export default {
  components: {
    comment: Comment
  },
  computed: {
    ...mapGetters(["hasEdit"])
  },
  data() {
    return {
      imgUrl: "",
      isLoading: true,
      post: {},
      comments: {}
    };
  },
  async created() {
    try {
      const response = await axios.get(
        API_BASE_URL + "/v1/post/" + this.$route.params.id
      );
      this.post = response.data.data;
      this.comments = response.data.data.comments;
      this.isLoading = false;
      if (response.data.data.file) {
        this.imgUrl = BASE_URL + response.data.data.file.url;
      }
    } catch (e) {
      // handle the authentication error here
    }
  },
  methods: {
    handleEditPost(post_id) {
      this.$router.push({
        path: "/post-update/" + post_id
      });
    },
    handleDeletePost(post_id) {
      this.$store.dispatch("post/delete", post_id);
    },
    handleEditChapter(post_id, chapter_id) {
      this.$router.push({
        path: "/novel/" + post_id + "/chapter-update/" + chapter_id
      });
    },
    onRead(chapter) {
      console.log(chapter);
      this.$router.push({
        path: "/post/" + this.post.id + "/chapter/" + chapter.id
      });
    },
    toNewChapter() {
      this.$router.push({ path: "/chapter-form/" + this.post.id });
    }
  }
};
</script>
<style>
.content {
  padding: 20px;
  text-align: left;
}

.el-image__inner {
  width: auto;
}

.new_chapters {
  margin-bottom: 10px;
  margin-top: 10px;
}

.block {
  padding: 10px 0;
  display: flex;
  margin: inherit;
  box-sizing: border-box;
  vertical-align: top;
}

.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
}
.el-image {
  width: 500px;
  height: 500px;
}
</style>
