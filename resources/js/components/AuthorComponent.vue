<template>
  <el-main>
    <div class="post content-block">
      <div class="content">
          <div class="read_chapter">
            <h3>Дозволяється публікувати:</h3>
            <p>- Оригінальні написані вами твори</p>
            <p>- Фанфіки написані вами(але обов'язково мають містити тег сетингу)</p>
            <p>- Перекладені вами твори зі схваленням автора</p>
            <h3>Забороняється:</h3>
            <p>- Викладати не свої твори( Навіть якщо автор вам дав дозвіл)</p>
            <p>- Викладати переклади без схвалення автора</p>
            <br>
            <p>За порушення правил, може бути не тільки видалення роботи, а навіть бан користувача</p>
            <p>Авторське право залишається за вами. <b>Цвіріньк</b> це інтернет площадка яка дозволяє будь-якому автору поділитися своєю робою.</p>
          </div>
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
