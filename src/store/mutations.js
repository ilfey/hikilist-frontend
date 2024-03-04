const setAnimes = (state, payload) => {
    state.animes = payload

    if (state.animesLoading) {
        state.animesLoading = false
    }
}

const setAnimesParamsFromRoute = (state, route) => {
    const query = route.query
    
    state.params.animes = {
        search: query.search || null,
        ordering: query.ordering || null,
        page: query.page || null,
    }
}

const setAnimesQuerySearch = (state, search) => {
    state.params.animes = {
        search: search,
        ordering: null,
        page: null,
    }
}

const setAnimesQueryOrdering = (state, { key, state: _state }) => {
    state.params.animes.page = null

    if (_state === "ASC") {
        state.params.animes.ordering = key
    } else if (_state === "DESC") {
        state.params.animes.ordering = "-" + key
    } else {
        state.params.animes.ordering = null
    }
}

const setAnimesQueryPage = (state, page) => {
    if (page === 1) {
        state.params.animes.page = null
        return
    }

    state.params.animes.page = page
}

export const mutations = {
    setAnimes,
    setAnimesParamsFromRoute,
    setAnimesQuerySearch,
    setAnimesQueryOrdering,
    setAnimesQueryPage,
}