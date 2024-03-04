import { api, retry } from "../api"

export const toggleTheme = ({ state }, newTheme) => {
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
    state.theme = newTheme
}

export const getAnimes = ({ state, getters, commit }) => {
    state.animesLoading = true

    const getData = (query) => {
        api.get("/animes/?" + query)
            .then(res => {
                const data = res.data

                state.count = data.count
                state.previous = data.previous
                state.next = data.next

                commit("setAnimes", data.results)
            })
            .catch(err => retry(getData, query))
    }

    getData(getters.animesQuery)
    // .catch(err => setTimeout(getData, 3000))
}

export const setOrdering = ({ commit }, payload) => {
    commit("setOrdering", payload)
}

export const getCSRF = ({ state }) => {
    api.get("/accounts/csrf/")
        .then(res => state.csrf = res.headers["x-csrftoken"])
}

export const login = ({ state, getters, dispatch }, payload) => {
    state.loginLoading = true

    api.post("/accounts/login/", payload, {
        headers: {
            "X-CSRFToken": getters.csrf,
        }
    })
        .then(() => dispatch("checkAuthentification"))
}

export const checkAuthentification = ({ state, dispatch }) => {
    api.get("/accounts/session/")
        .then(res => {
            state.isAuthenticated = res.data.isAuthenticated

            state.loginLoading = false

            dispatch("getAccount")
        })
}

export const logout = ({ dispatch }) => {
    api.get("/accounts/logout/")
        .then(() => dispatch("checkAuthentification"))
}

export const getAccount = ({ state, dispatch }) => {
    api.get("/accounts/whoami/")
        .then(res => {
            state.account = res.data
            dispatch("getAccountStats")
        })
}

export const getAccountStats = ({ state }) => {
    api.get("/stats/accounts/" + state.account.id + "/lists/")
        .then(res => state.userLists = res.data.lists)
}