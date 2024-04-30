
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