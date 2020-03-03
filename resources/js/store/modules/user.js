import Axios from 'axios';
import { API_BASE_URL } from "../../config";

const state = {
    user: {auth : 0},
};

const actions = {
    singIn: async (context, user) => {
        let responce = await Axios.post(API_BASE_URL + '/v1/register', user)
            .catch(function (error) {
                console.log(error);
            });

        console.log(responce);

        context.commit('user', responce.data.data);

    },
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