import React, { ReactNode, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useMount } from 'utils'
import { http } from 'utils/http'
import * as auth from '../auth_provider'
import { User } from 'types'

interface AuthForm {
    username: string
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        // 带着token,去me接口找user信息，最后把user信息交给setUser
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<
    | {
          user: User | null
          register: (form: AuthForm) => Promise<void>
          login: (form: AuthForm) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    // 退出登录时要清空缓存
    const queryClient = useQueryClient()

    // 等同于.then((data)=>setUser(data))
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () =>
        auth.logout().then(() => {
            setUser(null)
            queryClient.clear()
        })

    // 页面加载时调用初始化
    useMount(() => {
        bootstrapUser().then(setUser)
    })
    // 为context创造value
    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    // 可以拿到该组件外面的context,由于里面用了hooks，所以该函数也要是hooks
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中')
    }
    return context
}
