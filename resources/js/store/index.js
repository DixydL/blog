import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import post from './modules/post';
import chapter from './modules/chapter';
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        axiosAuth: null,
        isLoading: false,
    },
    mutations: {
        singIn(state, token) {
            // mutate state
            state.axiosAuth = Axios.create({ headers: { 'Authorization': 'Bearer ' + token, } });
        },
        isLoading(state, loading) {
            // mutate state
            state.isLoading = loading;
        }
    },
    modules: {
        user,
        post,
        chapter
    }
    //
})
