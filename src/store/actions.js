import { api, autoRetry, handleError, USERNAME_CONFLICT } from "../api"

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

export const getAnimes = async ({ state, getters, commit }) => {
    state.page.animes.loading = true

    const req = async (query) => {
        const res = await api.get("v1/animes/?" + query)

        const data = res.data

        state.count = data.count ?? null
        state.previous = data.previous ?? null
        state.next = data.next ?? null

        commit("setAnimes", data.results)

        return res
    }

    try {
        const res = await autoRetry(req, getters.animesQuery)

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.animes.loading = false
    }
}

export const getAnime = async ({ state }, id) => {
    state.page.anime.loading.details = true

    try {
        const res = await api.get("v1/animes/" + id + "/")

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.anime.loading.details = false
    }
}

export const getRate = async ({ state }, id) => {
    state.page.anime.loading.rate = true

    try {
        const res = await api.get("v1/animes/" + id + "/rate/")

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.anime.loading.rate = false
    }
}

export const getLists = async ({ state }) => {
    state.page.anime.loading.rate = true

    try {
        const res = await api.get("v1/accounts/" + state.userId + "/lists/")

        // Set lists
        state.lists = res.data

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.anime.loading.rate = false
    }
}

export const createRate = async ({ state }, payload) => {
    state.page.anime.loading.rate = true

    try {
        const res = await api.post("v1/rates/", {
            anime_id: payload.animeId,
            list_id: payload.listId,
            rating: payload.rating,
            rewatched: payload.rewatched,
            completed: payload.completed,
        })

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.anime.loading.rate = false
    }
}

export const updateRate = async ({ state }, payload) => {
    state.page.anime.loading.rate = true

    try {
        const res = await api.patch("v1/rates/" + payload.id + "/", {
            list_id: payload.listId,
            rating: payload.rating,
            rewatched: payload.rewatched,
            completed: payload.completed,
        })

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.anime.loading.rate = false
    }
}

export const deleteRate = async ({ state }, payload) => {
    state.page.anime.loading.rate = true

    try {
        const res = await api.delete("v1/rates/" + payload + "/")

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.anime.loading.rate = false
    }
}

export const login = async ({ state, commit }, payload) => {
    state.page.login.loading = true

    try {
        const res = await api.post("/v1/auth/login/", payload)

        // Set tokens
        commit("setTokens", res.data)

        return res
    } catch (err) {
        console.error(err);
        throw err
    } finally {
        state.page.login.loading = false
    }
}

export const register = async ({ state, getters, commit }, payload) => {
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

    try {
        const res = await api.post("/v1/auth/register/", { username: payload.username, password: payload.password })

        // Clear errors
        commit("clearPageErrors", "register")

        // Set tokens
        commit("setTokens", res.data)

        return res
    } catch (err) {
        console.error(err);

        handleError(err, () => {
            commit("clearPageErrors", "register")

            register.error.login = "Такой логин уже занят"
        }, USERNAME_CONFLICT)

        throw err
    } finally {
        register.loading = false
    }
}

export const logout = ({ commit }) => {
    const refresh = document.cookie.split("; ").filter(item => item.startsWith("refresh_token="))[0]?.split("=")[1]

    if (!refresh) {
        return
    }

    // If refresh token is present, send logout request
    try {
        const res = api.post("/v1/auth/logout/", {
            refresh: refresh,
        })

        // Clear tokens
        commit("clearTokens")

        return res
    } catch (err) {
        console.error(err);
        throw err
    }
}

export const getAccountStats = ({ state }) => {
    api.get("/stats/accounts/" + state.account.id + "/lists/")
        .then(res => state.userLists = res.data.lists)
}

export const init = ({ commit }) => {
    commit("setTokens")
}