const setTheme = (state, theme) => {
    state.theme = theme
}

const setQuery = (state, text) => {
    console.log(text);
    state.query = text?.trim()
}

const setOrdering = (state, {isActiveState, key}) => {
    if (isActiveState === null) {
        state.ordering = null
        return
    }

    state.ordering = `${isActiveState ? "" : "-"}` + key
}

const setAnimes = (state, payload) => {
    state.animes = payload
    
    if (state.animesLoading) {
        state.animesLoading = false
    }
}

export const mutations = {
    setTheme,
    setQuery,
    setOrdering,
    setAnimes,
}