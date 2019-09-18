<template>
  <div class="post">
    <h3>
      <span>{{ post.name }}</span>
    </h3>
    <div class="content">
      <div v-if="isLoading">Loading post...</div>
      <div v-else>
        <div class="block">
          <el-image :src="imgUrl">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <p>{{post.content}}</p>
        <div class="border"></div>
        <comment :comments="comments"></comment>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";
import Comment from "./CommentComponent";

export default {
  components: {
    comment: Comment
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
      this.comments = response.data.data.comments.data;
      this.isLoading = false;
      if (response.data.data.file) {
        this.imgUrl = BASE_URL + response.data.data.file.url;
      }
    } catch (e) {
      // handle the authentication error here
    }
  }
};
</script>
<style>
.content {
  padding: 20px;
  text-align: left;
}

.block {
  padding: 30px 0;
  /* border-right: 1px solid #eff2f6; */
  display: flex;
  width: 50%;
  margin: auto;
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
