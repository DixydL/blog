<template>
  <div>
    <div>
      <h3>Коментарії:</h3>
      <template v-for="comment in comments">
        <div v-bind:key="comment.id">
          <label>Автор:</label>
          <span>{{ comment.author }}</span>
          <p>{{ comment.content }}</p>
          <div class="border-dotted"></div>
        </div>
      </template>
    </div>
    <div v-if="isShowForm">
      <el-form ref="form" :model="form" label-width="120px" label-position="top">
        <el-form-item :error="errors.author" label="Ваше ім'я">
          <el-input placeholder="Ведіть два слова " v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="Коментарій">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="заповніть вміст коментарія"
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Створити</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button v-else @click="onAddComment">Добавить коментарий</el-button>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      errors: {
        author: ""
      },
      isShowForm: false,
      isLoading: true,
      form: {
        author: "",
        content: "",
        post_id: ""
      }
    };
  },
  props: {
    comments: {}
  },
  watch: {
    form: {
      handler() {
        this.errors.author = "";
      },
      deep: true
    }
  },
  async created() {
    this.form.post_id = this.$route.params.id;
  },
  methods: {
    onAddComment() {
      this.form.author = "";
      this.form.content = "";
      this.isShowForm = true;
    },
    onSubmit() {
      this.createComment();
    },
    async createComment() {
      axios
        .post(API_BASE_URL + "/v1/comment", this.form)
        .then(response => {
          this.author = "";
          this.isLoading = false;
          this.isShowForm = false;
          this.$emit("completed", response.data);
          this.comments.push(response.data.data);
          this.$router.push({ path: "/post/" + this.$router.param.id });
        })
        .catch(error => {
          if (error.response.data.errors.author) {
            this.errors.author = error.response.data.errors.author[0];
          }
          this.isLoading = false;
        });
    }
  }
};
</script>
<style scoped>
/* .comment-list {
  background: #ffffff;
  line-height: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.add-comment {
  margin: auto;
  width: 400px;
} */
</style>
