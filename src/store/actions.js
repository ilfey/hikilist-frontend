import { router } from "../router"
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
    state.page.animes.loading = true

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
    state.page.login.loading = true

    api.post("/accounts/login/", payload, {
        headers: {
            "X-CSRFToken": getters.csrf,
        }
    })
        .then(() => dispatch("checkAuthentification"))
}

export const register = ({ state, getters, dispatch }, payload) => {
    const register = state.page.register

    // Username must be between 3 and 32
    if (!payload.username || (payload.username.length < 3 || payload.username.length > 32)) {
        register.error.login = "Длина логина должна быть от 3 до 32"
        return
    }

    // Password must be between 3 and 32
    if (!payload.password || (payload.password.length < 6 || payload.password.length > 32)) {
        register.error.password = "Длина пароля должна быть от 6 до 32"
        return
    }

    // Passwords must match
    if (payload.password !== payload.confirm) {
        register.error.password = "Пароли не совпадают"
        return
    }

    register.loading = true

    api.post("/accounts/register/", payload, {
        headers: {
            "X-CSRFToken": getters.csrf,
        }
    })
        .then(res => {
            register.loading = false

            // Clear errors
            register.error.login = null
            register.error.password = null
            register.error.request = null

            // Go to login page
            router.replace({ name: "Login" })
        })
        .catch(err => {
            register.loading = false

            if (err.response.status === 409) {
                register.error.request = err.response.data
            }
        })
}

export const checkAuthentification = ({ state, dispatch }) => {
    api.get("/accounts/session/")
        .then(res => {
            state.isAuthenticated = res.data.isAuthenticated

            state.page.login.loading = false

            if (state.isAuthenticated) {
                dispatch("getAccount")
            }
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
        .catch(err => {
            if (err.status = 401) {
                state.isAuthenticated = false
            }
        })
}

export const getAccountStats = ({ state }) => {
    api.get("/stats/accounts/" + state.account.id + "/lists/")
        .then(res => state.userLists = res.data.lists)
}