require('./bootstrap');

window.Vue = require('vue');

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import store from './store/index';
var platform = require('platform');


Vue.config.devtools = true;
Vue.config.performance = true;
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(VueRouter)


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from './components/App.vue';
import Post from './components/PostFormComponents.vue';
import CatalogForm from './components/CatalogFormComponent.vue';
import PostView from './components/PostViewComponent.vue';
import Index from './components/IndexComponent.vue';
import Catalog from './components/CatalogComponent.vue';
import SignIn from './components/SignIn.vue';

const routes = [
  { path: '/', component: Index},
  { path: '/catalog', component: Catalog},
  { path: '/catalog-create', component: CatalogForm},
  { path: '/catalog/:id', name: 'catalog-view', component: Index},
  { path: '/catalog-update/:id', name: 'catalog-update', component: CatalogForm},
  { path: '/post-create', component: Post},
  { path: '/post/:id', name: 'post-view', component: PostView},
  { path: '/post-update/:id', name: 'post-update', component: Post},
  { path: '/sign-in', name: 'sign-in', component: SignIn},
]

const router = new VueRouter({
  mode: 'history',
  routes
})


const app = new Vue({
  el: '#app',
  created() {
    console.log(platform.name);
  },
  router: router,
  store,
  render: h => h(App)
})