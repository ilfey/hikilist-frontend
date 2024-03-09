// export const theme = state => state.theme

export const animesQuery = state => Object.entries(state.page.animes.params).filter(item => item[1] !== null).map(item => `${item[0]}=${item[1]}`).join("&")

export const animesQueryParams = state => {
    const builder = (acc, current) => {
        if (current[1] !== null) {
            acc[current[0]] = current[1]
        }

        return acc
    }

    return Object.entries(state.page.animes.params).reduce(builder, {})
}

export const ordering = state => state.ordering ? `ordering=${state.ordering}` : null

export const csrf = state => state.csrf

export const isAuthenticated = state => state.isAuthenticated