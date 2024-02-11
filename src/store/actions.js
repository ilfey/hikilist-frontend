import { api } from "../api"

export const toggleTheme = ({ commit }, newTheme) => {
    // Apply theme
    const d = document.documentElement

    if (newTheme === "dark") {
        d.classList.add("dark")
    } else {
        d.classList.remove("dark")
    }

    // Save theme in localStorage
    localStorage.setItem("theme", newTheme)

    // Mutate store
    commit("setTheme", newTheme)
}

export const getAnimes = ({ state, getters, commit }, payload = null) => {
    // Set payload if exists
    if (payload) {
        if (payload.ordering) {
            commit("setOrdering", payload.ordering)
        }

        if (payload.query !== undefined) {
            commit("setQuery", payload.query)
        }
    }

    // Build queries
    let queries = [
        "?format=json",
        getters.ordering,
        getters.search,
    ].filter(i => i !== null).join("&")

    state.animesLoading = true

    api.get("/animes/" + queries)
        .then(res => commit("setAnimes", res.data))
        .catch(err => setTimeout(getData, 3000))

}

export const setOrdering = ({ commit }, payload) => {
    commit("setOrdering", payload)
}