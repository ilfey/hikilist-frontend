import { createLogger, createStore } from "vuex";
import * as actions from "./actions"
import * as getters from "./getters"
import { mutations } from "./mutations"

const state = {
    theme: localStorage.getItem("theme"), // `light` or `dark`
    animes: null, // Array of animes
    params: {
        animes: {
            search: null, // String
            ordering: null, // String `[-]<column>`
            page: null, // Number
        },
    },
    count: null, // Number count of animes
    previous: null, // String to previous page
    next: null, // String to next page
    animesLoading: false, // Only boolean
    csrf: null, // String
    isAuthenticated: null, // Boolean
    loginLoading: false, // Only boolean
    account: null, // Object {id: number, username: string}
    userLists: null, // Array<{id: number, title: string, count: number}>
}

export const store = createStore({
    state,
    getters,
    actions,
    mutations,
    plugins: import.meta.env.DEV
        ? [createLogger()]
        : []
})