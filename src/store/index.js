import { createLogger, createStore } from "vuex";
import * as actions from "./actions"
import * as getters from "./getters"
import { mutations } from "./mutations"

const state = {
    theme: localStorage.getItem("theme"), // `light` or `dark`
    ordering: null, // String [-]<column>
    query: null, // String
    animes: null, // Array of animes
    animesLoading: false // Only boolean
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