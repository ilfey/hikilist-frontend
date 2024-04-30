import { toastTypes } from "../components/toast/lib"

import { store } from "../store"

import axios from "axios"

const RETRY_LIMIT = 3
const RETRY_TIMEOUT = 3000

export const
    BAD_REQUEST = "Bad request", // 400
    PERMISSION_DENIED = "Permission denied", // 403
    NOT_FOUND = "Not found", // 404
    USERNAME_CONFLICT = "Username already exists.", // 409
    INTERNAL_SERVER_ERROR = "Internal server error" // 500

export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    validateStatus: status => status < 400
})

export const setupInterceptors = () => {
    api.interceptors.request.use(config => {
        if (document.cookie.includes("access_token")) {
            const token = document.cookie.split("; ").filter(item => item.startsWith("access_token="))[0]?.split("=")[1]
    
            config.headers.Authorization = `Bearer ${token}`
        }
    
        return config
    })

    api.interceptors.response.use(
        res => {
            // ...
            
            return res
        },
        err => {
            if (err?.code === "ERR_NETWORK"){
                store.commit("createToast", {
                    type: toastTypes.ERROR,
                    detail: "Сервис не доступен"
                })
            }

            return err
        },
    )
}

export const autoRetry = (callback, ...args) => new Promise((resolve, reject) => {
    let count = 0

    const inner = () => callback(...args)
        .then(res => resolve(res))
        .catch(err => {
            count += 1;

            if (count > RETRY_LIMIT) {
                return reject(err)
            }


            if (err?.response) { // if response in err
                const status = err.response.status

                if (status < 500) {
                    reject(err)
                }

                setTimeout(inner, RETRY_TIMEOUT) // Internal server error or any
            }

            reject(err)
        })

    inner()
})

export const handleStatus = (err, callback, ...statuses) => {
    if (err?.response) {
        if (statuses.includes(err.response.status)) {
            return callback()
        }
    }

    if (err?.status) {
        if (statuses.includes(err.status)) {
            return callback()
        }
    }

    return null
}

export const handleError = (err, callback, ...errs) => {
    if (err?.response) {
        if (errs.includes(err.response.data?.detail)) {
            return callback()
        }
    }

    if (err?.data) {
        if (errs.includes(err.data?.detail)) {
            return callback()
        }
    }

    return null
}