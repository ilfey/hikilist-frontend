import { createLogger, createStore } from "vuex";
import * as actions from "./actions"
import * as getters from "./getters"
import { mutations } from "./mutations"

const state = {
    theme: localStorage.getItem("theme") // `light` or `dark`
}

export const store = createStore({
    state,
    getters,
    actions,
    mutations,
    plugins: process.env.NODE_ENV !== 'production'
        ? [createLogger()]
        : []
})