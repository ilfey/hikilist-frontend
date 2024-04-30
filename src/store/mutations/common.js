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