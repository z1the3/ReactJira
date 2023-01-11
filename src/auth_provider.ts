// 在真实环境中，如果使用firebase这种第三方auth服务或SDK，本文件不需要开发者开发
import { User } from './screens/project-list/search-panel'
const apiUrl = process.env.REACT_APP_API_URL

// 这里用localstorage存储jwt
const localStorageKey = '__auth_provider_token__'

// 获取token
export const getToken = () => {
    window.localStorage.getItem(localStorageKey)
}

// 拦截器
export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (param: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(param)
        }
    })
}

export const register = (param: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        } else {
            return Promise.reject(param)
        }
    })
}

export const logout = async () =>
    window.localStorage.removeItem(localStorageKey)
