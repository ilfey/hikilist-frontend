import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
})

export const retry = (callback, ...args) => setTimeout(callback, 3000, ...args)