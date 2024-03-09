import { createLogger, createStore } from "vuex";
import * as actions from "./actions"
import * as getters from "./getters"
import { mutations } from "./mutations"

const state = {
    theme: localStorage.getItem("theme"), // `light` or `dark`
    animes: null, // Array of animes
    loading: {
        animes: false,
        login: false,
        register: false,
    },
    page: {
        animes: {
            loading: false, // Only boolean
            params: {
                search: null, // String
                ordering: null, // String `[-]<column>`
                page: null, // Number
            },
        },
        login: {
            loading: false, // Only boolean
        },
        register: {
            loading: false, // Only boolean
            error: {// Strings
                login: null, 
                password: null,
                request: null,
            }, 
        }
    },
    count: null, // Number count of animes
    previous: null, // String to previous page
    next: null, // String to next page
    csrf: null, // String
    isAuthenticated: null, // Boolean
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