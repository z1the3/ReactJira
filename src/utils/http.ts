// 二次封装fetch

import { useAuth } from 'context/auth_context'
import qs from 'qs'
import * as auth from '../auth_provider'
const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?: string
    data?: object
}
// endpoint是要拼上去的字符串
export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        // method默认为get,customConfig可以覆盖
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-type': data ? 'application/json' : '',
        },
        ...customConfig,
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        // 发的是post请求
        config.body = JSON.stringify(data || {})
    }
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout()
                // 刷新页面
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    // 因为要从useAuth中获取user，hooks外必须也是hooks
    const { user } = useAuth()
    // 加入token,ts操作符parameters
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, { ...config, token: user?.token })
}
