import Axios from 'axios';
import { API_BASE_URL } from "../../config";
import {router} from "../../app.js"

const actions = {
    add: async (context, data) => {
        console.log(data);
        let responce = await context.rootState.axiosAuth
            .post(API_BASE_URL + "/v1/post/" + data.post_id + "/chapter", data.form)
            .then(response => {
                console.log(response);
                context.commit('isLoading', false, { root: true });
                router.go(-1);
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export default {
    namespaced: true,
    actions,
}
