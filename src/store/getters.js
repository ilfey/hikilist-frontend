// export const theme = state => state.theme

export const ordering = state => state.ordering ? `ordering=${state.ordering}` : null

export const search = state => state.query ? `search=${state.query}` : null

export const csrf = state => state.csrf

export const isAuthenticated = state => state.isAuthenticated