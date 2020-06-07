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
import InDevelop from './components/InDevelop.vue';
import Contest from './components/ContestComponent.vue';
import Author from './components/AuthorComponent.vue';
import Post from './components/PostFormComponents.vue';
import ChapterForm from './components/ChapterFormComponent.vue';
import CatalogForm from './components/CatalogFormComponent.vue';
import PostView from './components/PostViewComponent.vue';
import ChapterView from './components/ChapterViewComponent.vue';
import Index from './components/IndexComponent.vue';
import Catalog from './components/CatalogComponent.vue';
import SignIn from './components/SignIn.vue';

const routes = [
    { path: '/', component: Index },
    { path: '/user/:user_id/post', component: Index },
    { path: '/tag/:tag_id/novel', component: Index },
    { path: '/in-develop', component: InDevelop },
    { path: '/contest', component: Contest },
    { path: '/author', component: Author },
    { path: '/catalog', component: Catalog },
    { path: '/catalog-create', component: CatalogForm },
    { path: '/catalog/:id', name: 'catalog-view', component: Index },
    { path: '/catalog-update/:id', name: 'catalog-update', component: CatalogForm },
    { path: '/post-create', component: Post, meta: { requiresAuth: true } },
    { path: '/chapter-form/:post_id', component: ChapterForm },
    { path: '/post/:id', name: 'post-view', component: PostView },
    { path: '/post/:id/chapter/:chapter_id', name: 'chapter-view', component: ChapterView },
    { path: '/novel/:post_id/chapter-update/:chapter_id', name: 'chapter-view', component: ChapterForm },
    { path: '/post-update/:id', name: 'post-update', component: Post },
    { path: '/sign-in', name: 'sign-in', component: SignIn },
]

export const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    console.log(store.getters.getAuth());

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // этот путь требует авторизации, проверяем залогинен ли
        // пользователь, и если нет, перенаправляем на страницу логина
        if (!store.getters.getAuth()) {
            store.commit('user/error', 'Спочатку авторизуйтеся');
            next({
                path: '/sign-in',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // всегда так или иначе нужно вызвать next()!
    }
})

async function myApp() {
    if (localStorage.token) {
        console.log("token:" + localStorage.token);
        await store.dispatch("user/signInByToken", localStorage.token);
    }

    new Vue({
        el: '#app',
        router: router,
        store,
        render: h => h(App)
    })
}

myApp();
