export * from "./api"
export * from "./common"

export const init = ({ commit }) => {
    commit("setTokens")
}