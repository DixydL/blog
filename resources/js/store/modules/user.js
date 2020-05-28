import Axios from 'axios';
import { API_BASE_URL } from "../../config";
import { router } from "../../app.js"

const state = {
    user: { auth: 0 },
    error: "",
};

const actions = {
    register: async (context, user) => {
        let responce = await Axios.post(API_BASE_URL + '/v1/register', user)
            .catch(function (error) {
                console.log(error);
            });

        console.log(responce);

        context.commit('user', responce.data.data);
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
                context.commit('error',error.response.data.data.error);
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
