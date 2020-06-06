import Axios from 'axios';
import { API_BASE_URL } from "../../config";
import { router } from "../../app.js"

const state = {
    user: { auth: 0 },
};

const actions = {
    add: async (context, form) => {
        let responce = await context.rootState.axiosAuth
            .post(API_BASE_URL + "/v1/post/create", form)
            .then(response => {
                context.commit('isLoading', false, { root: true });
                router.push("/");
            })
            .catch(error => {
                console.log('error');
            });
    },

    update: async (context, form) => {
        await context.rootState.axiosAuth
            .put(API_BASE_URL + "/v1/post/" + form.post_id, form)
            .then(response => {
                context.commit('isLoading', false, { root: true });
                router.go(-1);
            })
            .catch(error => {
                console.log("sfsd");
                context.commit('isLoading', false, { root: true });
            });
    },

    delete: async (context, post_id) => {
        await context.rootState.axiosAuth
            .delete(API_BASE_URL + "/v1/post/" + post_id)
            .then(response => {
                context.commit('isLoading', false, { root: true });
                router.push('/');
            })
            .catch(error => {
                context.commit('isLoading', false, { root: true });
            });
    }
}

const mutations = {
    user(state, user) {
        // mutate state
        state.user = user
    }
}


export default {
    namespaced: true,
    actions,
    mutations,
    state
}
