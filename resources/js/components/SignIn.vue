<template>
  <el-row>
    <el-col>
      <div v-show="signIn === 0" class="sign-in-info">
        <span class="no-have">Немаєте акаунта?</span>
        <el-button @click="onWantSingIn" type="text">
          <b>Зареєструйтеся</b>
        </el-button>
      </div>
    </el-col>
    <el-col>
      <el-form ref="form" label-position="left" :model="form" label-width="60px">
        <el-form-item label="Email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item v-show="signIn" label="Никнейм">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-show="signIn === 1"
            type="primary"
            class="log-in"
            @click="onSingIn"
          >Зареєструватися</el-button>
          <el-button
            v-show="signIn === 0"
            type="primary"
            class="log-in"
            @click="onSubmit"
          >Авторизуватися</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      signIn: 0,

      form: {
        email: "",
        name: "",
        password: "",
        auth: 1
      }
    };
  },
  async mounted() {
    console.log(this.$store.state.user.user);
  },
  methods: {
    onSubmit() {
      this.$store.commit("user", this.form);
      this.$router.push({ path: "/" });
    },
    onSingIn() {
      this.$store.dispatch("user/singIn", this.form);
    },
    onWantSingIn() {
      this.signIn = 1;
    }
  }
};
</script>

<style scoped>
.sign-in-info {
  margin-bottom: 18px;
  margin-left: 0px;
  width: 100%;
  padding: 4px 0px 6px 0px;
  margin: 0;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
}

.no-have {
  margin-right: 4px;
}
</style>