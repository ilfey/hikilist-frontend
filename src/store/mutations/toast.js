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