import { createLogger, createStore } from "vuex";
import * as actions from "./actions"
import * as getters from "./getters"
import * as mutations from "./mutations"

const state = {
    theme: localStorage.getItem("theme"), // `light` or `dark`
    animes: null, // Array of animes
    loading: {
        animes: false,
        login: false,
        register: false,
    },
    page: {
        anime: {
            loading: { // Only boolean
                details: false,
                lists: false,
                rate: false,
            },
        },
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
            error: { // Strings
                login: null,
                password: null,
                request: null,
            },
        },
        lists: {
            listId: null, // Number
        },
    },
    count: null, // Number count of animes
    previous: null, // String to previous page
    next: null, // String to next page
    userId: null, // Number
    lists: null, // Array<{id: number, title: string}>
    toasts: [], // Array<{id:number}>
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

