export const setAnimes = (state, payload) => {
    state.animes = payload

    if (state.page.animes.loading) {
        state.page.animes.loading = false
    }
}

export const setAnimesParamsFromRoute = (state, route) => {
    const query = route.query

    state.page.animes.params = {
        search: query.search || null,
        ordering: query.ordering || null,
        page: query.page || null,
    }
}

export const setAnimesQuerySearch = (state, search) => {
    state.page.animes.params = {
        search: search,
        ordering: null,
        page: null,
    }
}

export const setAnimesQueryOrdering = (state, { key, state: _state }) => {
    const params = state.page.animes.params
    params.page = null

    if (_state === "ASC") {
        params.ordering = key
    } else if (_state === "DESC") {
        params.ordering = "-" + key
    } else {
        params.ordering = null
    }
}

export const setAnimesQueryPage = (state, page) => {
    if (page === 1) {
        state.page.animes.params.page = null
        return
    }

    state.page.animes.params.page = page
}

export const setUserIdFromToken = (state, token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    const payload = JSON.parse(jsonPayload);

    if (!payload?.user_id) {
        state.userId = null
        return
    }

    state.userId = payload.user_id
}

export const setTokens = (state, payload = null) => {
    // If payload is present, set it to state and set cookies
    if (payload) {
        document.cookie = `access_token=${payload.access}; path=/; max-age=604800` // max age is 7 days
        document.cookie = `refresh_token=${payload.refresh}; path=/; max-age=1814400}` // max age is 21 days

        // Set user id
        setUserIdFromToken(state, payload.access)

        return
    }

    // If payload is not present, get it from cookies
    const token = document.cookie.split("; ").filter(item => item.startsWith("access_token="))[0]?.split("=")[1]
    if (!!token) {
        // Set user id
        setUserIdFromToken(state, token)
    }
}

export const clearTokens = (state) => {
    // Clear cookies
    document.cookie = "access_token=; path=/; max-age=0"
    document.cookie = "refresh_token=; path=/; max-age=0"

    // Clear user id
    state.userId = null
}

export const clearPageErrors = (state, payload) => {
    // If payload is not present, do nothing
    if (!payload) {
        return
    }

    // If payload is an object, clear all errors
    if (typeof payload === "object") {
        if (payload?.error) {
            Object.keys(payload.error).forEach(key => {
                payload.error[key] = null
            })
        }

        return
    }

    // If payload is a string, clear the error for that page
    if (typeof payload === "string") {
        return clearPageErrors(state.page[payload])
    }
}

// TOASTS

export const createToast = (state, payload) => {
    const id = state.toasts.length + 1

    const length = state.toasts.push({
        id,
        ...payload,
    })

    // If toast has delay
    if ("delay" in payload) {
        setTimeout(() => {
            // Delete toast
            state.toasts.splice(length - 1, 1)
        }, payload.delay)
    }

    return id
}

export const deleteToast = (state, payload) => {
    const toastIndex = state.toasts.findIndex(toast => toast.id === payload)

    state.toasts.splice(toastIndex, 1)
}