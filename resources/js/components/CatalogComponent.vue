<template>
  <div>
    <div v-loading="isLoading">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва блога</th>
            <th>Контент</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(catalog,key) in catalogs">
            <tr v-bind:key="catalog.id">
              <td>{{ catalog.id }}</td>
              <td>{{ catalog.name }}</td>
              <td>{{ catalog.description }}</td>
              <td>
                <router-link
                  :to="{ name : 'catalog-view', params: {id: catalog.id}}"
                  class="navbar-item"
                >Переглянути</router-link>
                <router-link
                  :to="{ name : 'catalog-update', params: {id: catalog.id}}"
                  class="navbar-item"
                >Редактировать</router-link>
                <el-button type="text" @click="deleteCatalog(key)">Видалити</el-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <router-link to="catalog-create" class="navbar-item">Добавиить категорію</router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      isLoading: true,
      catalogs: {}
    };
  },
  async created() {
    try {
      const response = await axios.get(API_BASE_URL + "/v1/catalog");
      this.catalogs = response.data.data;
      this.isLoading = false;
    } catch (e) {
      // handle the authentication error here
    }
  },
  methods: {
    async deleteCatalog(key) {
      var catalog_id = this.catalogs[key].id;
      this.catalogs.splice(key, 1);
      axios
        .delete(API_BASE_URL + "/v1/catalog/" + catalog_id)
        .then(response => {
          this.$emit("completed", response.data.data);
        })
        .catch(error => {});
    }
  }
};
</script>
