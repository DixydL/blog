<template>
  <el-main>
    <div class="post content-block">
      <div class="content">
        <div class="read_chapter">
          <h3>Cup-1 Новели</h3>
          <p>
            В честь запуску базової версії інтернет площадки
            <b>Цвіріньк</b>, де кожен зможе поділитися своєю творчістю,
          </p>
          <p>Цвіріньк оголошує перший конкурс новел "Cup-1" з призовим фондом — 225 грн. Тривалість конкурсу 2 місяці (з 6 червня 2020).</p>
          <p>
            <b>Розподіл призового фонду:</b>
          </p>
          <p>1 місце - 100грн</p>
          <p>2 місце - 75грн</p>
          <p>3 місце - 50грн</p>
          <p>
            <b>Умови:</b>
          </p>
          <p>1. Публікація новели під тегом "Cup-1".</p>
          <p>2. Не менше 2000 символів.</p>
          <p>3. Оригінальна робота.</p>
          <p>4. Тема роботи довільна</p>
          <router-link to="/post-create?tag=Cup-1">
            <el-button type="primary" icon="el-icon-edit" class="center">Взяти участь</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </el-main>
</template>
<script>
import axios from "axios";
import { API_BASE_URL, BASE_URL } from "../config";
import headerBack from "./HeaderBackComponent";
import { Editor, EditorContent } from "tiptap";

export default {
  components: {
    headerBack: headerBack,
    EditorContent
  }
};
</script>
