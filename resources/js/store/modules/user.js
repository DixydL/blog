import Axios from 'axios';
import { API_BASE_URL } from "../../config";
import { router } from "../../app.js"

const state = {
    user: { auth: 0, user_id: null, role: null },
    error: "",
};

const actions = {
    register: async (context, user) => {
        let response = await Axios.post(API_BASE_URL + '/v1/register', user)
            .then(function (response) {
                context.commit('user', response.data.data);
            })
            .catch(function (error) {
                console.log(error.response.data.errors);
                context.commit('getErrors', error.response.data.errors, { root: true });
            });
    },

    singIn: async (context, user) => {
        await Axios.post(API_BASE_URL + '/v1/login', user)
            .then(function (response) {
                console.log(response);
                context.commit('singIn', response.data.data.token, { root: true });
                context.commit('user', response.data.data);
                localStorage.token = response.data.data.token;
                router.push({ path: "/" });
            })
            .catch(function (error) {
                if (error.response.data.data) {
                    context.commit('error', error.response.data.data.error);
                } else if (error.response.data.errors) {
                    context.commit('getErrors', error.response.data.errors, { root: true });
                }
            });
    },

    signInByToken: async (context, token) => {
        let responce = await Axios.post(API_BASE_URL + '/v1/token', { token: token })
            .then(function (response) {
                context.commit('singIn', response.data.data.token, { root: true });
                context.commit('user', response.data.data);
                localStorage.token = response.data.data.token;
            })
            .catch(function (error) {
                context.commit('error', error.data.error);
                console.log(error.data.error);
            });
    },

    singOut: async (context, user) => {
        user.auth = 0;
        user.user_id = null;
        context.commit('user', user);
        localStorage.token = '';
    },
}

const mutations = {
    user(state, user) {
        state.user = user
    },

    error(state, error) {
        state.error = error
    }
}


export default {
    namespaced: true,
    actions,
    mutations,
    state
}
