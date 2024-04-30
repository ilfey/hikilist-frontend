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
