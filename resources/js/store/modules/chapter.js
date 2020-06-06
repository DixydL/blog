import { API_BASE_URL } from "../../config";
import { router } from "../../app.js"

const state = {
    data: {}
};

const getters = {
    getChapter: state => {
        return state.data;
    }
}

const actions = {
    add: async (context, data) => {
        await context.rootState.axiosAuth
            .post(API_BASE_URL + "/v1/post/" + data.post_id + "/chapter", data.form)
            .then(response => {
                console.log(response);
                context.commit('isLoading', false, { root: true });
                router.go(-1);
            })
            .catch(error => {
                console.log(error);
            });
    },

    update: async (context, data) => {
        await context.rootState.axiosAuth
            .post(API_BASE_URL + "/v1/post/" + data.post_id + "/chapter/" + data.chapter_id, data.form)
            .then(response => {
                console.log(response);
                context.commit('isLoading', false, { root: true });
                router.go(-1);
            })
            .catch(error => {
                console.log(error);
            });
    },

    load: async (context, data) => {
        await context.rootState.axiosAuth.get(API_BASE_URL + "/v1/post/" + data.post_id + "/chapter/" + data.chapter_id)
            .then(response => {
                console.log(response);
                context.commit('isLoading', false, { root: true });
                context.commit('load', response.data.data)
            })
            .catch(error => {
                console.log(error);
            });
    },
}

const mutations = {
    load(state, chapter) {
        state.data = chapter
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}
