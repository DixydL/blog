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
        errors: {},
    },
    getters: {
        getErrors: state => error => {
            if (state.errors[error]) {
                return state.errors[error][0];
            }
            return "";
        },
        hasEdit: state => user_id => {
            if (state.user.user.user_id === user_id) {
                return 1;
            }
            return 0;
        },
        getAuth: state => () => {
            return state.user.user.auth;
        }
    },
    mutations: {
        singIn(state, token) {
            // mutate state
            state.axiosAuth = Axios.create({ headers: { 'Authorization': 'Bearer ' + token, } });
        },
        isLoading(state, loading) {
            // mutate state
            state.isLoading = loading;
        },
        getErrors(state, errors) {
            state.errors = errors;
        }
    },
    modules: {
        user,
        post,
        chapter
    }
    //
})
